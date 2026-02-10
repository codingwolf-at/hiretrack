"use client";

import { ChevronRight, EllipsisVerticalIcon } from "lucide-react";
// hooks
import useApplicationUI from "@/hooks/useApplicationUI";
// types
import { Application, ApplicationStatus, TableActionsTypes } from "@/types/application";
// constants
import { APPLICATION_KEYS, RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS, RECENT_APPLICATIONS_TABLE_FIELDS, TABLE_ACTIONS, TABLE_ACTIONS_DROPDOWN_OPTIONS } from "@/constants/ui";
// components
import Link from "next/link";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import StatusBadge from "../ui/StatusBadge";

const RecentApplicationsTable = ({ applications }: { applications: Application[] }) => {

    const { startEditApplication } = useApplicationUI();

    const handleActions = (action: TableActionsTypes, application: Application) => {
        if (action === TABLE_ACTIONS.VIEW_EDIT) {
            startEditApplication(application)
        }
    };

    const handleRowClick = (application: Application) => {
        handleActions(TABLE_ACTIONS.VIEW_EDIT, application);
    };

    // TODO: give a min height to table (= height of 5 rows) so that it will help in empty state & when there are less rows

    const renderCellValue = (key: keyof Application, application: Application) => {
        switch (key) {
            case APPLICATION_KEYS.STATUS:
                return (
                    <StatusBadge status={application.status as ApplicationStatus} />
                );
            case APPLICATION_KEYS.ACTIONS:
                return (
                    <Dropdown 
                        options={TABLE_ACTIONS_DROPDOWN_OPTIONS}
                        onChange={(action) => handleActions(action, application)}
                        showChevron={false}
                        iconTrigger={EllipsisVerticalIcon}
                        wrapperClasses='w-12'
                        dropdownContentClasses="w-24 right-0"
                    />
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
        };
    };

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border pt-6 shadow-sm">
            <div className="flex flex-row items-center justify-between border-b border-border pb-4 px-6 [.border-b]:pb-6">
                <h3 className="leading-none font-semibold text-lg text-foreground">Recent Applications</h3>
                <Link href="/applications">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="p-0 relative w-full">
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
                            <tr 
                                key={application.id} 
                                className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors border-border cursor-pointer"
                                onClick={() => handleRowClick(application)}
                            >
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