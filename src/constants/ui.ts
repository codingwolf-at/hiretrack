import { ApplicationFormState } from "@/types/application";
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

export const STATUS_DROPDOWN_OPTIONS = [
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.APPLIED],
        value: APPLICATION_STATUS.APPLIED
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.HR],
        value: APPLICATION_STATUS.HR
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.TECHNICAL],
        value: APPLICATION_STATUS.TECHNICAL
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.FINAL],
        value: APPLICATION_STATUS.FINAL
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.OFFER],
        value: APPLICATION_STATUS.OFFER
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.ACCEPTED],
        value: APPLICATION_STATUS.ACCEPTED
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.REJECTED],
        value: APPLICATION_STATUS.REJECTED
    },
    {
        label: APPLICATION_STATUS_LABEL[APPLICATION_STATUS.WITHDRAWN],
        value: APPLICATION_STATUS.WITHDRAWN
    },
];

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

export const RECENT_APPLICATIONS_TABLE_COLUMNS_LABELS = ["Company", "Role", "Status", "Applied", "Actions"];

export const APPLICATION_MODES = {
    CREATE: 'create',
    EDIT: 'edit'
} as const;

export const APPLICATION_FORM_STRINGS = {
    [APPLICATION_MODES.CREATE]: {
        heading: 'Add New Application',
        subHeading: 'Fill in the details of your job application.',
        mainCTA: "Create"
    },
    [APPLICATION_MODES.EDIT]: {
        heading: 'Edit Application',
        subHeading: 'Update the details of your job application.',
        mainCTA: "Update"
    }
};

export const applicationInitialState: ApplicationFormState = {
    company_name: "",
    role: "",
    status: "applied",
    applied_date: "",
    location: "",
    job_url: "",
    salary_range: "",
    notes: "",
};

export const TABLE_ACTIONS = {
    VIEW_EDIT: 'view_edit',
    DELETE: 'delete'
};

export const TABLE_ACTIONS_LABELS = {
    [TABLE_ACTIONS.VIEW_EDIT]: "View & Edit",
    [TABLE_ACTIONS.DELETE]: "Delete"
};

export const TABLE_ACTIONS_DROPDOWN_OPTIONS = [
    {
        label: TABLE_ACTIONS_LABELS[TABLE_ACTIONS.VIEW_EDIT],
        value: TABLE_ACTIONS.VIEW_EDIT,
    },
    {
        label: TABLE_ACTIONS_LABELS[TABLE_ACTIONS.DELETE],
        value: TABLE_ACTIONS.DELETE,
    },
];

export const DEMO_LOGIN_CREDS = {
    EMAIL: "demo@hiretrack.app",
    PASSWORD: "Hiretrack123!"
};