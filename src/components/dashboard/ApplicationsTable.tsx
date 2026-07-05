"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, EllipsisVerticalIcon, Search } from "lucide-react";
// hooks
import useApplicationUI from "@/hooks/useApplicationUI";
// types
import { Application, ApplicationStatus, TableActionsTypes } from "@/types/application";
// constants
import {
    APPLICATION_KEYS,
    APPLICATION_STATUS,
    APPLICATIONS_PAGE_SIZE,
    APPLICATIONS_PAGE_STRINGS,
    APPLICATIONS_TABLE_COLUMNS,
    APPLICATIONS_TABLE_EMPTY_STATE,
    APPLICATIONS_TABLE_NO_MATCH_STATE,
    DELETE_APPLICATION_DIALOG,
    STATUS_FILTER_ALL,
    STATUS_FILTER_DROPDOWN_OPTIONS,
    TABLE_ACTIONS,
    TABLE_ACTIONS_DROPDOWN_OPTIONS
} from "@/constants/ui";
// actions
import { deleteApplicationAction } from "@/actions/applicationActions";
// components
import Input from "../ui/Input";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import StatusBadge from "../ui/StatusBadge";
import ConfirmDialog from "../ui/ConfirmDialog";

type SortKey = "company_name" | "role" | "status" | "applied_date";
type SortDirection = "asc" | "desc";

const STATUS_ORDER = Object.values(APPLICATION_STATUS);

const compareApplications = (a: Application, b: Application, key: SortKey) => {
    if (key === "status") {
        return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
    }
    const aValue = (a[key] ?? "").toLowerCase();
    const bValue = (b[key] ?? "").toLowerCase();
    return aValue.localeCompare(bValue);
};

const ApplicationsTable = ({ applications }: { applications: Application[] }) => {

    const { startEditApplication } = useApplicationUI();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState(STATUS_FILTER_ALL);
    const [sortKey, setSortKey] = useState<SortKey>("applied_date");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [page, setPage] = useState(1);
    const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const filteredApplications = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = applications.filter(application => {
            const matchesStatus = statusFilter === STATUS_FILTER_ALL || application.status === statusFilter;
            const matchesQuery = !query || [application.company_name, application.role, application.location]
                .some(field => field?.toLowerCase().includes(query));
            return matchesStatus && matchesQuery;
        });

        const sorted = [...filtered].sort((a, b) => compareApplications(a, b, sortKey));
        if (sortDirection === "desc") sorted.reverse();

        return sorted;
    }, [applications, search, statusFilter, sortKey, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(filteredApplications.length / APPLICATIONS_PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pageStart = (currentPage - 1) * APPLICATIONS_PAGE_SIZE;
    const pageApplications = filteredApplications.slice(pageStart, pageStart + APPLICATIONS_PAGE_SIZE);

    const hasApplications = applications.length > 0;
    const hasMatches = filteredApplications.length > 0;
    const emptyState = hasApplications ? APPLICATIONS_TABLE_NO_MATCH_STATE : APPLICATIONS_TABLE_EMPTY_STATE;

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
        setPage(1);
    };

    const handleActions = (action: TableActionsTypes, application: Application) => {
        if (action === TABLE_ACTIONS.VIEW_EDIT) {
            startEditApplication(application);
        }
        if (action === TABLE_ACTIONS.DELETE) {
            setApplicationToDelete(application);
        }
    };

    const handleConfirmDelete = async () => {
        if (!applicationToDelete) return;
        try {
            setIsDeleting(true);
            await deleteApplicationAction(applicationToDelete.id);
            setApplicationToDelete(null);
            router.refresh();
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    const renderSortIcon = (key: SortKey) => {
        if (sortKey !== key) return <ArrowUpDown className="ml-1 h-3.5 w-3.5" />;
        return sortDirection === "asc"
            ? <ArrowUp className="ml-1 h-3.5 w-3.5" />
            : <ArrowDown className="ml-1 h-3.5 w-3.5" />;
    };

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
        <div className="bg-card text-card-foreground flex flex-col rounded-xl border border-border shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b border-border p-4">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                        id="applications-search"
                        value={search}
                        placeholder={APPLICATIONS_PAGE_STRINGS.SEARCH_PLACEHOLDER}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="pl-10"
                    />
                </div>
                <Dropdown
                    options={STATUS_FILTER_DROPDOWN_OPTIONS}
                    selectedValue={statusFilter}
                    onChange={(value) => {
                        setStatusFilter(value);
                        setPage(1);
                    }}
                    wrapperClasses="w-full sm:w-44"
                />
            </div>
            <div className="p-0 relative w-full">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="data-[state=selected]:bg-muted border-b transition-colors border-border hover:bg-transparent">
                            {APPLICATIONS_TABLE_COLUMNS.map(({ key, label, sortable }) => (
                                <th key={key} className="h-10 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground">
                                    {sortable ? (
                                        <button
                                            type="button"
                                            className="inline-flex items-center cursor-pointer hover:text-foreground transition-colors"
                                            onClick={() => handleSort(key as SortKey)}
                                        >
                                            {label}
                                            {renderSortIcon(key as SortKey)}
                                        </button>
                                    ) : label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {!hasMatches && (
                            <tr>
                                <td colSpan={APPLICATIONS_TABLE_COLUMNS.length} className="h-64 text-center align-middle">
                                    <p className="text-sm font-medium text-foreground">{emptyState.TITLE}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">{emptyState.HINT}</p>
                                </td>
                            </tr>
                        )}
                        {pageApplications.map(application => (
                            <tr
                                key={application.id}
                                className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors border-border cursor-pointer"
                                onClick={() => handleActions(TABLE_ACTIONS.VIEW_EDIT, application)}
                            >
                                {APPLICATIONS_TABLE_COLUMNS.map(({ key }) => (
                                    <td key={key} className="p-4 align-middle whitespace-nowrap text-muted-foreground">
                                        {renderCellValue(key as keyof Application, application)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-border p-4">
                <p className="text-sm text-muted-foreground">
                    {hasMatches
                        ? `Showing ${pageStart + 1}–${Math.min(pageStart + APPLICATIONS_PAGE_SIZE, filteredApplications.length)} of ${filteredApplications.length}`
                        : "Showing 0 of 0"}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        {currentPage} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <ConfirmDialog
                open={!!applicationToDelete}
                title={DELETE_APPLICATION_DIALOG.TITLE}
                description={DELETE_APPLICATION_DIALOG.DESCRIPTION}
                confirmLabel={DELETE_APPLICATION_DIALOG.CONFIRM}
                cancelLabel={DELETE_APPLICATION_DIALOG.CANCEL}
                loading={isDeleting}
                destructive
                onConfirm={handleConfirmDelete}
                onCancel={() => setApplicationToDelete(null)}
            />
        </div>
    );
};

export default ApplicationsTable;
