import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover', // Update if necessary to match your API version
});

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Must use service role for writes
const supabase = createClient(supabaseUrl, supabaseKey);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to read raw body
async function buffer(readable: any) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
        const rawBody = await buffer(req);
        event = stripe.webhooks.constructEvent(rawBody, sig as string, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract data
        const stripe_session_id = session.id;
        const amount = session.amount_total; // cents
        const currency = session.currency;
        const metadata = session.metadata || {};
        const display_name = metadata.display_name || '匿名好心人';
        const message = metadata.message || '';

        try {
            // Check for duplicates (should correspond to unique constraint in DB, but good to check)
            const { data: existing } = await supabase
                .from('payments')
                .select('id')
                .eq('stripe_session_id', stripe_session_id)
                .single();

            if (existing) {
                console.log(`Payment already exists: ${stripe_session_id}`);
                return res.status(200).json({ received: true });
            }

            // Insert into Supabase
            const { error } = await supabase
                .from('payments')
                .insert({
                    stripe_session_id,
                    amount,
                    currency,
                    display_name,
                    message,
                    is_public: true,
                    created_at: new Date().toISOString()
                });

            if (error) {
                console.error('Supabase Insert Error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            console.log(`Payment recorded: ${stripe_session_id}`);
        } catch (dbError) {
            console.error('Database Operation Error:', dbError);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Return 200 for other events or successful handling
    return res.status(200).json({ received: true });
}
