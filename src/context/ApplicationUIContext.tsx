"use client";

import { createContext, useState } from "react";
import { APPLICATION_MODES, applicationInitialState } from "@/constants/ui";
import { ApplicationFormState, ApplicationModeTypes } from "@/types/application";

type ApplicationContextState = {
    slideOverMode: ApplicationModeTypes;
    selectedApplication: ApplicationFormState;
};

type ApplicationContextActions = {
    startCreateApplication: () => void;
    startEditApplication: (app: ApplicationFormState) => void;
    closeSlideOver: () => void;
};

type ApplicationContextType = ApplicationContextState & ApplicationContextActions;

export const ApplicationUIContext = createContext<ApplicationContextType | null>(null);

export const ApplicationUIProvider = ({ children }: { children: React.ReactNode; }) => {
    const [state, setState] = useState<ApplicationContextState>({
        slideOverMode: null,
        selectedApplication: applicationInitialState,
    });

    const startCreateApplication = () => {
        setState({
            slideOverMode: APPLICATION_MODES.CREATE,
            selectedApplication: applicationInitialState,
        });
    };

    const startEditApplication = (app: ApplicationFormState) => {
        setState({
            slideOverMode: APPLICATION_MODES.EDIT,
            selectedApplication: app,
        });
    };

    const closeSlideOver = () => {
        setState((prev) => ({
            ...prev,
            slideOverMode: null,
        }));
    };

    const value: ApplicationContextType = {
        ...state,
        startCreateApplication,
        startEditApplication,
        closeSlideOver,
    };

    return (
        <ApplicationUIContext.Provider value={value}>
            {children}
        </ApplicationUIContext.Provider>
    );
};
