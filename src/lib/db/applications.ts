import { cookies } from "next/headers";
import { Application } from "@/types/application";
import { createSupabaseServerClient } from "../supabase/supabaseServer"

export const getUserApplications = async (): Promise<Application[]> {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data } = await supabase
        .from("applications")
        .select("*");

    return data ?? [];
};