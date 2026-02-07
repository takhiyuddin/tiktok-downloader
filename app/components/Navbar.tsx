import { Video } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-center w-full py-6">
            <div className="flex items-center gap-2 text-slate-900">
                <div className="p-2 bg-slate-100 rounded-xl">
                    <Video size={24} className="text-slate-900" />
                </div>
                <span className="text-xl font-bold tracking-tight">TikLoad</span>
            </div>
        </nav>
    );
}