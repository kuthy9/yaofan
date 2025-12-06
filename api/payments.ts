import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Define PaymentItem type
type PaymentItem = {
    id: string;
    display_name: string | null;
    message: string | null;
    amount: number;         // cents
    currency: string;
    display_amount: string; // Formatted amount
    created_at: string;
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const limitParam = req.query.limit as string;
        const limit = limitParam && !isNaN(Number(limitParam)) ? Number(limitParam) : 10;

        const { data, error } = await supabase
            .from('payments')
            .select('id, display_name, message, amount, currency, created_at')
            .eq('is_public', true)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            throw error;
        }

        const payments: PaymentItem[] = (data || []).map((item) => ({
            id: item.id,
            display_name: item.display_name,
            message: item.message,
            amount: item.amount,
            currency: item.currency,
            // Simple formatting: amount is in cents
            display_amount: (item.amount / 100).toFixed(0), // Keep it simple integer for now as mostly ¥ or $
            created_at: item.created_at,
        }));

        return res.status(200).json(payments);
    } catch (error: any) {
        console.error('Fetch Payments Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
