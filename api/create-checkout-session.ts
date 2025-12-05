import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-11-17.clover',
});

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { type, amount } = req.body;
        const origin = process.env.FRONTEND_ORIGIN ?? req.headers.origin ?? 'http://localhost:5173';

        let sessionConfig: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/`,
        };

        if (type === 'drink') {
            sessionConfig.line_items = [
                {
                    price: process.env.STRIPE_PRICE_DRINK,
                    quantity: 1,
                },
            ];
        } else if (type === 'dinner') {
            sessionConfig.line_items = [
                {
                    price: process.env.STRIPE_PRICE_DINNER,
                    quantity: 1,
                },
            ];
        } else if (type === 'cloud') {
            const customAmount = amount && !isNaN(Number(amount)) && Number(amount) >= 1 ? Number(amount) : 100;

            sessionConfig.line_items = [
                {
                    price_data: {
                        currency: 'cad',
                        product: process.env.STRIPE_PRODUCT_CLOUD,
                        unit_amount: customAmount * 100, // Convert to cents
                    },
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
