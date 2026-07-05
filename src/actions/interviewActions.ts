"use server";

import { cookies } from "next/headers";
import { mapInterviewFormToDB } from "@/lib/ui";
import { createSupabaseServerClient } from "@/lib/supabase/supabaseServer";
import { InterviewFormState, InterviewIDTypes } from "@/types/interview";

export const createInterviewAction = async (payload: InterviewFormState) => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    const sanitizedData = mapInterviewFormToDB(payload);

    const { error } = await supabase
        .from("interviews")
        .insert({
            ...sanitizedData,
            user_id: user!.id,
        });

    if (error) {
        console.error("SUPABASE INSERT ERROR:", error);
        throw error;
    }
};

export const updateInterviewAction = async (interviewID: InterviewIDTypes, data: InterviewFormState) => {
    if (!interviewID) {
        throw new Error("Missing interview id for update");
    }

    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const sanitizedData = mapInterviewFormToDB(data);

    const { data: updated, error } = await supabase
        .from("interviews")
        .update(sanitizedData)
        .eq("id", interviewID)
        .select()
        .single();

    if (error) {
        console.error("SUPABASE UPDATE ERROR:", error);
        throw error;
    }

    return updated;
};

export const deleteInterviewAction = async (interviewID: InterviewIDTypes) => {
    if (!interviewID) {
        throw new Error("Missing interview id for delete");
    }

    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { error } = await supabase
        .from("interviews")
        .delete()
        .eq("id", interviewID);

    if (error) {
        console.error("SUPABASE DELETE ERROR:", error);
        throw error;
    }
};
