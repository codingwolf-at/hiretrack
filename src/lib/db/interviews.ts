import { cookies } from "next/headers";
import { InterviewWithApplication } from "@/types/interview";
import { createSupabaseServerClient } from "../supabase/supabaseServer";

const INTERVIEW_WITH_APPLICATION_SELECT = "*, applications(company_name, role)";

export const getUserInterviews = async (): Promise<InterviewWithApplication[]> => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data } = await supabase
        .from("interviews")
        .select(INTERVIEW_WITH_APPLICATION_SELECT)
        .order("scheduled_at", { ascending: true });

    return data ?? [];
};

export const getUpcomingInterviews = async (limit: number): Promise<InterviewWithApplication[]> => {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data } = await supabase
        .from("interviews")
        .select(INTERVIEW_WITH_APPLICATION_SELECT)
        .gte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true })
        .limit(limit);

    return data ?? [];
};
