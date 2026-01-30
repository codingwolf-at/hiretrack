"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LIST_ITEMS } from "@/constants/ui";

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <aside className="w-1/6 border-r border-gray-600">
            <div className="h-14 border-b border-gray-600 flex items-center p-4">
                <h1 className="text-white font-medium text-2xl">
                    HireTrack
                </h1>
            </div>
            <div className="p-4 space-y-2 flex flex-col">
                {SIDEBAR_LIST_ITEMS.map(({ id, route, label }) => (
                    <Link key={id} href={route} className={`text-white p-2 cursor-pointer rounded-md ${pathname.startsWith(route) ? 'bg-gray-800' : ''}`}>
                        {label}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;