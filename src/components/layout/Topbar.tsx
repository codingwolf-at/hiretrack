"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";

import { SIDEBAR_LIST_ITEMS } from "@/constants/ui";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const Topbar = ({ user }: { user: User }) => {

    const [loggingOut, setLoggingOut] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const userName = user.user_metadata?.full_name || user.email?.split("@")[0];
    const currentRouteLabel = SIDEBAR_LIST_ITEMS.find(el => pathname.startsWith(el.route))?.label;

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        router.push('/login');
    }

    return (
        <div className="text-white h-14 border-b border-gray-600 flex justify-between items-center p-4">
            <p className="font-medium text-lg">
                {currentRouteLabel}
            </p>
            <div className="flex gap-4">
                <p>{userName}</p>
                <button type="button" onClick={handleLogout} className="cursor-pointer">
                    {loggingOut ? "Logging out..." : "Logout"}
                </button>
            </div>
        </div>
    );
};

export default Topbar;