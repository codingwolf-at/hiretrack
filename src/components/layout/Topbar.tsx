"use client";

import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { SIDEBAR_LIST_ITEMS } from "@/constants/ui";

const Topbar = ({ user }: { user: User }) => {

    const pathname = usePathname();

    const userName = user.user_metadata?.full_name || user.email?.split("@")[0];
    const currentRouteLabel = SIDEBAR_LIST_ITEMS.find(el => el.route === pathname)?.label;

    return (
        <div className="text-white h-14 border-b border-gray-600 flex justify-between items-center p-4">
            <p className="font-medium text-lg">
                {currentRouteLabel}
            </p>
            <div className="flex gap-4">
                <p>{userName}</p>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default Topbar;