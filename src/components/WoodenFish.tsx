import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function WoodenFish() {
    const [merits, setMerits] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleClick = (e: React.MouseEvent) => {
        const id = Date.now();
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        // Calculate x and y relative to the center of the clicked element
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        setMerits(prev => [...prev, { id, x, y }]);
        setTimeout(() => {
            setMerits(prev => prev.filter(m => m.id !== id));
        }, 1000);
    };

    return (
        <div className="relative cursor-pointer select-none group flex justify-center" onClick={handleClick}>
            <motion.div
                whileTap={{ scale: 0.95, y: 5 }}
                whileHover={{ scale: 1.05 }}
                className="relative w-64 h-64 flex items-center justify-center"
            >
                {/* Halo Effect */}
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />

                {/* Pixel Monk Sprite */}
                {/* Assuming the sprite is 3 frames of 64x64, we'll just show the whole image for now or use CSS to crop if it was a real sprite sheet. 
            Since it's a generated image, I'll display it as a single image for now, or maybe just the first frame if I could crop it. 
            For this task, I'll display the image and assume it's a single frame or just show the whole thing as a stylistic choice if it's a strip.
            Actually, let's just show the image. */}
                <img
                    src="/src/assets/pixel_monk.png"
                    alt="Pixel Monk"
                    className="w-full h-full object-contain pixelated filter drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]"
                    style={{ imageRendering: "pixelated" }}
                />

                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-full" />
            </motion.div>

            <AnimatePresence>
                {merits.map(merit => (
                    <motion.div
                        key={merit.id}
                        initial={{ opacity: 1, y: -50, x: merit.x, scale: 0.5 }}
                        animate={{ opacity: 0, y: -150, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none text-yellow-400 font-black text-2xl z-50 whitespace-nowrap shadow-black drop-shadow-md"
                    >
                        功德 +1
                    </motion.div>
                ))}
            </AnimatePresence>

            <p className="mt-4 text-sm text-muted-foreground animate-pulse">
                (点击积攒赛博功德)
            </p>
        </div>
    );
}
