import { getUserApplications } from "@/lib/db/applications";

const Page = async () => {

    const applications = await getUserApplications();

    return (
        <div className="flex flex-col text-white">
            <div className="h-50">
                Cards
            </div>
            <div className="flex flex-1">
                <div className="w-2/3">
                    Applications
                    {JSON.stringify(applications)}
                </div>
                <div className="w-1/3">
                    Interviews
                </div>
            </div>
        </div>
    );
};

export default Page;