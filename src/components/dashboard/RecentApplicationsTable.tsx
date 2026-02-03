// types
import { Application, ApplicationStatus } from "@/types/application";
// constants
import { APPLICATION_KEYS, RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS, RECENT_APPLICATIONS_TABLE_FIELDS } from "@/constants/ui";
// components
import StatusBadge from "../ui/StatusBadge";

const RecentApplicationsTable = ({ applications }: { applications: Application[] }) => {

    // TODO: give a min height to table (= height of 5 rows) so that it will help in empty state & when there are less rows

    const renderCellValue = (key: keyof Application, application: Application) => {
        if (key === APPLICATION_KEYS.STATUS) {
            return (
                <StatusBadge status={application[key] as ApplicationStatus} />
            )
        } else if (key === APPLICATION_KEYS.ACTIONS) {
            return (
                <button
                    type="button"
                    className="text-blue-500 hover:underline"
                >
                    View
                </button>
            )
        } else if (key === APPLICATION_KEYS.APPLIED_DATE) {
            return (
                <p className="text-sm text-gray-200">
                    {application.applied_date
                        ? new Date(application.applied_date).toLocaleDateString()
                        : "—"}
                </p>
            );
        } else {
            return (
                <p className="block text-sm text-gray-200">
                    {application[key]}
                </p>
            )
        }
    };

    return (
        <div className="rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Recent Applications</h3>
                <button className="cursor-pointer text-blue-500 font-medium hover:underline">View all</button>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-transparent rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            {RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS.map(el => (
                                <th key={el} className="px-6 py-4 border-b text-gray-400 uppercase text-xs tracking-wide bg-transparent border-white/10">
                                    <p className="block font-normal leading-none text-gray-400 uppercase tracking-wide text-xs">
                                        {el}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr key={application.id} className="hover:bg-white/3 transition-colors">
                                {RECENT_APPLICATIONS_TABLE_FIELDS.map((el) => (
                                    <td key={el} className="px-6 py-4 border-b border-white/5">
                                        {renderCellValue(el as keyof Application, application)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentApplicationsTable;