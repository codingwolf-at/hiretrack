"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
// types
import { InterviewWithApplication } from "@/types/interview";
// constants
import {
    DASHBOARD_INTERVIEWS_PANEL_STRINGS,
    INTERVIEW_OUTCOME_BADGE_CLASSES,
    INTERVIEW_OUTCOME_LABEL,
    INTERVIEW_ROUND_BADGE_CLASSES,
    INTERVIEW_ROUND_LABEL
} from "@/constants/ui";
// helpers
import { formatInterviewDateTime } from "@/lib/ui";
// components
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const UpcomingInterviews = ({ interviews }: { interviews: InterviewWithApplication[] }) => {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border pt-6 shadow-sm">
            <div className="flex flex-row items-center justify-between border-b border-border pb-4 px-6">
                <h3 className="leading-none font-semibold text-lg text-foreground">{DASHBOARD_INTERVIEWS_PANEL_STRINGS.HEADING}</h3>
                <Link href="/interviews">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="px-6 pb-6 flex flex-col gap-4">
                {interviews.length === 0 && (
                    <div className="py-10 text-center">
                        <p className="text-sm font-medium text-foreground">{DASHBOARD_INTERVIEWS_PANEL_STRINGS.EMPTY_TITLE}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{DASHBOARD_INTERVIEWS_PANEL_STRINGS.EMPTY_HINT}</p>
                    </div>
                )}
                {interviews.map(interview => (
                    <div key={interview.id} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-foreground">
                            {interview.applications
                                ? `${interview.applications.company_name} — ${interview.applications.role}`
                                : "—"}
                        </p>
                        <p className="text-sm text-muted-foreground">{formatInterviewDateTime(interview.scheduled_at)}</p>
                        <div className="flex items-center gap-2">
                            <Badge label={INTERVIEW_ROUND_LABEL[interview.round]} className={INTERVIEW_ROUND_BADGE_CLASSES} />
                            <Badge label={INTERVIEW_OUTCOME_LABEL[interview.outcome]} className={INTERVIEW_OUTCOME_BADGE_CLASSES[interview.outcome]} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingInterviews;
