"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
// types
import { ApplicationStatus } from "@/types/application";
// constants
import { APPLICATION_FORM_STRINGS, APPLICATION_MODES, STATUS_DROPDOWN_OPTIONS } from "@/constants/ui";
// hooks
import useApplicationUI from "@/hooks/useApplicationUI";
// actions
import { createApplicationAction, updateApplicationAction } from "@/actions/applicationActions";
// components
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import Dropdown from "../ui/Dropdown";

const ApplicationForm = () => {

    const { slideOverMode, closeSlideOver, selectedApplication, selectedApplicationId } = useApplicationUI();

    const [formData, setFormData] = useState(() => selectedApplication);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);

    const router = useRouter();

    const active = !!slideOverMode;

    useEffect(() => {
        if (active) {
            setFormData(selectedApplication);
            setIsFormDirty(false);
        }
    }, [active, selectedApplication])

    const isSubmitDisabled = useMemo(() => {
        const company = formData.company_name.trim();
        const role = formData.role.trim();
        const date = formData.applied_date;

        const hasEmptyRequiredFields = !company || !role || !date;

        const isEditMode = slideOverMode === APPLICATION_MODES.EDIT;

        const isUnchanged = isEditMode && !isFormDirty;

        return hasEmptyRequiredFields || isSubmitting || isUnchanged;
    }, [formData, isSubmitting, slideOverMode, isFormDirty]);

    const pageStrings = APPLICATION_FORM_STRINGS[slideOverMode ?? APPLICATION_MODES.CREATE];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        setIsFormDirty(true);
    };

    const handleDropdownChange = (status: ApplicationStatus) => {
        setFormData(prev => ({
            ...prev,
            status
        }));
        setIsFormDirty(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (slideOverMode === APPLICATION_MODES.CREATE) {
                await createApplicationAction(formData);
            } else {
                await updateApplicationAction(selectedApplicationId, formData);
            }
            closeSlideOver();
            router.refresh();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openUrl = () => {
        if (!formData.job_url) return;

        const url = formData.job_url.startsWith("http")
            ? formData.job_url
            : `https://${formData.job_url}`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <main className="p-4 flex flex-col gap-4 min-h-screen">
            <header className="flex w-full justify-between items-start">
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <p className="text-lg leading-none font-semibold text-foreground">
                        {pageStrings.heading}
                    </p>
                    <p className="text-muted-foreground text-sm">
                        {pageStrings.subHeading}
                    </p>
                </div>
                <Button variant="secondary" onClick={closeSlideOver} size="sm">
                    <XIcon />
                </Button>
            </header>
            <hr />
            <form id="application-form" className="flex-1 flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="company_name" required>
                        Company Name
                    </Label>
                    <Input id="company_name" value={formData.company_name} placeholder="e.g., Google" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="role" required>
                        Role
                    </Label>
                    <Input id="role" value={formData.role} placeholder="e.g., Senior Frontend Developer" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="status" required>
                        Application Status
                    </Label>
                    <Dropdown
                        options={STATUS_DROPDOWN_OPTIONS}
                        selectedValue={formData.status}
                        onChange={(value: string) => handleDropdownChange(value as ApplicationStatus)}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="applied_date" required>
                        Date Applied
                    </Label>
                    <Input id="applied_date" value={formData.applied_date} type="date" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="location">
                        Location
                    </Label>
                    <Input id="location" value={formData.location || ""} placeholder="e.g., Gurugram or Remote" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="job_url">
                        Job URL
                    </Label>
                    <div className="flex gap-2">
                        <Input id="job_url" value={formData.job_url || ""} placeholder="https://..." type="url" onChange={handleChange} disabled={isSubmitting} />
                        <Button type="button" variant="default" disabled={!formData.job_url?.length} onClick={openUrl}>
                            Visit
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="salary_range">
                        Salary Range
                    </Label>
                    <Input id="salary_range" value={formData.salary_range || ""} placeholder="e.g., 25LPA" type="text" onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">
                        Notes
                    </Label>
                    <TextArea
                        id="notes"
                        value={formData.notes || ""}
                        placeholder="Add any personal notes about this opportunity..."
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
            <hr />
            <footer className="flex justify-between">
                <Button variant="secondary" onClick={closeSlideOver}>
                    Close
                </Button>
                <Button
                    type="submit"
                    form="application-form"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={isSubmitDisabled}
                    loading={isSubmitting}
                >
                    {pageStrings.mainCTA}
                </Button>
            </footer>
        </main>
    );
};

export default ApplicationForm;