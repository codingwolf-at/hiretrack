"use client";

import type { User } from "@supabase/supabase-js";
// types
import { InterviewWithApplication } from "@/types/interview";
// components
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import SlideOver from "@/components/layout/SlideOver";
import ApplicationForm from "@/components/dashboard/ApplicationForm";
import { ApplicationUIProvider } from "@/context/ApplicationUIContext";

type DashboardShellProps = {
    children: React.ReactNode;
    user: User;
    interviews: InterviewWithApplication[];
};

const DashboardShell = ({ children, user, interviews }: DashboardShellProps) => {

    return (
        <ApplicationUIProvider>
            <main className="flex min-h-screen w-full bg-background">
                <Sidebar />
                <div className="flex-1 transition-all duration-300">
                    <Topbar user={user} />
                    {children}
                </div>
                <SlideOver>
                    <ApplicationForm interviews={interviews} />
                </SlideOver>
            </main>
        </ApplicationUIProvider>
    );
};

export default DashboardShell;