import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HpBar } from "@/components/HpBar";
import { ReasonSection } from "@/components/ReasonCard";
import { PaymentSection } from "@/components/PaymentSection";
import { MeritWall } from "@/components/MeritWall";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-warm-white text-text-main font-sans selection:bg-amber-gold/30">
            <Navbar />
            <main className="space-y-0 pb-20">
                <Hero />
                <div className="-mt-12 relative z-20">
                    <HpBar />
                </div>

                {/* Grouped Interaction Section */}
                <div className="space-y-8 pt-12">
                    <PaymentSection />
                    <ReasonSection />
                </div>

                <MeritWall />
            </main>
            <Footer />
        </div>
    );
}
