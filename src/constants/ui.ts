export const SIDEBAR_LIST_ITEMS = [
    {
        id: 'dashboard',
        route: '/dashboard',
        label: 'Dashboard'
    },
    {
        id: 'applications',
        route: '/applications',
        label: 'Applications'
    },
    {
        id: 'interviews',
        route: '/interviews',
        label: 'Interviews'
    },
    {
        id: 'settings',
        route: '/settings',
        label: 'Settings'
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