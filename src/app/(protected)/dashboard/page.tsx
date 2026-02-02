// helpers
import { getApplicationsCountByStatus } from "@/lib/ui";
import { getUserApplications } from "@/lib/db/applications";
// components
import StatCard from "./StatCard";
import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";

const Page = async () => {

    const applications = await getUserApplications();

    const { totalCount, inProgressCount, offerCount, closedCount } = getApplicationsCountByStatus(applications);

    const recentApplications = applications.slice(0, 5);

    return (
        <div className="flex flex-col gap-8 p-6">
            <div className="grid grid-cols-4 gap-4">
                <StatCard 
                    title="Total Applications" 
                    value={totalCount} 
                    icon={<Briefcase className="text-blue-500 h-6 w-6" />} 
                />
                <StatCard 
                    title="In-progress Applications" 
                    value={inProgressCount} 
                    icon={<Clock className="text-yellow-500 h-6 w-6" />} 
                />
                <StatCard 
                    title="Offers Received" 
                    value={offerCount} 
                    icon={<CheckCircle className="text-green-500 h-6 w-6" />} 
                />
                <StatCard 
                    title="Closed Applications" 
                    value={closedCount} 
                    icon={<XCircle className="text-red-500 h-6 w-6" />} 
                />
            </div>
            <div className="flex flex-1">
                <div className="w-2/3 rounded-xl border border-white/10 bg-[#1a1a1a]">
                    <RecentApplicationsTable applications={recentApplications} />
                </div>
                <div className="w-1/3">
                    Interviews
                </div>
            </div>
        </div>
    );
};

export default Page;