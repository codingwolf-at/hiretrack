import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { Application, ApplicationFormState } from "@/types/application";
import { CLOSED_STATUS, IN_PROGRESS_STATUS, OFFER_STATUS } from "@/constants/ui";

export const getApplicationsCountByStatus = (applications: Application[]) => {
    const totalCount = applications.length;
    const inProgressCount = applications.filter(el => IN_PROGRESS_STATUS.includes(el.status))?.length;
    const offerCount = applications.filter(el => OFFER_STATUS.includes(el.status))?.length;
    const closedCount = applications.filter(el => CLOSED_STATUS.includes(el.status))?.length;

    return {
        totalCount,
        inProgressCount,
        offerCount,
        closedCount
    };
}

export const getInitials = (name: string): string =>
    name
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase())
        .join("");

export const mergeClass = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


export const mapApplicationToFormState = (app: Application): ApplicationFormState => ({
    company_name: app.company_name,
    role: app.role,
    status: app.status,
    applied_date: app.applied_date,
    location: app.location ?? "",
    job_url: app.job_url ?? "",
    salary_range: app.salary_range ?? "",
    notes: app.notes ?? "",
});

export const mapFormToDB = (data: ApplicationFormState) => ({
    company_name: data.company_name.trim(),
    role: data.role.trim(),
    status: data.status,
    applied_date: data.applied_date,
    location: data.location || null,
    job_url: data.job_url || null,
    salary_range: data.salary_range || null,
    notes: data.notes || null,
});