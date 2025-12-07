import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type LevelInfo = {
    level: number;
    key: string;
    name: string;
    min: number;
    max: number | null;
    status: string;
};

const LEVELS: LevelInfo[] = [
    { level: 1, key: 'beggar', name: '乞讨者', min: 0, max: 1500, status: '勉强维持人类形态' },
    { level: 2, key: 'office_monk', name: '社畜修行者', min: 1501, max: 5000, status: '能量略有回升，开始怀疑人生' },
    { level: 3, key: 'compute_monk', name: '算力僧', min: 5001, max: 15000, status: '开始以代码为饭，业已成仙' },
    { level: 4, key: 'cloud_spirit', name: '云端转生者', min: 15001, max: 100000, status: '已完全脱离物理世界，灵魂托管云端' },
    { level: 5, key: 'cyber_buddha', name: '赛博佛祖', min: 100001, max: null, status: '你不再要饭，宇宙开始回饭给你' },
];

// Exchange rates to CAD (all amounts will be converted to CAD)
const EXCHANGE_RATES: Record<string, number> = {
    'cny': 0.19,  // 1 CNY = 0.19 CAD
    'cad': 1,     // 1 CAD = 1 CAD (base currency)
    'usd': 1.4,   // 1 USD = 1.4 CAD
};

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Fetch all public payments
        const { data: payments, error } = await supabase
            .from('payments')
            .select('amount, currency')
            .eq('is_public', true);

        if (error) {
            throw error;
        }

        let totalAmountCAD = 0;

        // Calculate total amount in CAD (base currency)
        // Note: amount is in cents (minimal unit)
        (payments || []).forEach(p => {
            const currency = p.currency.toLowerCase();
            const rate = EXCHANGE_RATES[currency] || 1; // Default to 1 if unknown
            const amountInCent = p.amount;
            const amountInUnit = amountInCent / 100;
            totalAmountCAD += amountInUnit * rate;
        });

        // Round to nearest integer (e.g., 521.62 -> 522)
        totalAmountCAD = Math.round(totalAmountCAD);

        // Determine Level
        let currentLevel = LEVELS[0];
        let nextLevelInfo = null;

        for (let i = 0; i < LEVELS.length; i++) {
            const lvl = LEVELS[i];
            if (totalAmountCAD >= lvl.min) {
                if (lvl.max === null || totalAmountCAD <= lvl.max) {
                    currentLevel = lvl;
                    // Check next level
                    if (i + 1 < LEVELS.length) {
                        const next = LEVELS[i + 1];
                        nextLevelInfo = {
                            level: next.level,
                            name: next.name,
                            neededExp: next.min - totalAmountCAD
                        };
                    } else {
                        // Max level
                        nextLevelInfo = {
                            level: null,
                            name: null,
                            neededExp: 0 // Maxed out
                        };
                    }
                    break;
                }
            }
        }

        // Handling case where amount exceeds max of one level but loop continues? 
        // The logic above: if amount >= min. 
        // If amount is 2000. 
        // i=0 (0-1500): 2000 >= 0. 2000 <= 1500 is False.
        // i=1 (1501-5000): 2000 >= 1501. 2000 <= 5000 is True. Match.
        // Logic seems correct for non-overlapping, sequential ranges.

        // Calculate progress in current level
        let progressInLevel = 0;
        if (currentLevel.max === null) {
            progressInLevel = 1; // Max level full progress
        } else {
            const range = currentLevel.max - currentLevel.min;
            const currentExp = totalAmountCAD - currentLevel.min;
            // Avoid division by zero if range is somehow 0
            progressInLevel = range > 0 ? Math.min(1, Math.max(0, currentExp / range)) : 1;
        }

        return res.status(200).json({
            totalAmount: totalAmountCAD,
            currentLevel: {
                ...currentLevel,
                progressInLevel
            },
            nextLevel: nextLevelInfo
        });

    } catch (error: any) {
        console.error('Get HP Stats Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
