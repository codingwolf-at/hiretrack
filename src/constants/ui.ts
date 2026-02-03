import { Briefcase, Calendar, LayoutDashboard, Settings } from "lucide-react";

export const SIDEBAR_LIST_ITEMS = [
    {
        id: 'dashboard',
        route: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        id: 'applications',
        route: '/applications',
        label: 'Applications',
        icon: Briefcase,

    },
    {
        id: 'interviews',
        route: '/interviews',
        label: 'Interviews',
        icon: Calendar,

    },
    {
        id: 'settings',
        route: '/settings',
        label: 'Settings',
        icon: Settings,
    }
];

export const APPLICATION_STATUS = {
    APPLIED: 'applied',
    HR: 'hr',
    TECHNICAL: 'technical',
    FINAL: 'final',
    OFFER: 'offer',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    WITHDRAWN: 'withdrawn'
};

export const APPLICATION_STATUS_LABEL = {
    [APPLICATION_STATUS.APPLIED]: "Applied",
    [APPLICATION_STATUS.HR]: "HR",
    [APPLICATION_STATUS.TECHNICAL]: 'Technical',
    [APPLICATION_STATUS.FINAL]: 'Final',
    [APPLICATION_STATUS.OFFER]: 'Offer',
    [APPLICATION_STATUS.ACCEPTED]: 'Accepted',
    [APPLICATION_STATUS.REJECTED]: 'Rejected',
    [APPLICATION_STATUS.WITHDRAWN]: 'Withdrawn'
};

export const IN_PROGRESS_STATUS = [
    APPLICATION_STATUS.APPLIED,
    APPLICATION_STATUS.HR,
    APPLICATION_STATUS.TECHNICAL,
    APPLICATION_STATUS.FINAL,
    APPLICATION_STATUS.OFFER
];

export const OFFER_STATUS = [
    APPLICATION_STATUS.OFFER,
    APPLICATION_STATUS.ACCEPTED
];

export const CLOSED_STATUS = [
    APPLICATION_STATUS.REJECTED,
    APPLICATION_STATUS.WITHDRAWN
];

export const APPLICATION_KEYS = {
    STATUS: "status",
    ACTIONS: "actions",
    APPLIED_DATE: "applied_date"
};

export const RECENT_APPLICATIONS_TABLE_FIELDS = ["company_name", "role", "status", "applied_date", "actions"];

export const RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS = ["Company", "Role", "Status", "Applied", ""];