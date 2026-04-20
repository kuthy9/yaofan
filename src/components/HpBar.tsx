import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

type LevelStats = {
    totalAmount: number;
    currentLevel: {
        level: number;
        key: string;
        name: string;
        min: number;
        max: number | null;
        status: string;
        progressInLevel: number;
    };
    nextLevel: {
        level: number | null;
        name: string | null;
        neededExp: number | null;
    };
};

export function HpBar() {
    const [stats, setStats] = useState<LevelStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/get-hp-stats');
                if (!res.ok) throw new Error('Failed to fetch stats');
                const data = await res.json();
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchStats();
        // Poll every 15 seconds to keep it pseudo-live
        const interval = setInterval(fetchStats, 15000);
        return () => clearInterval(interval);
    }, []);

    // Animate progress bar when stats change
    useEffect(() => {
        if (stats) {
            const timer = setTimeout(() => setProgress(stats.currentLevel.progressInLevel * 100), 500);
            return () => clearTimeout(timer);
        }
    }, [stats]);

    if (loading) {
        return (
            <section className="px-4 py-6">
                <div className="mx-auto max-w-4xl rounded-[28px] border border-[#e4d7ca] bg-white/80 p-6 shadow-[0_16px_44px_rgba(35,27,20,0.05)]">
                    <div className="flex h-20 items-center justify-center text-sm font-medium text-[#96826d]">
                        正在同步本站生存条...
                    </div>
                </div>
            </section>
        );
    }

    if (error || !stats) {
        return (
            <section className="px-4 py-6">
                <div className="mx-auto max-w-4xl rounded-[28px] border border-[#e4d7ca] bg-white/80 p-6 shadow-[0_16px_44px_rgba(35,27,20,0.05)]">
                    <div className="flex h-20 items-center justify-center text-sm font-medium text-[#96826d]">
                        生存条暂时掉线，支付系统和前端脸面还在努力重连。
                    </div>
                </div>
            </section>
        );
    }

    const { currentLevel, nextLevel, totalAmount } = stats;
    const isMaxLevel = currentLevel.max === null;

    return (
        <section className="px-4 py-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mx-auto max-w-4xl space-y-4 overflow-hidden rounded-[28px] border border-[#e5d9cd] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,247,238,0.95))] p-6 shadow-[0_18px_44px_rgba(35,27,20,0.06)] transition-all duration-500 hover:shadow-[0_24px_56px_rgba(35,27,20,0.09)]"
            >
                <div className="mb-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#9a836c]">
                            Site status
                        </p>
                        <h3 className="text-2xl font-black tracking-tight text-[#211a15]">
                            本站今日生存条
                        </h3>
                        <p className="text-sm text-[#6d5d4f]">
                            当前阶段：LV.{currentLevel.level} {currentLevel.name}，累计饭量 CAD ${totalAmount}
                        </p>
                    </div>
                    <Badge variant="outline" className="w-fit border-[#d6c4b2] bg-[#fff8ef] text-[#6a5848]">
                        STATUS: {currentLevel.status}
                    </Badge>
                </div>

                <div className="relative h-8 w-full overflow-hidden rounded-full border border-[#eadfcf] bg-[#f3e7d8] shadow-inner">
                    <motion.div
                        className="relative h-full bg-[linear-gradient(90deg,#221b16,#d97e45)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/30" />
                        <motion.div
                            className="absolute right-0 top-0 h-full w-10 skew-x-12 bg-white/35 blur-md"
                            animate={{ x: [-120, 740] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>

                <p className="pt-2 text-right text-xs text-[#796656]">
                    {isMaxLevel ? (
                        '本站已经被喂到最高阶段。'
                    ) : (
                        `距离下一阶段还差 CAD $${nextLevel.neededExp}`
                    )}
                </p>
            </motion.div>
        </section>
    );
}
