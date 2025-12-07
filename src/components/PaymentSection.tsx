import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Coffee, Utensils, Cloud, Loader2 } from "lucide-react";
import { useState } from "react";

type CheckoutType = "drink" | "dinner" | "cloud";

export function PaymentSection() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("100");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<CheckoutType | null>(null);
    const [donorInfo, setDonorInfo] = useState({ name: "", message: "" });

    const handlePaymentClick = (type: CheckoutType) => {
        setSelectedType(type);
        setIsOpen(true);
    };

    const confirmPayment = async () => {
        if (!selectedType) return;
        setIsLoading(selectedType);
        try {
            const amount = selectedType === 'cloud' ? Number(customAmount) : undefined;
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: selectedType,
                    amount,
                    display_name: donorInfo.name,
                    message: donorInfo.message
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("支付初始化失败，请稍后再试。");
            setIsLoading(null);
            setIsOpen(false);
        }
    };

    const options = [
        {
            id: "drink",
            icon: Coffee,
            label: "请 TA 喝杯饮料",
            price: "$15",
            desc: "我会在心里默默喊你一声大哥。",
            color: "hover:bg-amber-gold/10 hover:border-amber-gold text-text-main",
            action: () => handlePaymentClick("drink")
        },
        {
            id: "dinner",
            icon: Utensils,
            label: "资助一顿正经晚饭",
            price: "$40",
            desc: "我会认真咀嚼每一口，以示尊重。",
            color: "hover:bg-amber-gold/20 hover:border-amber-dark text-text-main",
            action: () => handlePaymentClick("dinner")
        },
        {
            id: "cloud",
            icon: Cloud,
            label: "拯救云服务账单",
            price: "自定义",
            desc: "这是高级行为，我会截图存档。",
            color: "hover:bg-rouge-pink/10 hover:border-rouge-pink text-text-main",
            isCustom: true
        }
    ];

    return (
        <section className="py-12 px-4 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto space-y-12"
            >
                <h2 className="text-2xl md:text-3xl font-semibold text-[#222222]">
                    用金钱投票：TA 值不值得多活一天？
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {options.map((opt) => (
                        <motion.div
                            key={opt.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-full"
                        >
                            <div className={`h-full flex flex-col p-6 rounded-lg border-2 border-neutral-200 bg-white transition-all duration-300 shadow-sm hover:shadow-md ${opt.color} relative group`}>
                                <div className="flex-1 flex flex-col items-center gap-4 cursor-pointer" onClick={!opt.isCustom ? opt.action : undefined}>
                                    <opt.icon className="w-8 h-8 text-text-sub" />
                                    <div className="space-y-1">
                                        <div className="text-lg font-bold">{opt.label}</div>
                                        <div className="text-2xl font-black">{opt.price}</div>
                                    </div>
                                    <div className="text-xs text-text-sub opacity-80 font-serif">
                                        {opt.desc}
                                    </div>
                                </div>

                                {opt.isCustom && (
                                    <div className="mt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-text-sub">CAD $</span>
                                            <Input
                                                type="number"
                                                min="1"
                                                value={customAmount}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomAmount(e.target.value)}
                                                className="h-8 text-center font-mono"
                                            />
                                        </div>
                                        <Button
                                            className="w-full bg-rouge-pink hover:bg-rouge-pink/90 text-white font-bold h-8"
                                            onClick={() => handlePaymentClick("cloud")}
                                            disabled={isLoading === "cloud"}
                                        >
                                            {isLoading === "cloud" ? <Loader2 className="w-4 h-4 animate-spin" /> : "支付"}
                                        </Button>
                                    </div>
                                )}

                                {!opt.isCustom && (
                                    <Button
                                        variant="ghost"
                                        className="absolute inset-0 w-full h-full opacity-0"
                                        onClick={opt.action}
                                        disabled={isLoading === opt.id}
                                    >
                                        <span className="sr-only">Select {opt.label}</span>
                                    </Button>
                                )}

                                {isLoading === opt.id && !opt.isCustom && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg">
                                        <Loader2 className="w-8 h-8 animate-spin text-amber-gold" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md bg-white border-neutral-200">
                    <DialogHeader>
                        <DialogTitle>留个名吧，好心人</DialogTitle>
                        <DialogDescription>
                            您的名字和祝福语将出现在功德墙上（即使不填也不影响功德）。
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">昵称 (可选)</Label>
                            <Input
                                id="name"
                                placeholder="匿名好心人"
                                value={donorInfo.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">祝福语 (可选)</Label>
                            <Textarea
                                id="message"
                                placeholder="功德 +1"
                                value={donorInfo.message}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                            />
                        </div>
                        <Button
                            className="w-full font-bold"
                            onClick={confirmPayment}
                            disabled={!!isLoading}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {isLoading ? "跳转支付中..." : "确认支付"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
