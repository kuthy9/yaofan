import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-11-17.clover',
});

const singleProjectPriceId = process.env.STRIPE_PRICE_SINGLE_PROJECT;
const allAccessPriceId = process.env.STRIPE_PRICE_ALL_ACCESS;

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { type, display_name, message, project_id, project_name } = req.body;
        const origin = process.env.FRONTEND_ORIGIN ?? req.headers.origin ?? 'http://localhost:5173';

        let sessionConfig: Stripe.Checkout.SessionCreateParams = {
            mode: 'payment',
            success_url: `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/`,
            metadata: {
                display_name: display_name || '匿名好心人',
                message: message || '',
                project_id: project_id || '',
                project_name: project_name || '',
            },
        };

        if (type === 'single_project') {
            if (!singleProjectPriceId) {
                throw new Error('Missing Stripe price for single project support');
            }
            sessionConfig.line_items = [
                {
                    price: singleProjectPriceId,
                    quantity: 1,
                },
            ];
        } else if (type === 'all_access') {
            if (!allAccessPriceId) {
                throw new Error('Missing Stripe price for all access support');
            }
            sessionConfig.line_items = [
                {
                    price: allAccessPriceId,
                    quantity: 1,
                },
            ];
        } else {
            return res.status(400).json({ error: 'Invalid payment type' });
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return res.status(200).json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe API Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
