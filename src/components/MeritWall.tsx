
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type PaymentItem = {
    id: string;
    display_name: string | null;
    message: string | null;
    amount: number;
    currency: string;
    display_amount: string;
    created_at: string;
};

export function MeritWall() {
    const [donors, setDonors] = useState<PaymentItem[]>([]);
    const [visibleDonors, setVisibleDonors] = useState<PaymentItem[]>([]);

    const fetchPayments = async () => {
        try {
            const response = await fetch("/api/payments?limit=30");
            if (!response.ok) throw new Error("Failed to fetch");
            const data: PaymentItem[] = await response.json();
            setDonors(data);
            if (data.length > 0 && visibleDonors.length === 0) {
                // Initial load
                setVisibleDonors(data.slice(0, 3));
            }
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    // Initial fetch and polling
    useEffect(() => {
        fetchPayments();
        const interval = setInterval(fetchPayments, 10000);
        return () => clearInterval(interval);
    }, []);

    // Rotate displayed donors
    useEffect(() => {
        if (donors.length === 0) return;
        const interval = setInterval(() => {
            setVisibleDonors(prev => {
                const next = [...prev];
                if (next.length >= 3) next.shift();

                // Pick a random donor not currently visible if possible, or just random
                const nextDonor = donors[Math.floor(Math.random() * donors.length)];
                next.push(nextDonor);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [donors]);

    return (
        <section className="py-12 px-4 bg-warm-white/50 border-t border-neutral-200/30">
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-center text-sm font-mono text-text-sub uppercase tracking-widest opacity-70">
                    最近几位好心人
                </h2>

                <div className="relative h-[300px] overflow-hidden rounded-xl bg-white border border-neutral-200 shadow-sm p-6">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10 pointer-events-none" />

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {visibleDonors.map((donor, idx) => (
                                <motion.div
                                    key={`${donor.id}-${idx}`} // Use index to allow same donor multiple times
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center justify-between p-3 rounded-lg bg-warm-card border border-neutral-100/50 hover:border-amber-gold/30 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-gold/10 flex items-center justify-center text-amber-dark font-bold text-xs uppercase">
                                            {(donor.display_name || "隐")[0]}
                                        </div>
                                        <div className="space-y-0.5 text-left">
                                            <p className="text-sm font-bold text-text-main font-sans">{donor.display_name || "匿名好心人"}</p>
                                            <p className="text-xs text-text-sub font-serif">{donor.message || "功德 +1"}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-amber-dark font-mono">
                                            {donor.currency.toUpperCase() === 'CAD' ? 'CA$' : '¥'}{donor.display_amount}
                                        </p>
                                        <p className="text-[10px] text-neutral-400 group-hover:text-amber-gold transition-colors">功德 +1</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {donors.length === 0 && (
                            <div className="text-center text-gray-400 py-10">
                                努力加载功德中...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
