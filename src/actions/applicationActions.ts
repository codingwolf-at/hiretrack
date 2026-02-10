"use server";

import { cookies } from "next/headers";
import { mapFormToDB } from "@/lib/ui";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { ApplicationFormState, ApplicationIDTypes } from "@/types/application";

export const createApplicationAction = async (payload: ApplicationFormState) => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    const sanitizedData = mapFormToDB(payload);

    const { error } = await supabase
        .from("applications")
        .insert({
            ...sanitizedData,
            user_id: user!.id,
        });

    if (error) {
        console.error("SUPABASE INSERT ERROR:", error);
        throw error;
    }
};

export const updateApplicationAction = async (applicationID: ApplicationIDTypes, data: ApplicationFormState) => {
    if (!applicationID) {
        throw new Error("Missing application id for update");
    }

    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const sanitizedData = mapFormToDB(data);

    const { data: updated, error } = await supabase
        .from("applications")
        .update(sanitizedData)
        .eq("id", applicationID)
        .select()
        .single();

    if (error) {
        console.error("SUPABASE UPDATE ERROR:", error);
        throw error;
    }

    return updated;
};