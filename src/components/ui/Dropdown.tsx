"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, LucideIcon } from "lucide-react";
// helper
import { mergeClass } from "@/lib/ui";
// components 
import Button from "./Button";

type DropdownOption = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: DropdownOption[];
    selectedValue?: DropdownOption["value"];
    placeholder?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    showChevron?: boolean;
    dropdownContentClasses?: string;
    iconTrigger?: LucideIcon
    wrapperClasses?: string;
};

const Dropdown = ({
    options,
    selectedValue,
    placeholder,
    onChange,
    disabled = false,
    showChevron = true,
    dropdownContentClasses = "",
    iconTrigger,
    wrapperClasses = ""
}: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const IconTrigger = iconTrigger;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selectedValueLabel = useMemo(() => {
        return options.find(el => el.value === selectedValue)?.label;
    }, [selectedValue, options])

    const toggleDropdown = () => {
        setIsOpen(s => !s);
    };

    const onListItemClick = (el: string) => {
        onChange(el);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className={mergeClass("relative w-full", wrapperClasses)}>
            <Button
                type="button"
                onClick={toggleDropdown}
                className="w-full justify-between"
                variant="secondary"
                disabled={disabled}
            >
                {IconTrigger && <IconTrigger />}
                {selectedValueLabel && (
                    selectedValueLabel
                )}
                {!selectedValueLabel && placeholder && placeholder?.length > 0 && (
                    <span className="text-muted-foreground">{placeholder}</span>
                )}
                {showChevron && (
                    isOpen
                        ? <ChevronUpIcon />
                        : <ChevronDownIcon />
                )}
            </Button>
            {isOpen && (
                <div className={mergeClass("bg-card border border-border w-full rounded-md shadow-md absolute top-10 py-1 z-10", dropdownContentClasses)}>
                    {options.map(el => (
                        <div
                            key={el.value}
                            className="text-foreground focus:bg-accent focus:text-accent-foreground flex w-full cursor-pointer items-center justify-between gap-2 py-2 px-4 text-sm outline-hidden hover:bg-accent hover:text-background"
                            onClick={() => onListItemClick(el.value)}
                        >
                            {el.label}
                            {selectedValue === el.value && (
                                <CheckIcon className="size-4" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;