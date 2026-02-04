import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
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

    return (
        <DashboardShell user={data.user}>
            {children}
        </DashboardShell>
    );
};

export default Layout;