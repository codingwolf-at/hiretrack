"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, ExternalLink, MapPin, PencilIcon, Trash2Icon } from "lucide-react";
// types
import { Application } from "@/types/application";
import { InterviewWithApplication } from "@/types/interview";
// constants
import {
    DELETE_INTERVIEW_DIALOG,
    INTERVIEW_OUTCOME_BADGE_CLASSES,
    INTERVIEW_OUTCOME_LABEL,
    INTERVIEW_ROUND_BADGE_CLASSES,
    INTERVIEW_ROUND_LABEL,
    INTERVIEWS_PAGE_STRINGS
} from "@/constants/ui";
// helpers
import { formatInterviewDateTime } from "@/lib/ui";
// actions
import { deleteInterviewAction } from "@/actions/interviewActions";
// components
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import InterviewFormDialog from "./InterviewFormDialog";

type InterviewsViewProps = {
    interviews: InterviewWithApplication[];
    applications: Application[];
};

const InterviewsView = ({ interviews, applications }: InterviewsViewProps) => {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [interviewToEdit, setInterviewToEdit] = useState<InterviewWithApplication | null>(null);
    const [interviewToDelete, setInterviewToDelete] = useState<InterviewWithApplication | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    const applicationOptions = useMemo(() => applications.map(application => ({
        label: `${application.company_name} — ${application.role}`,
        value: application.id
    })), [applications]);

    const { upcoming, past } = useMemo(() => {
        const now = Date.now();
        // interviews arrive sorted by scheduled_at asc
        const upcoming = interviews.filter(interview => new Date(interview.scheduled_at).getTime() >= now);
        const past = interviews
            .filter(interview => new Date(interview.scheduled_at).getTime() < now)
            .reverse();
        return { upcoming, past };
    }, [interviews]);

    const handleConfirmDelete = async () => {
        if (!interviewToDelete) return;
        try {
            setIsDeleting(true);
            await deleteInterviewAction(interviewToDelete.id);
            setInterviewToDelete(null);
            router.refresh();
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setInterviewToEdit(null);
    };

    const renderLocation = (location: string | null) => {
        if (!location) return null;
        const isLink = location.startsWith("http");
        return (
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                {isLink ? <ExternalLink className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                {isLink ? (
                    <a href={location} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                        Meeting link
                    </a>
                ) : location}
            </span>
        );
    };

    const renderInterviewCard = (interview: InterviewWithApplication) => (
        <div
            key={interview.id}
            className="bg-card text-card-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border p-4 shadow-sm"
        >
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-foreground">
                        {interview.applications
                            ? `${interview.applications.company_name} — ${interview.applications.role}`
                            : "—"}
                    </p>
                    <Badge label={INTERVIEW_ROUND_LABEL[interview.round]} className={INTERVIEW_ROUND_BADGE_CLASSES} />
                    <Badge label={INTERVIEW_OUTCOME_LABEL[interview.outcome]} className={INTERVIEW_OUTCOME_BADGE_CLASSES[interview.outcome]} />
                </div>
                <p className="text-sm text-muted-foreground">{formatInterviewDateTime(interview.scheduled_at)}</p>
                {renderLocation(interview.location)}
                {interview.notes && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{interview.notes}</p>
                )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => {
                        setInterviewToEdit(interview);
                        setIsFormOpen(true);
                    }}
                >
                    <PencilIcon />
                </Button>
                <Button
                    variant="outline"
                    size="icon-sm"
                    className="hover:bg-destructive/20 hover:text-destructive"
                    onClick={() => setInterviewToDelete(interview)}
                >
                    <Trash2Icon />
                </Button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <Button
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setIsFormOpen(true)}
                >
                    <CalendarPlus className="w-4 h-4 mr-1" />
                    {INTERVIEWS_PAGE_STRINGS.SCHEDULE_CTA}
                </Button>
            </div>

            {interviews.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-12 text-center">
                    <p className="text-sm font-medium text-foreground">{INTERVIEWS_PAGE_STRINGS.EMPTY_TITLE}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{INTERVIEWS_PAGE_STRINGS.EMPTY_HINT}</p>
                </div>
            ) : (
                <>
                    <section className="flex flex-col gap-3">
                        <h2 className="text-lg font-semibold text-foreground">{INTERVIEWS_PAGE_STRINGS.UPCOMING_HEADING}</h2>
                        {upcoming.length > 0
                            ? upcoming.map(renderInterviewCard)
                            : <p className="text-sm text-muted-foreground">{INTERVIEWS_PAGE_STRINGS.NO_UPCOMING}</p>}
                    </section>
                    <section className="flex flex-col gap-3">
                        <h2 className="text-lg font-semibold text-foreground">{INTERVIEWS_PAGE_STRINGS.PAST_HEADING}</h2>
                        {past.length > 0
                            ? past.map(renderInterviewCard)
                            : <p className="text-sm text-muted-foreground">{INTERVIEWS_PAGE_STRINGS.NO_PAST}</p>}
                    </section>
                </>
            )}

            <InterviewFormDialog
                open={isFormOpen}
                onClose={closeForm}
                applicationOptions={applicationOptions}
                interview={interviewToEdit}
            />
            <ConfirmDialog
                open={!!interviewToDelete}
                title={DELETE_INTERVIEW_DIALOG.TITLE}
                description={DELETE_INTERVIEW_DIALOG.DESCRIPTION}
                confirmLabel={DELETE_INTERVIEW_DIALOG.CONFIRM}
                cancelLabel={DELETE_INTERVIEW_DIALOG.CANCEL}
                loading={isDeleting}
                destructive
                onConfirm={handleConfirmDelete}
                onCancel={() => setInterviewToDelete(null)}
            />
        </div>
    );
};

export default InterviewsView;
