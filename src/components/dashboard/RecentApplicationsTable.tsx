import { ChevronRight } from "lucide-react";
// types
import { Application, ApplicationStatus } from "@/types/application";
// constants
import { APPLICATION_KEYS, RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS, RECENT_APPLICATIONS_TABLE_FIELDS } from "@/constants/ui";
// components
import Link from "next/link";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

const RecentApplicationsTable = ({ applications }: { applications: Application[] }) => {

    // TODO: give a min height to table (= height of 5 rows) so that it will help in empty state & when there are less rows

    const renderCellValue = (key: keyof Application, application: Application) => {
        switch (key) {
            case APPLICATION_KEYS.STATUS:
                return (
                    <StatusBadge status={application.status as ApplicationStatus} />
                );
            case APPLICATION_KEYS.ACTIONS:
                return (
                    <button
                        type="button"
                        className="text-blue-500 hover:underline"
                        aria-label="View Application"
                        tabIndex={0}
                    >
                        View
                    </button>
                );
            case APPLICATION_KEYS.APPLIED_DATE:
                return (
                    <p className="text-sm text-gray-200">
                        {application.applied_date
                            ? new Date(application.applied_date).toLocaleDateString()
                            : "—"}
                    </p>
                );
            default:
                return (
                    <p className="block text-sm text-gray-200">
                        {application[key] ?? "—"}
                    </p>
                );
        }
    };

    // TODO revamp status pills and add actions dropdown

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border pt-6 shadow-sm ">
            <div className="flex flex-row items-center justify-between border-b border-border pb-4 px-6 [.border-b]:pb-6">
                <h3 className="leading-none font-semibold text-lg text-foreground">Recent Applications</h3>
                <Link href="/applications">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="p-0 relative w-full overflow-x-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="data-[state=selected]:bg-muted border-b transition-colors border-border hover:bg-transparent">
                            {RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS.map(el => (
                                <th key={el} className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground">
                                    {el}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {applications.map(application => (
                            <tr key={application.id} className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors border-border cursor-pointer">
                                {RECENT_APPLICATIONS_TABLE_FIELDS.map((el) => (
                                    <td key={el} className="p-4 align-middle whitespace-nowrap text-muted-foreground">
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