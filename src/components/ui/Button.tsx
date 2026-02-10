import { mergeClass } from "@/lib/ui";
import Spinner from "./Spinner";

type ButtonVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

type ButtonSize =
    | "default"
    | "sm"
    | "lg"
    | "icon"
    | "icon-sm"
    | "icon-lg";

type ButtonType = 
    | "submit"
    | "button"
    | "reset"
    | undefined

type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonType;
    form?: string;
    loading?: boolean;
};

const variantStyleMap = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
        "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost:
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyleMap = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md gap-1.5 px-3",
    lg: "h-10 rounded-md px-6",
    icon: "size-9",
    "icon-sm": "size-8",
    "icon-lg": "size-10",
};

const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all shrink-0 outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 " +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 " +
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const Button = ({ className, variant = "default", size = "default", children, onClick, disabled = false, type, form, loading }: ButtonProps) => {
    return (
        <button
            className={mergeClass(
                baseStyles,
                variantStyleMap[variant],
                sizeStyleMap[size],
                className,
            )}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            disabled={disabled}
            type={type}
            form={form}
        >
            {loading? <Spinner/> : children}
        </button>
    );
}

export default Button;