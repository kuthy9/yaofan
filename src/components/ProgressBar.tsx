import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ProgressBar() {
    const [progress, setProgress] = useState(0);
    const target = 800;
    const current = 224;
    const percentage = Math.round((current / target) * 100);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(percentage), 500);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <section className="py-8 px-4 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-4 bg-warm-card p-6 rounded-none border border-neutral-200/50 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500"
            >
                {/* Pixel corners - lighter */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-neutral-200" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-neutral-200" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-neutral-200" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-neutral-200" />

                <div className="flex justify-between items-end mb-2 font-mono">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold tracking-tight text-text-main font-sans">HP / 饭钱</h3>
                        <p className="text-xs text-text-sub font-serif">LV.1 乞讨者 (¥{current} / ¥{target})</p>
                    </div>
                    <Badge variant="outline" className="animate-pulse border-amber-gold text-amber-dark rounded-none font-mono text-xs bg-amber-gold/5">
                        STATUS: 勉强维持人类形态
                    </Badge>
                </div>

                {/* HP Bar Container */}
                <div className="relative h-8 w-full bg-white border border-neutral-200 rounded-none overflow-hidden shadow-inner">
                    {/* Grid background */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xIDFhMSAxIDAgMSAwIDIgMGExIDEgMCAxIDAtMiAweiIgZmlsbD0iI2Q4YzhjOCIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20" />

                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-gold to-rouge-pink relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    >
                        {/* Shine effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/30" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5" />

                        {/* Glare animation */}
                        <motion.div
                            className="absolute top-0 right-0 w-10 h-full bg-white/40 skew-x-12 blur-md"
                            animate={{ x: [-200, 800] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>

                <p className="text-xs text-right text-text-sub pt-2 font-mono">
                    NEXT LEVEL: ¥{target - current} EXP
                </p>
            </motion.div>
        </section>
    );
}
