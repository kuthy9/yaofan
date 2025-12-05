import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ReasonCardProps {
    title: string;
    content: string;
    delay?: number;
}

export function ReasonCard({ title, content, delay = 0 }: ReasonCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
            whileHover={{
                scale: 1.02,
                rotate: [0, 0.5, -0.5, 0],
                transition: { rotate: { duration: 0.4, repeat: 1, ease: "easeInOut" } }
            }}
        >
            <Card className="h-full bg-warm-card border-neutral-200/50 hover:border-amber-gold/50 hover:shadow-[0_0_20px_rgba(255,198,75,0.1)] transition-all duration-500 group">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#333333] group-hover:text-amber-dark transition-colors duration-500 font-sans">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-text-sub leading-relaxed font-serif text-lg">
                        {content}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function ReasonSection() {
    const reasons = [
        {
            title: "创业烧钱版",
            content: "想一边搞奇怪的 SaaS，一边还活着。你的打钱会直接被我换成云服务、速冻水饺，还有 ChatGPT Plus。"
        },
        {
            title: "精神卫生版",
            content: "你给我的钱，不一定能改变世界。但大概率能让我少怀疑人生 0.3 天。"
        },
        {
            title: "诚实打赏版",
            content: "这不是梦想众筹，也不是公益项目。就是一个成年人的体面要饭现场。"
        }
    ];

    return (
        <section className="py-12 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-text-main inline-block border-b-4 border-amber-gold/30 pb-2">
                    要饭理由
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reasons.map((reason, index) => (
                    <ReasonCard key={index} {...reason} delay={index * 0.1} />
                ))}
            </div>
        </section>
    );
}
