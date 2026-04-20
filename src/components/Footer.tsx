import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#eaded0] px-4 py-12 text-center text-sm text-[#6a5a4b]">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-yellow-500/10 blur-[1px]"
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

      <div className="relative z-10 mx-auto max-w-2xl space-y-4">
        <p className="text-base leading-7">
          yaofan.io 不是通用工具站，它是一个给有趣 AI 小项目续命的地方。
          <br />
          Give interesting AI projects a bite so they stay live.
        </p>
        <p className="text-xs uppercase tracking-[0.24em] opacity-50">
          © {new Date().getFullYear()} yaofan.io
        </p>
      </div>
    </footer>
  );
}
