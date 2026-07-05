import { Application } from "./application";

export type InterviewRound =
    | "hr"
    | "technical"
    | "system_design"
    | "managerial"
    | "final"
    | "other";

export type InterviewOutcome =
    | "pending"
    | "passed"
    | "failed"
    | "cancelled";

export type Interview = {
    id: string;
    user_id: string;
    application_id: string;

    round: InterviewRound;
    scheduled_at: string;

    location: string | null;
    notes: string | null;

    outcome: InterviewOutcome;

    created_at: string;
    updated_at: string;
};

export type InterviewWithApplication = Interview & {
    applications: Pick<Application, "company_name" | "role"> | null;
};

export type InterviewFormState = {
    application_id: string;
    round: InterviewRound;
    scheduled_at: string; // datetime-local, yyyy-mm-ddThh:mm
    location?: string;
    notes?: string;
    outcome: InterviewOutcome;
};

export type InterviewIDTypes = string | null;
