import { useEffect } from "react";

type SlideOverProps = {
    active: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

// TODO: make sure to reset/flush state basis on active since the component is not unmounting anymore 

const SlideOver = ({ active, onClose, children }: SlideOverProps) => {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (active) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handler);
        } else {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handler);

        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handler);

        };
    }, [active, onClose]);

    return (
        <div
            className={`
                fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
                ${active ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            onClick={onClose}
        >
            <div
                className={`
                    ml-auto w-md min-h-screen overflow-y-auto bg-card border border-border
                    transform transition-transform duration-300 ease-out
                    ${active ? "translate-x-0" : "translate-x-full"}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default SlideOver;