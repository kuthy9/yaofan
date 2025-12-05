import { Heart } from "lucide-react";

export function Navbar() {
    return (
        <nav className="w-full py-6 px-8 flex justify-between items-center bg-transparent relative z-50">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
                <span>Begging.com</span>
            </div>
            <div className="text-sm text-muted-foreground hidden md:block">
                体面要饭，从我做起
            </div>
        </nav>
    );
}
