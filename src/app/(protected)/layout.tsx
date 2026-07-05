import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { getUserInterviews } from "@/lib/db/interviews";
import DashboardShell from "./DashboardShell";

const Layout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data } = await supabase.auth.getUser();

    if (!data.user) redirect("/login");

    // fetched here so the edit slide-over (rendered in the shell) can surface
    // the selected application's interviews on any protected page
    const interviews = await getUserInterviews();

    return (
        <DashboardShell user={data.user} interviews={interviews}>
            {children}
        </DashboardShell>
    );
};

export default Layout;