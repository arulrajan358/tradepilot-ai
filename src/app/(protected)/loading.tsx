import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="h-full w-full flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-brand-blue" />
                <p className="text-slate-400 text-sm animate-pulse">Loading TradePilot...</p>
            </div>
        </div>
    );
}
