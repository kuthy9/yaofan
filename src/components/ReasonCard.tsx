import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { howItWorksSteps } from "@/data/siteContent";

interface ReasonCardProps {
    title: string;
    content: string;
    delay?: number;
    index: number;
}

export function ReasonCard({ title, content, delay = 0, index }: ReasonCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
        >
            <Card className="h-full rounded-[28px] border-[#e5d8ca] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,240,0.96))] shadow-[0_16px_44px_rgba(34,27,20,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(34,27,20,0.08)]">
                <CardHeader>
                    <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#a18870]">
                        0{index}
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight text-[#211a16]">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base leading-7 text-[#665648]">
                        {content}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function ReasonSection() {
    return (
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-12 max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9b856d]">
                    它是如何工作的
                </p>
                <h2 className="text-3xl font-black tracking-tight text-[#211b16] md:text-5xl">
                    很简单，先玩，再喂，再等它更新
                </h2>
                <p className="text-base leading-7 text-[#6d5e4f]">
                    这不是企业工作流，也不搞复杂增长漏斗。就是把喜欢变成更新频率。
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {howItWorksSteps.map((reason, index) => (
                    <ReasonCard key={reason.id} title={reason.title} content={reason.description} delay={index * 0.1} index={index + 1} />
                ))}
            </div>
        </section>
    );
}
