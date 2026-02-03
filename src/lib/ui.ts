import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { Application } from "@/types/application";
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