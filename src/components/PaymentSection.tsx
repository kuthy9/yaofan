import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

import { projects, supportTiers } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CheckoutType = "single_project" | "all_access";

export function PaymentSection() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<CheckoutType | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [donorInfo, setDonorInfo] = useState({ name: "", message: "" });

  const handlePaymentClick = (type: CheckoutType) => {
    setSelectedType(type);
    setIsOpen(true);
  };

  const confirmPayment = async () => {
    if (!selectedType) return;
    setIsLoading(selectedType);

    try {
      const selectedProject = projects.find((project) => project.id === selectedProjectId);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: selectedType,
          display_name: donorInfo.name,
          message: donorInfo.message,
          project_id: selectedType === "single_project" ? selectedProject?.id : "all",
          project_name: selectedType === "single_project" ? selectedProject?.name : "全部都要",
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

  return (
    <section id="support" className="px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl space-y-12"
      >
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9b856d]">
            Membership / Pricing
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#211b16] md:text-5xl">
            喜欢就投喂，不喜欢就当你刚刚试过了
          </h2>
          <p className="text-base leading-7 text-[#6d5e4f]">
            这里只有两种支持方式：给一个项目喂饱，或者直接把整个站一起养着。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {supportTiers.map((tier) => (
            <motion.div
              key={tier.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="h-full"
            >
              <div
                className={`relative flex h-full flex-col rounded-[32px] border p-8 text-left shadow-[0_18px_44px_rgba(32,24,18,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(32,24,18,0.08)] ${
                  tier.id === "all_access"
                    ? "border-[#201914] bg-[#201914] text-[#fff0d1]"
                    : "border-[#e0d3c5] bg-white text-[#231c17]"
                }`}
              >
                <div className="flex-1 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-2xl font-black tracking-tight">{tier.name}</div>
                      <div
                        className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                          tier.id === "all_access" ? "text-[#edc48b]" : "text-[#9c8369]"
                        }`}
                      >
                        {tier.englishName}
                      </div>
                    </div>
                    {tier.badge ? (
                      <div className="rounded-full bg-[#f4d19a] px-3 py-1 text-xs font-semibold text-[#201914]">
                        {tier.badge}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-4xl font-black tracking-tight">{tier.price}</div>
                  <p
                    className={`text-sm leading-7 ${
                      tier.id === "all_access" ? "text-[#eadcc4]" : "text-[#655648]"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <div
                    className={`rounded-3xl border p-4 text-sm leading-7 ${
                      tier.id === "all_access"
                        ? "border-white/10 bg-white/5 text-[#f3e6d1]"
                        : "border-[#ece1d5] bg-[#fff8ef] text-[#6c5c4d]"
                    }`}
                  >
                    {tier.id === "single_project"
                      ? "单项目续命 / 给一个项目喂饱它"
                      : "全站通行证 / Full access pass"}
                  </div>
                </div>

                <Button
                  size="lg"
                  className={`mt-8 h-12 rounded-full font-semibold ${
                    tier.id === "all_access"
                      ? "bg-[#fff0d1] text-[#1f1915] hover:bg-[#ffe3b1]"
                      : "bg-[#1f1915] text-[#fff0d1] hover:bg-[#3a2d22]"
                  }`}
                  onClick={() => handlePaymentClick(tier.id)}
                  disabled={isLoading === tier.id}
                >
                  {isLoading === tier.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-xl border-[#e0d3c5] bg-[#fffaf4]">
          <DialogHeader>
            <DialogTitle>{selectedType === "all_access" ? "我全都要" : "给它一口饭"}</DialogTitle>
            <DialogDescription>
              你的名字和留言会出现在最近投喂列表里，不填也不影响支付。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedType === "single_project" ? (
              <div className="space-y-2">
                <Label>你想喂哪一个项目</Label>
                <div className="grid gap-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        selectedProjectId === project.id
                          ? "border-[#201914] bg-[#201914] text-[#fff0d1]"
                          : "border-[#dfd2c3] bg-white text-[#2d241c] hover:border-[#201914]"
                      }`}
                    >
                      <div className="font-semibold">{project.name}</div>
                      <div
                        className={`text-xs ${
                          selectedProjectId === project.id ? "text-[#edc48b]" : "text-[#8f7a66]"
                        }`}
                      >
                        {project.nextUpdate}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="name">昵称 (可选)</Label>
              <Input
                id="name"
                placeholder="匿名好心人"
                value={donorInfo.name}
                onChange={(event) =>
                  setDonorInfo({ ...donorInfo, name: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">祝福语 (可选)</Label>
              <Textarea
                id="message"
                placeholder="让它继续更新，别半路饿死。"
                value={donorInfo.message}
                onChange={(event) =>
                  setDonorInfo({ ...donorInfo, message: event.target.value })
                }
              />
            </div>

            <Button className="w-full font-bold" onClick={confirmPayment} disabled={!!isLoading}>
              {isLoading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null}
              {isLoading ? "跳转支付中..." : "前往 Stripe 支付"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
