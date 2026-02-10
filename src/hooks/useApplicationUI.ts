import { useContext } from "react";
import { ApplicationUIContext } from "@/context/ApplicationUIContext";

const useApplicationUI = () => {
    const ctx = useContext(ApplicationUIContext);

    if (!ctx) {
        throw new Error("useApplicationUI must be used inside ApplicationProvider");
    }

    return ctx;
};

export default useApplicationUI;