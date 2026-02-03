import Card from "@/components/ui/Card";
import { Briefcase, CheckCircle2, Clock, XCircle } from "lucide-react";

type StatCardProps = {
    totalCount: number;
    inProgressCount: number;
    offerCount: number;
    closedCount: number;
};

const StatCards = ({ totalCount, inProgressCount, offerCount, closedCount }: StatCardProps) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card
                title="Total Applications"
                value={totalCount}
                iconProps={{
                    icon: Briefcase,
                    bgColor: "bg-accent/10",
                    color: "text-accent"
                }}
            />
            <Card
                title="In-progress Applications"
                value={inProgressCount}
                iconProps={{
                    icon: Clock,
                    bgColor: "bg-chart-2/10",
                    color: "text-chart-2"
                }}
            />
            <Card
                title="Offers Received"
                value={offerCount}
                iconProps={{
                    icon: CheckCircle2,
                    bgColor: "bg-success/10",
                    color: "text-success"
                }}
            />
            <Card
                title="Closed Applications"
                value={closedCount}
                iconProps={{
                    icon: XCircle,
                    bgColor: "bg-destructive/10",
                    color: "text-destructive"
                }}
            />
        </div>
    );
};

export default StatCards;