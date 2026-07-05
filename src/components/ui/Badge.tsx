import { mergeClass } from "@/lib/ui";

type BadgeProps = {
    label: string;
    className?: string;
};

const Badge = ({ label, className = "" }: BadgeProps) => {
    return (
        <div className={mergeClass(
            'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden',
            className
        )}>
            {label}
        </div>
    );
};

export default Badge;
