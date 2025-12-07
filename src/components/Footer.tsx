import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="py-12 px-4 text-center text-sm text-muted-foreground border-t border-border/50 relative overflow-hidden">
            {/* Floating Particles */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-yellow-500/10 rounded-full blur-[1px]"
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, -50],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <p className="font-serif">
                    免责声明：本网站本质上是一个打赏页面，所有要饭行为均出于自愿。
                    <br />
                    打钱不能退款，但可以换来一条真诚的谢谢，以及我继续在互联网上抽象地活下去的勇气。
                </p>
                <p className="opacity-50 font-mono text-xs">
                    © {new Date().getFullYear()} yaofan.io
                </p>
            </div>
        </footer>
    );
}
