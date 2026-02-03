"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LIST_ITEMS } from "@/constants/ui";

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <aside className="w-1/6 bg-[#111111] border-r border-white/10">
            <div className="h-16 border-b border-white/10 flex items-center p-4">
                <h1 className="text-white font-medium text-2xl">
                    HireTrack
                </h1>
            </div>
            <div className="p-4 space-y-2 flex flex-col">
                {SIDEBAR_LIST_ITEMS.map(({ id, route, label }) => (
                    <Link key={id} href={route} className={`text-white p-2 cursor-pointer rounded-md ${pathname.startsWith(route) ? 'bg-[#1a1a1a] border-l-4 border-blue-500 pl-3' : ''}`}>
                        {label}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;