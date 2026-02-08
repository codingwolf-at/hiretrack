import { mergeClass } from "@/lib/ui";

type InputProps = {
    id: string;
    type?: string;
    className?: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

const Input = ({
    id,
    type = 'text',
    className = "",
    value,
    placeholder,
    onChange,
    disabled = false
}: InputProps) => {
    return (
        <input 
            id={id}
            type={type}
            value={value}
            className={
                mergeClass(
                    'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    'bg-secondary text-foreground placeholder:text-muted-foreground',
                    className
                )
            }
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default Input