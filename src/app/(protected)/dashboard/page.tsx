// helpers
import { getApplicationsCountByStatus } from "@/lib/ui";
import { getUserApplications } from "@/lib/db/applications";
import { getUpcomingInterviews } from "@/lib/db/interviews";
// components
import StatCards from "./StatCards";
import RecentApplicationsTable from "@/components/dashboard/RecentApplicationsTable";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";

const UPCOMING_INTERVIEWS_LIMIT = 5;

const Page = async () => {

    const [applications, upcomingInterviews] = await Promise.all([
        getUserApplications(),
        getUpcomingInterviews(UPCOMING_INTERVIEWS_LIMIT),
    ]);

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
                    <UpcomingInterviews interviews={upcomingInterviews} />
                </div>
            </div>
        </main>
    );
};

export default Page;