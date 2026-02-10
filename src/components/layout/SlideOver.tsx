import { useEffect } from "react";
// hooks
import useApplicationUI from "@/hooks/useApplicationUI";

type SlideOverProps = {
    children: React.ReactNode;
};

const SlideOver = ({ children }: SlideOverProps) => {

    const { slideOverMode, closeSlideOver } = useApplicationUI();

    const active = !!slideOverMode;

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSlideOver();
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
    }, [active, closeSlideOver]);

    return (
        <div
            className={`
                fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
                ${active ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            onClick={closeSlideOver}
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