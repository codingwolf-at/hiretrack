"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Briefcase, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
// constants
import { SIDEBAR_LIST_ITEMS } from "@/constants/ui";
// helpers
import { createSupabaseBrowserClient } from "@/lib/supabase/supabaseClient";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();

    const handleLogout = async () => {
        setLoggingOut(true);
        await supabase.auth.signOut();
        router.push('/login');
    }

    return (
        <aside className={`${collapsed ? "w-16" : "w-64"} h-screen border-r border-border bg-sidebar transition-all duration-300`}>
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                    {!collapsed && (
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                                <Briefcase className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <span className="font-semibold text-foreground">HireTrack</span>
                        </Link>
                    )}
                    {collapsed && (
                        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                            <Briefcase className="h-4 w-4 text-accent-foreground" />
                        </div>
                    )}
                </div>
                {/* Navbar */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {SIDEBAR_LIST_ITEMS.map(({ route, icon: Icon, label }) => {
                        const isActive = pathname === route
                        return (
                            <Link
                                key={route}
                                href={route}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors 
                                    ${isActive
                                        ? "bg-sidebar-accent text-accent"
                                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"}
                                `}
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                {!collapsed && <span>{label}</span>}
                            </Link>
                        )
                    })}
                </nav>
                {/* Bottom Section */}
                <div className="border-t border-border p-3">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="mb-2 flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                    >
                        {collapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <>
                                <ChevronLeft className="h-5 w-5" />
                                <span>Collapse</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full cursor-pointer gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
                        disabled={loggingOut}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>Log out</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;