import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />

            {/* Floating Particles */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/10 rounded-full blur-[1px]"
                        style={{
                            width: Math.random() * 4 + 2 + "px",
                            height: Math.random() * 4 + 2 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, -100],
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 max-w-4xl relative z-10"
            >
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none select-none font-sans">
                    <motion.span
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 filter drop-shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                        animate={{
                            y: [0, -2, 0, 2, 0],
                            opacity: [0.9, 1, 0.9]
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                    >
                        我要饭
                    </motion.span>
                    <motion.span
                        className="block text-4xl md:text-6xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#E7E7E7] to-[#F2A0B3] font-bold italic"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        但讲道理
                    </motion.span>
                </h1>

                <motion.p
                    className="text-xl md:text-2xl text-text-main max-w-2xl mx-auto tracking-wide font-serif font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    用一杯奶茶的钱，帮我多活一天。
                </motion.p>

                <motion.div
                    className="pt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button size="lg" className="text-lg px-10 py-8 rounded-full bg-amber-gold text-text-main hover:bg-gradient-to-r hover:from-amber-dark hover:to-amber-light transition-all duration-500 shadow-[0_0_30px_rgba(255,198,75,0.3)] border border-white/20 backdrop-blur-md font-sans font-bold">
                        施舍一下
                    </Button>
                </motion.div>
            </motion.div>

            {/* Abstract Shapes */}
            <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-[100vw] h-[100vw] bg-gradient-to-b from-purple-500/5 to-transparent rounded-full blur-3xl"
                />
            </div>
        </section>
    );
}
