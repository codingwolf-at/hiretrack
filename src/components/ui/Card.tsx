import { LucideIcon } from "lucide-react";

type IconPropTypes = {
    bgColor: string,
    color: string,
    icon: LucideIcon,
};

type CardProps = {
    title: string,
    value: number,
    iconProps?: IconPropTypes
};

const Card = ({ title, value, iconProps }: CardProps) => {

    const Icon = iconProps?.icon;
    const color = iconProps?.color;
    const bgColor = iconProps?.bgColor;

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border">
            <div className="p-6">
                {Icon && bgColor && color ? (
                    <div className={`rounded-lg p-2.5 w-fit ${bgColor}`}>
                        <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                ) : null}
                <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-sm text-muted-foreground">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;