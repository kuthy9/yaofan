import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

import { brandCopy } from "@/data/siteContent";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(255,214,148,0.32),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(240,137,84,0.18),transparent_24%),linear-gradient(180deg,#fff9f2_0%,#fff6ee_100%)]" />
      <div className="absolute left-[8%] top-16 -z-10 h-40 w-40 rounded-full bg-[#ffdca0]/40 blur-3xl" />
      <div className="absolute right-[10%] top-24 -z-10 h-48 w-48 rounded-full bg-[#ffc7a6]/30 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2d3c2] bg-white/80 px-4 py-2 text-sm font-semibold text-[#6a5643] shadow-[0_12px_30px_rgba(45,35,24,0.06)]">
            <Star className="size-4 text-[#ef8f54]" />
            {brandCopy.eyebrow}
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.04em] text-[#1f1915] md:text-7xl">
              {brandCopy.headline}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#645547] md:text-xl">
              {brandCopy.subheadline}
            </p>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#9b8168]">
              {brandCopy.supportLine}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#1f1915] px-6 text-[#fff2d4] hover:bg-[#34281f]"
            >
              <a href="#projects">
                立即试玩
                <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-[#cfbda8] bg-white/80 px-6 text-[#2a221c] hover:bg-[#fff1de]"
            >
              <a href="#support">我全力支持</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative"
        >
          <div className="rounded-[32px] border border-[#e8dbcd] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,244,229,0.88))] p-6 shadow-[0_30px_80px_rgba(40,30,21,0.08)]">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[#927961]">
              <span>Feed the playground</span>
              <span>not a SaaS</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-[#1f1915] p-5 text-left text-[#fff0d1]">
                <div className="text-xs uppercase tracking-[0.22em] text-[#e9c692]">
                  为什么存在
                </div>
                <p className="mt-3 text-lg font-semibold leading-8">
                  因为互联网上值得留下来的，不一定是最正经的工具。
                </p>
              </div>

              <div className="rounded-[24px] border border-[#eadccd] bg-white p-5 text-left">
                <div className="text-xs uppercase tracking-[0.22em] text-[#9e876f]">
                  你会看到
                </div>
                <p className="mt-3 text-sm leading-7 text-[#5d4f41]">
                  三个能现场试的 AI 小项目，一个全站通行证，以及一些略带讽刺但确实能用的文案。
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#6c5b4a]">
              {["轻松活泼", "互联网原生", "有点讽刺", "但真能用"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#e5d6c6] bg-[#fff8f0] px-3 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-5 left-6 rotate-[-3deg] rounded-2xl border border-[#ebdac8] bg-white px-4 py-3 text-sm text-[#705d49] shadow-[0_18px_40px_rgba(41,30,18,0.08)]">
            “先好玩，再活下去。”
          </div>
        </motion.div>
      </div>
    </section>
  );
}
