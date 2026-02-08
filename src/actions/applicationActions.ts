"use server";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { ApplicationFormState } from "@/types/application";

export const createApplicationAction = async (payload: ApplicationFormState) => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
        .from("applications")
        .insert({
            ...payload,
            user_id: user!.id,
        });

    if (error) {
        console.error("SUPABASE INSERT ERROR:", error);
        throw error;
    }
};