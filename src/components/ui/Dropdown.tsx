"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
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
};

const Dropdown = ({ options, selectedValue, placeholder, onChange }: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

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
        <div ref={ref} className="relative w-full">
            <Button
                type="button"
                onClick={toggleDropdown}
                className="w-full justify-between"
                variant="outline"
            >
                {selectedValueLabel ? (
                    selectedValueLabel
                ) : <span className="text-muted-foreground">{placeholder}</span>}
                {isOpen
                    ? <ChevronUpIcon />
                    : <ChevronDownIcon />
                }
            </Button>
            {isOpen && (
                <div className="bg-card border border-border w-full rounded-md shadow-md absolute top-10 py-1">
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