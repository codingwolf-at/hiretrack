import { ApplicationStatus } from "@/types/application";
import { APPLICATION_STATUS_LABEL } from "@/constants/ui";

const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const label = APPLICATION_STATUS_LABEL[status];
    if (!label) return null;

    return (
        <div className={`status-badge-${status} inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0`}>
            {label}
        </div>
    );
};

export default StatusBadge;