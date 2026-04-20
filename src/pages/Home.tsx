import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HpBar } from "@/components/HpBar";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ReasonSection } from "@/components/ReasonCard";
import { PaymentSection } from "@/components/PaymentSection";
import { MeritWall } from "@/components/MeritWall";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#fff9f2] text-[#241d18] selection:bg-[#ffd38a]/40">
            <Navbar />
            <main className="pb-20">
                <Hero />
                <HpBar />
                <ProjectShowcase />
                <ReasonSection />
                <PaymentSection />
                <MeritWall />
            </main>
            <Footer />
        </div>
    );
}
