
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, VolumeX, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ThankYou() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [showUnmuteBtn, setShowUnmuteBtn] = useState(false);

    useEffect(() => {
        const playVideo = async () => {
            if (videoRef.current) {
                try {
                    videoRef.current.volume = 0.6; // Set a reasonable volume
                    await videoRef.current.play();
                    setShowUnmuteBtn(false);
                } catch (err) {
                    console.log("Autoplay blocked, falling back to muted", err);
                    // Fallback to muted autoplay
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        setShowUnmuteBtn(true);
                        try {
                            await videoRef.current.play();
                        } catch (e) {
                            console.error("Muted autoplay also failed", e);
                        }
                    }
                }
            }
        };

        playVideo();
    }, []);

    const handleVideoEnded = () => {
        setIsTransitioning(false);
    };

    const handleUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            setShowUnmuteBtn(false);
        }
    };

    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            // Optional: If we want to re-trigger the "focus" feel, we could set isTransitioning(true) again,
            // but the user said "Video area always in the middle; after video ends, can click monk to replay".
            // Keeping the layout stable is probably better for replay.
        }
    };

    return (
        <div className={cn(
            "min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-8 overflow-hidden relative transition-colors duration-1000 ease-in-out",
            isTransitioning ? "bg-black" : "bg-background"
        )}>

            {/* Ambient Background Glow - Changes based on state */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-1000 pointer-events-none",
                isTransitioning ? "opacity-100" : "opacity-30"
            )}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-amber-gold/20 via-transparent to-transparent blur-3xl" />
            </div>

            {/* Content Container - Fades in after transition */}
            <motion.div
                className="space-y-4 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -20 : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-amber-gold to-amber-dark font-sans drop-shadow-[0_0_15px_rgba(255,198,75,0.3)]">
                    投喂成功
                </h1>
                <p className="text-xl text-neutral-gray font-serif">
                    这个小项目又多活了一会儿。
                </p>
            </motion.div>

            {/* Video Area */}
            <motion.div
                className="relative z-20 group"
                layout // Allow smooth layout transition if size changes (though we keep it fixed mostly)
            >
                <div className={cn(
                    "relative w-72 md:w-80 aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-700",
                    isTransitioning ? "scale-110 shadow-[0_0_50px_rgba(255,198,75,0.3)]" : "scale-100 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,198,75,0.2)]"
                )}>
                    {/* Golden Glow Border/Backdrop */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-gold/10 to-transparent pointer-events-none" />

                    <video
                        ref={videoRef}
                        src="/shipin.mp4"
                        className="w-full h-full object-cover"
                        playsInline
                        onEnded={handleVideoEnded}
                        onClick={handleReplay}
                    />

                    {/* Unmute Button (Graceful Degradation) */}
                    <AnimatePresence>
                        {showUnmuteBtn && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleUnmute}
                                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                            >
                                <VolumeX className="w-5 h-5" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Replay Overlay (Only shows on hover after played once) */}
                    {!isTransitioning && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            onClick={handleReplay}
                        >
                            <RefreshCw className="w-10 h-10 text-white drop-shadow-lg opacity-80" />
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Bottom Content - Fades in after transition */}
            <motion.div
                className="w-full max-w-md space-y-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium font-mono text-amber-dark">
                        <span>今日功德进度</span>
                        <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2 bg-gray-100 border border-neutral-pink/50 [&>div]:bg-amber-gold shadow-[0_0_10px_rgba(255,198,75,0.2)]" />
                    <p className="text-xs text-muted-foreground pt-2 font-serif">
                        你的支持会优先变成 API 额度、版本更新和下一轮奇怪想法。
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 gap-2 border-neutral-pink/30 hover:bg-amber-gold/10 hover:text-amber-dark transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,198,75,0.2)] font-sans"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        回到项目现场
                    </Button>
                    <Button
                        size="lg"
                        className="flex-1 gap-2 bg-gradient-to-r from-amber-gold to-amber-dark hover:from-amber-dark hover:to-amber-light text-black shadow-[0_0_20px_rgba(255,198,75,0.2)] hover:shadow-[0_0_30px_rgba(255,198,75,0.4)] border-0 transition-all duration-300 font-sans font-bold"
                        onClick={() => alert("已复制链接，快去祸害朋友吧！")}
                    >
                        <Share2 className="w-4 h-4" />
                        把这个项目分享给朋友
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
