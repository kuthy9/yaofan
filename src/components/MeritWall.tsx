import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PaymentItem = {
  id: string;
  display_name: string | null;
  message: string | null;
  amount: number;
  currency: string;
  display_amount: string;
  created_at: string;
};

export function MeritWall() {
  const [donors, setDonors] = useState<PaymentItem[]>([]);
  const [visibleDonors, setVisibleDonors] = useState<PaymentItem[]>([]);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/payments?limit=30");
      if (!response.ok) throw new Error("Failed to fetch");
      const data: PaymentItem[] = await response.json();
      setDonors(data);
      setVisibleDonors((current) => (current.length === 0 ? data.slice(0, 3) : current));
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
    const interval = setInterval(fetchPayments, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (donors.length === 0) return;

    const interval = setInterval(() => {
      setVisibleDonors((prev) => {
        const next = [...prev];
        if (next.length >= 3) next.shift();
        const nextDonor = donors[Math.floor(Math.random() * donors.length)];
        next.push(nextDonor);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [donors]);

  return (
    <section className="border-t border-[#eaded0] bg-white/50 px-4 py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.28em] text-[#917b64]">
          刚刚有人投喂
        </h2>

        <div className="relative h-[320px] overflow-hidden rounded-[32px] border border-[#e4d8cb] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,240,0.96))] p-6 shadow-[0_16px_44px_rgba(34,26,19,0.06)]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white via-transparent to-white" />

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {visibleDonors.map((donor, index) => (
                <motion.div
                  key={`${donor.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5 }}
                  className="group flex items-center justify-between rounded-3xl border border-[#ece1d6] bg-white p-4 transition-colors hover:border-[#d3b899]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1de] text-xs font-bold uppercase text-[#8e6849]">
                      {(donor.display_name || "隐")[0]}
                    </div>
                    <div className="space-y-0.5 text-left">
                      <p className="text-sm font-bold text-[#221b16]">
                        {donor.display_name || "匿名好心人"}
                      </p>
                      <p className="text-xs text-[#6c5d4d]">{donor.message || "给它一口饭。"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#d77c44]">${donor.display_amount}</p>
                    <p className="text-[10px] text-neutral-400 transition-colors group-hover:text-[#9d7a59]">
                      继续存活
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {donors.length === 0 ? (
              <div className="py-10 text-center text-gray-400">努力加载最近的投喂记录...</div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
