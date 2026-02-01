// types
import { Application, ApplicationStatus } from "@/types/application";
// constants
import { APPLICATION_KEYS, RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS, RECENT_APPLICATIONS_TABLE_FIELDS } from "@/constants/ui";
// components
import StatusBadge from "../ui/StatusBadge";

const RecentApplicationsTable = ({ applications }: { applications: Application[] }) => {

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
                <p className="text-sm text-slate-700">
                    {application.applied_date
                        ? new Date(application.applied_date).toLocaleDateString()
                        : "—"}
                </p>
            );
        } else {
            return (
                <p className="block text-sm text-slate-800">
                    {application[key]}
                </p>
            )
        }
    };

    return (
        <div className="rounded-lg">
            <div className="w-full px-4 py-6 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Recent Applications</h3>
                <button className="cursor-pointer">View all</button>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            {RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS.map(el => (
                                <th key={el} className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">
                                        {el}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr key={application.id} className="hover:bg-slate-50">
                                {RECENT_APPLICATIONS_TABLE_FIELDS.map((el) => (
                                    <td key={el} className="p-4 border-b border-slate-200">
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