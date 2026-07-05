// helpers
import { getUserApplications } from "@/lib/db/applications";
// constants
import { APPLICATIONS_PAGE_STRINGS } from "@/constants/ui";
// components
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";

const Page = async () => {

    const applications = await getUserApplications();

    return (
        <main className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">{APPLICATIONS_PAGE_STRINGS.HEADING}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{APPLICATIONS_PAGE_STRINGS.SUB_HEADING}</p>
            </div>
            <ApplicationsTable applications={applications} />
        </main>
    );
};

export default Page;
