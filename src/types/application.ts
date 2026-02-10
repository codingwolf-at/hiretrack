import { APPLICATION_MODES, TABLE_ACTIONS } from "@/constants/ui";

export type ApplicationStatus =
    | "applied"
    | "hr"
    | "technical"
    | "final"
    | "offer"
    | "accepted"
    | "rejected"
    | "withdrawn";

export type Application = {
    id: string;
    user_id: string;

    company_name: string;
    role: string;

    location: string | null;
    job_url: string | null;

    status: ApplicationStatus;

    applied_date: string;
    salary_range: string | null;
    notes: string | null;

    created_at: string;
    updated_at: string;
};

export type ApplicationFormState = {
    company_name: string;
    role: string;
    status: ApplicationStatus;
    applied_date: string; // ISO yyyy-mm-dd
    location?: string;
    job_url?: string;
    salary_range?: string;
    notes?: string;
};

export type ApplicationIDTypes = string | null;

export type ApplicationModeTypes = typeof APPLICATION_MODES[keyof typeof APPLICATION_MODES] | null;

export type TableActionsTypes = typeof TABLE_ACTIONS[keyof typeof TABLE_ACTIONS];