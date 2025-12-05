
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const donors = [
    { id: 1, name: "张三", amount: "¥50", message: "功德 +1，愿代码无 bug" },
    { id: 2, name: "李四", amount: "¥100", message: "功德 +1，早日退休" },
    { id: 3, name: "王五", amount: "¥20", message: "功德 +1，头发茂密" },
    { id: 4, name: "赵六", amount: "¥666", message: "功德 +1，财源广进" },
    { id: 5, name: "钱七", amount: "¥88", message: "功德 +1，身体健康" }
];

export function MeritWall() {
    const [visibleDonors, setVisibleDonors] = useState(donors.slice(0, 3));

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleDonors(prev => {
                const next = [...prev];
                next.shift();
                next.push(donors[Math.floor(Math.random() * donors.length)]);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 px-4 bg-warm-white/50 border-t border-neutral-200/30">
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-center text-sm font-mono text-text-sub uppercase tracking-widest opacity-70">
                    最近几位好心人 (功德 +1)
                </h2>

                <div className="relative h-[300px] overflow-hidden rounded-xl bg-white border border-neutral-200 shadow-sm p-6">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10 pointer-events-none" />

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {visibleDonors.map((donor) => (
                                <motion.div
                                    key={donor.id}
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center justify-between p-3 rounded-lg bg-warm-card border border-neutral-100/50 hover:border-amber-gold/30 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-gold/10 flex items-center justify-center text-amber-dark font-bold text-xs">
                                            {donor.name[0]}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold text-text-main font-sans">{donor.name}</p>
                                            <p className="text-xs text-text-sub font-serif">{donor.message}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-amber-dark font-mono">{donor.amount}</p>
                                        <p className="text-[10px] text-neutral-400 group-hover:text-amber-gold transition-colors">功德 +1</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
