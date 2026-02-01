// helpers
import { getApplicationsCountByStatus } from "@/lib/ui";
import { getUserApplications } from "@/lib/db/applications";
// components
import StatCard from "./StatCard";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";

const Page = async () => {

    const applications = await getUserApplications();

    const { totalCount, inProgressCount, offerCount, closedCount } = getApplicationsCountByStatus(applications);

    const recentApplications = applications.slice(0, 5);

    return (
        <div className="flex flex-col text-white p-4 gap-6">
            <div className="grid grid-cols-4 gap-4">
                <StatCard title="Total Applications" value={totalCount} />
                <StatCard title="In-progress Applications" value={inProgressCount} />
                <StatCard title="Offers Received" value={offerCount} />
                <StatCard title="Closed Applications" value={closedCount} />
            </div>
            <div className="flex flex-1">
                <div className="w-2/3">
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