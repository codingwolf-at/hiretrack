// helpers
import { getUserInterviews } from "@/lib/db/interviews";
import { getUserApplications } from "@/lib/db/applications";
// constants
import { INTERVIEWS_PAGE_STRINGS } from "@/constants/ui";
// components
import InterviewsView from "@/components/interviews/InterviewsView";

const Page = async () => {

    const [interviews, applications] = await Promise.all([
        getUserInterviews(),
        getUserApplications(),
    ]);

    return (
        <main className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">{INTERVIEWS_PAGE_STRINGS.HEADING}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{INTERVIEWS_PAGE_STRINGS.SUB_HEADING}</p>
            </div>
            <InterviewsView interviews={interviews} applications={applications} />
        </main>
    );
};

export default Page;
