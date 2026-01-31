export type Application = {
    id: string;
    user_id: string;

    company_name: string;
    role: string;

    location: string | null;
    job_url: string | null;

    status:
    | "applied"
    | "hr"
    | "technical"
    | "final"
    | "offer"
    | "accepted"
    | "rejected"
    | "withdrawn";

    applied_date: string | null;
    salary_range: string | null;
    notes: string | null;

    created_at: string;
    updated_at: string;
};