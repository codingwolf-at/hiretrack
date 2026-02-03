import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const Layout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        redirect("/login");
    }

    return (
        <main className="grid grid-cols-6 min-h-screen w-full bg-background">
            <Sidebar />
            <div className="col-span-5 transition-all duration-300">
                <Topbar user={data.user} />
                {children}
            </div>
        </main>
    );
};

export default Layout;