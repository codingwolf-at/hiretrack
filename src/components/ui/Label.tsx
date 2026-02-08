type LabelProps = {
    children: React.ReactNode;
    required?: boolean;
    htmlFor: string;
};

const Label = ({ children, required = false, htmlFor }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className="text-foreground text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" >
            {children} {required && (
                <span className="ml-1 text-destructive">*</span>
            )}
        </label>
    );
};

export default Label;