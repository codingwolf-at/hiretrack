"use client";

import React, { useCallback, useState } from "react";
import type { User } from "@supabase/supabase-js";
// constants
import { APPLICATION_MODES } from "@/constants/ui";
// components
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import SlideOver from "@/components/layout/SlideOver";
import ApplicationForm from "@/components/dashboard/ApplicationForm";

type DashboardShellProps = {
    children: React.ReactNode;
    user: User;
};

const DashboardShell = ({ children, user }: DashboardShellProps) => {
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

    const closeSlideOver = useCallback(() => {
        setIsSlideOverOpen(false);
    }, []);

    const openSlideOver = useCallback(() => {
        setIsSlideOverOpen(true);
    }, []);

    return (
        <main className="flex min-h-screen w-full bg-background">
            <Sidebar />
            <div className="flex-1 transition-all duration-300">
                <Topbar user={user} openSlideOver={openSlideOver} />
                {children}
            </div>
            <SlideOver active={isSlideOverOpen} onClose={closeSlideOver}>
                <ApplicationForm
                    mode={APPLICATION_MODES.CREATE}
                    onClose={closeSlideOver}
                    active={isSlideOverOpen}
                />
            </SlideOver>
        </main>
    );
};

export default DashboardShell;