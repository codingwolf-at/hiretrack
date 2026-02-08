import { mergeClass } from "@/lib/ui";

type TextAreaProps = {
    id: string;
    value: string;
    className?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({
    id,
    value,
    className,
    placeholder,
    onChange
}: TextAreaProps) => {
    return (
        <textarea 
            id={id}
            value={value}
            placeholder={placeholder}
            className={
                mergeClass(
                    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border',
                    'px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-20 bg-secondary text-foreground',
                    className
                )
            }
            onChange={onChange}
        />
    );
};

export default TextArea;