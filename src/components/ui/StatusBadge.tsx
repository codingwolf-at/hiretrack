import { mergeClass } from "@/lib/ui";
// types
import { ApplicationStatus } from "@/types/application";
// constants
import { APPLICATION_STATUS, APPLICATION_STATUS_LABEL } from "@/constants/ui";

const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const label = APPLICATION_STATUS_LABEL[status];
    if (!label) return null;

    const STATUS_COLORS = {
        [APPLICATION_STATUS.APPLIED]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        [APPLICATION_STATUS.HR]: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        [APPLICATION_STATUS.TECHNICAL]: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        [APPLICATION_STATUS.FINAL]: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        [APPLICATION_STATUS.OFFER]: "bg-green-500/20 text-green-400 border-green-500/30",
        [APPLICATION_STATUS.ACCEPTED]: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        [APPLICATION_STATUS.REJECTED]: "bg-red-500/20 text-red-400 border-red-500/30",
        [APPLICATION_STATUS.WITHDRAWN]: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }

    return (
        <div className={mergeClass(
            'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden',
            STATUS_COLORS[status]
        )}>
            {label}
        </div>
    );
};

export default StatusBadge;