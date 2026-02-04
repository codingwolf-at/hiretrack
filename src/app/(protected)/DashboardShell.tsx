"use client";

import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";
import Topbar from "@/components/layout/Topbar";
import SlideOver from "@/components/ui/SlideOver";
import Sidebar from "@/components/layout/Sidebar";

type DashboardShellProps = {
    children: React.ReactNode;
    user: User;
};

const DashboardShell = ({ children, user }: DashboardShellProps) => {
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)

    return (
        <main className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <div className="flex-1 transition-all duration-300">
                <Topbar user={user} openSlideOver={() => setIsSlideOverOpen(true)} />
                {children}
            </div>
            <SlideOver active={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)}>
                <p>
                    testing slide over compo
                </p>
            </SlideOver>
        </main>
    );
};

export default DashboardShell;