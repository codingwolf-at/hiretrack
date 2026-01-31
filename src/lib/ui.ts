import { CLOSED_STATUS, IN_PROGRESS_STATUS, OFFER_STATUS } from "@/constants/ui";
import { Application } from "@/types/application";

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