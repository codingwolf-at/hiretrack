"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
// constants
import { SIDEBAR_LIST_ITEMS } from "@/constants/ui";
// components
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";

type TopbarProps = {
    user: User;
    openSlideOver: () => void;
};

const Topbar = ({ user, openSlideOver }: TopbarProps ) => {

    const pathname = usePathname();

    const userName = user.user_metadata?.full_name || user.email?.split("@")[0];
    const currentRouteLabel = SIDEBAR_LIST_ITEMS.find(el => pathname.startsWith(el.route))?.label;

    return (
        <header className="flex z-50 h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div>
                <p className="text-xl font-semibold text-foreground">
                    {currentRouteLabel}
                </p>
                {/* TODO: make this dynamic based on route */}
                <p className="text-sm text-muted-foreground">Track your job search progress</p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={openSlideOver}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Application</span>
                    <span className="sm:hidden">Add</span>
                </Button>

                <Avatar userName={userName} />
            </div>
        </header>
    );
};

export default Topbar;