// types
import { ApplicationStatus } from "@/types/application";
// constants
import { APPLICATION_STATUS_LABEL } from "@/constants/ui";

const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const label = APPLICATION_STATUS_LABEL[status];
    if (!label) return null;

    const STATUS_STYLES: Record<ApplicationStatus, string> = {
        applied: "bg-gray-700 text-gray-200",
        hr: "bg-blue-700 text-blue-200",
        technical: "bg-blue-700 text-blue-200",
        final: "bg-blue-700 text-blue-200",
        offer: "bg-green-700 text-green-200",
        accepted: "bg-emerald-700 text-emerald-200",
        rejected: "bg-red-700 text-red-200",
        withdrawn: "bg-zinc-700 text-zinc-300"
    };

    return (
        <div className={`${STATUS_STYLES[status]} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`}>
            {label}
        </div>
    );
};

export default StatusBadge;