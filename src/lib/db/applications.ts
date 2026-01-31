import { cookies } from "next/headers";
import { createSupabaseServerClient } from "../supabase/supabaseServer"

export const getUserApplications = async () => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data } = await supabase
        .from("applications")
        .select("*");

    return data;
};