"use client";

import { mergeClass } from "@/lib/ui";

const Spinner = ({ className = "" }: { className?: string }) => {
    return (
        <div className={mergeClass("w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin", className)} />
    );
};

export default Spinner;
