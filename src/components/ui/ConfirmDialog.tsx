"use client";

import { useEffect } from "react";
// helper
import { mergeClass } from "@/lib/ui";
// components
import Button from "./Button";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    loading?: boolean;
    destructive?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmDialog = ({
    open,
    title,
    description,
    confirmLabel,
    cancelLabel,
    loading = false,
    destructive = false,
    onConfirm,
    onCancel
}: ConfirmDialogProps) => {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) onCancel();
        };

        if (open) window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);
    }, [open, loading, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            onClick={() => !loading && onCancel()}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-label={title}
                className="w-full max-w-md rounded-xl bg-card border border-border p-6 space-y-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onCancel} disabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={destructive ? "destructive" : "default"}
                        className={mergeClass(!destructive && "bg-accent text-accent-foreground hover:bg-accent/90")}
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
