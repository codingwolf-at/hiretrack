"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";
// types
import { Interview, InterviewOutcome, InterviewRound } from "@/types/interview";
// constants
import {
    APPLICATION_MODES,
    INTERVIEW_FORM_STRINGS,
    INTERVIEW_OUTCOME_DROPDOWN_OPTIONS,
    INTERVIEW_ROUND_DROPDOWN_OPTIONS,
    interviewInitialState
} from "@/constants/ui";
// helpers
import { mapInterviewToFormState } from "@/lib/ui";
// actions
import { createInterviewAction, updateInterviewAction } from "@/actions/interviewActions";
// components
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import Dropdown from "../ui/Dropdown";

type ApplicationOption = {
    label: string;
    value: string;
};

type InterviewFormDialogProps = {
    open: boolean;
    onClose: () => void;
    applicationOptions: ApplicationOption[];
    // preselects and locks the application dropdown (e.g. when opened from the edit slide-over)
    lockedApplicationId?: string | null;
    // edit mode when set
    interview?: Interview | null;
};

const InterviewFormDialog = ({
    open,
    onClose,
    applicationOptions,
    lockedApplicationId = null,
    interview = null
}: InterviewFormDialogProps) => {

    const [formData, setFormData] = useState(interviewInitialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const mode = interview ? APPLICATION_MODES.EDIT : APPLICATION_MODES.CREATE;
    const pageStrings = INTERVIEW_FORM_STRINGS[mode];

    useEffect(() => {
        if (!open) return;
        if (interview) {
            setFormData(mapInterviewToFormState(interview));
        } else {
            setFormData({
                ...interviewInitialState,
                application_id: lockedApplicationId ?? "",
            });
        }
    }, [open, interview, lockedApplicationId]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isSubmitting) onClose();
        };

        if (open) window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);
    }, [open, isSubmitting, onClose]);

    if (!open) return null;

    const isSubmitDisabled = !formData.application_id || !formData.scheduled_at || isSubmitting;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (interview) {
                await updateInterviewAction(interview.id, formData);
            } else {
                await createInterviewAction(formData);
            }
            router.refresh();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // portal: the slide-over panel is CSS-transformed, which would trap
    // position:fixed descendants inside it — render on document.body instead
    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            onClick={() => !isSubmitting && onClose()}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={pageStrings.heading}
                className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-card border border-border p-6 space-y-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex w-full justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <p className="text-lg leading-none font-semibold text-foreground">
                            {pageStrings.heading}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            {pageStrings.subHeading}
                        </p>
                    </div>
                    <Button variant="secondary" onClick={onClose} size="sm" disabled={isSubmitting}>
                        <XIcon />
                    </Button>
                </header>
                <hr />
                <form id="interview-form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="application_id" required>
                            Application
                        </Label>
                        <Dropdown
                            options={applicationOptions}
                            selectedValue={formData.application_id}
                            placeholder="Select an application"
                            onChange={(value) => setFormData(prev => ({ ...prev, application_id: value }))}
                            disabled={isSubmitting || !!lockedApplicationId || !!interview}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="round" required>
                            Round
                        </Label>
                        <Dropdown
                            options={INTERVIEW_ROUND_DROPDOWN_OPTIONS}
                            selectedValue={formData.round}
                            onChange={(value) => setFormData(prev => ({ ...prev, round: value as InterviewRound }))}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="scheduled_at" required>
                            Scheduled At
                        </Label>
                        <Input id="scheduled_at" value={formData.scheduled_at} type="datetime-local" onChange={handleChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="location">
                            Location / Meeting Link
                        </Label>
                        <Input id="location" value={formData.location || ""} placeholder="e.g., Google Meet link or office address" onChange={handleChange} disabled={isSubmitting} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="outcome" required>
                            Outcome
                        </Label>
                        <Dropdown
                            options={INTERVIEW_OUTCOME_DROPDOWN_OPTIONS}
                            selectedValue={formData.outcome}
                            onChange={(value) => setFormData(prev => ({ ...prev, outcome: value as InterviewOutcome }))}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="notes">
                            Notes
                        </Label>
                        <TextArea
                            id="notes"
                            value={formData.notes || ""}
                            placeholder="Prep notes, interviewer names, feedback..."
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
                <hr />
                <footer className="flex justify-between">
                    <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
                        Close
                    </Button>
                    <Button
                        type="submit"
                        form="interview-form"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                        disabled={isSubmitDisabled}
                        loading={isSubmitting}
                    >
                        {pageStrings.mainCTA}
                    </Button>
                </footer>
            </div>
        </div>,
        document.body
    );
};

export default InterviewFormDialog;
