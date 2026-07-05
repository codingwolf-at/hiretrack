import { ApplicationFormState } from "@/types/application";
import { InterviewFormState } from "@/types/interview";
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

export const APPLICATIONS_TABLE_EMPTY_STATE = {
    TITLE: "No applications yet",
    HINT: "Create your first application to get started."
};

export const APPLICATIONS_TABLE_NO_MATCH_STATE = {
    TITLE: "No applications match your filters",
    HINT: "Try adjusting the search or status filter."
};

export const APPLICATIONS_PAGE_SIZE = 10;

export const STATUS_FILTER_ALL = "all";

export const STATUS_FILTER_DROPDOWN_OPTIONS = [
    {
        label: "All statuses",
        value: STATUS_FILTER_ALL
    },
    ...STATUS_DROPDOWN_OPTIONS
];

export const APPLICATIONS_TABLE_COLUMNS = [
    { key: "company_name", label: "Company", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "applied_date", label: "Applied", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
];

export const APPLICATIONS_PAGE_STRINGS = {
    HEADING: "Applications",
    SUB_HEADING: "All your job applications in one place",
    SEARCH_PLACEHOLDER: "Search company, role, or location..."
};

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

// statuses that imply an interview is (or should be) scheduled
export const INTERVIEW_STAGE_STATUS = [
    APPLICATION_STATUS.HR,
    APPLICATION_STATUS.TECHNICAL,
    APPLICATION_STATUS.FINAL
];

export const INTERVIEW_ROUND = {
    HR: 'hr',
    TECHNICAL: 'technical',
    SYSTEM_DESIGN: 'system_design',
    MANAGERIAL: 'managerial',
    FINAL: 'final',
    OTHER: 'other'
} as const;

export const INTERVIEW_ROUND_LABEL = {
    [INTERVIEW_ROUND.HR]: "HR",
    [INTERVIEW_ROUND.TECHNICAL]: "Technical",
    [INTERVIEW_ROUND.SYSTEM_DESIGN]: "System Design",
    [INTERVIEW_ROUND.MANAGERIAL]: "Managerial",
    [INTERVIEW_ROUND.FINAL]: "Final",
    [INTERVIEW_ROUND.OTHER]: "Other"
};

export const INTERVIEW_ROUND_DROPDOWN_OPTIONS = Object.values(INTERVIEW_ROUND).map(round => ({
    label: INTERVIEW_ROUND_LABEL[round],
    value: round
}));

export const INTERVIEW_OUTCOME = {
    PENDING: 'pending',
    PASSED: 'passed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
} as const;

export const INTERVIEW_OUTCOME_LABEL = {
    [INTERVIEW_OUTCOME.PENDING]: "Pending",
    [INTERVIEW_OUTCOME.PASSED]: "Passed",
    [INTERVIEW_OUTCOME.FAILED]: "Failed",
    [INTERVIEW_OUTCOME.CANCELLED]: "Cancelled"
};

export const INTERVIEW_OUTCOME_DROPDOWN_OPTIONS = Object.values(INTERVIEW_OUTCOME).map(outcome => ({
    label: INTERVIEW_OUTCOME_LABEL[outcome],
    value: outcome
}));

export const INTERVIEW_OUTCOME_BADGE_CLASSES = {
    [INTERVIEW_OUTCOME.PENDING]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    [INTERVIEW_OUTCOME.PASSED]: "bg-green-500/20 text-green-400 border-green-500/30",
    [INTERVIEW_OUTCOME.FAILED]: "bg-red-500/20 text-red-400 border-red-500/30",
    [INTERVIEW_OUTCOME.CANCELLED]: "bg-gray-500/20 text-gray-400 border-gray-500/30"
};

export const INTERVIEW_ROUND_BADGE_CLASSES = "bg-purple-500/20 text-purple-400 border-purple-500/30";

export const interviewInitialState: InterviewFormState = {
    application_id: "",
    round: "technical",
    scheduled_at: "",
    location: "",
    notes: "",
    outcome: "pending"
};

export const INTERVIEW_FORM_STRINGS = {
    [APPLICATION_MODES.CREATE]: {
        heading: "Schedule Interview",
        subHeading: "Add an interview round for one of your applications.",
        mainCTA: "Schedule"
    },
    [APPLICATION_MODES.EDIT]: {
        heading: "Edit Interview",
        subHeading: "Update the details or outcome of this interview.",
        mainCTA: "Update"
    }
};

export const INTERVIEWS_PAGE_STRINGS = {
    HEADING: "Interviews",
    SUB_HEADING: "Upcoming and past interview rounds across your applications",
    SCHEDULE_CTA: "Schedule Interview",
    UPCOMING_HEADING: "Upcoming",
    PAST_HEADING: "Past",
    EMPTY_TITLE: "No interviews scheduled yet",
    EMPTY_HINT: "Schedule your first interview to see it here.",
    NO_UPCOMING: "No upcoming interviews.",
    NO_PAST: "No past interviews."
};

export const DASHBOARD_INTERVIEWS_PANEL_STRINGS = {
    HEADING: "Upcoming Interviews",
    EMPTY_TITLE: "No upcoming interviews",
    EMPTY_HINT: "Schedule interviews from your applications."
};

export const APPLICATION_INTERVIEWS_SECTION_STRINGS = {
    HEADING: "Interviews",
    EMPTY: "No interviews for this application yet.",
    SCHEDULE_CTA: "Schedule interview"
};

export const DELETE_INTERVIEW_DIALOG = {
    TITLE: "Delete interview",
    DESCRIPTION: "This will permanently delete this interview. This action cannot be undone.",
    CONFIRM: "Delete",
    CANCEL: "Cancel"
};

export const DELETE_APPLICATION_DIALOG = {
    TITLE: "Delete application",
    DESCRIPTION: "This will permanently delete this application. This action cannot be undone.",
    CONFIRM: "Delete",
    CANCEL: "Cancel"
};

export const AUTH_MODES = {
    LOGIN: 'login',
    SIGNUP: 'signup'
} as const;

export const AUTH_FORM_STRINGS = {
    [AUTH_MODES.LOGIN]: {
        heading: "Welcome back",
        subHeading: "Sign in to your account to continue tracking your job search",
        mainCTA: "Sign in",
        switchPrompt: "Don't have an account?",
        switchCTA: "Sign up",
        switchRoute: "/signup"
    },
    [AUTH_MODES.SIGNUP]: {
        heading: "Create your account",
        subHeading: "Start tracking your job applications in one place",
        mainCTA: "Sign up",
        switchPrompt: "Already have an account?",
        switchCTA: "Sign in",
        switchRoute: "/login"
    }
};

export const SIGNUP_CONFIRMATION_STRINGS = {
    TITLE: "Check your inbox",
    DESCRIPTION: "We've sent you a confirmation link. Click it to finish creating your account, then sign in."
};

export const DEMO_LOGIN_CREDS = {
    EMAIL: "demo@hiretrack.app",
    PASSWORD: "Hiretrack123!"
};