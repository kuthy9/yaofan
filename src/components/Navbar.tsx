import { HeartHandshake } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#ebdfd1]/80 bg-[#fffaf4]/85 px-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3 text-[#221b16]">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#201914] text-[#fff0d2] shadow-[0_10px_30px_rgba(32,25,20,0.15)]">
            <HeartHandshake className="size-5" />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight">yaofan.io</div>
            <div className="text-xs uppercase tracking-[0.24em] text-[#907963]">
              keep weird ai alive
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-[#6f5d4c] md:flex">
          <a href="#projects" className="transition hover:text-[#211b16]">
            项目
          </a>
          <a href="#how-it-works" className="transition hover:text-[#211b16]">
            如何运作
          </a>
          <a href="#support" className="transition hover:text-[#211b16]">
            支持
          </a>
        </div>
      </div>
    </nav>
  );
}
