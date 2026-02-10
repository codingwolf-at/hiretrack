// helpers
import { getApplicationsCountByStatus } from "@/lib/ui";
import { getUserApplications } from "@/lib/db/applications";
// components
import StatCards from "./StatCards";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";

const Page = async () => {

    const applications = await getUserApplications();

    const { totalCount, inProgressCount, offerCount, closedCount } = getApplicationsCountByStatus(applications);

    const recentApplications = applications.slice(0, 5);

    // TODO: look into v0.dev & stich UI examples to improve the UI & UX further
    // TODO: put thick borders on dropdown & inputs etc

    return (
        <main className=" p-6">
            <StatCards 
                totalCount={totalCount} 
                inProgressCount={inProgressCount}
                offerCount={offerCount}
                closedCount={closedCount}
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RecentApplicationsTable applications={recentApplications} />
                </div>
                <div className="lg:col-span-1">
                    Interviews
                </div>
            </div>
        </main>
    );
};

export default Page;