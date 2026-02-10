"use client";

import { createContext, useState } from "react";
// constants
import { APPLICATION_MODES, applicationInitialState } from "@/constants/ui";
// types
import { Application, ApplicationFormState, ApplicationIDTypes, ApplicationModeTypes } from "@/types/application";
// helpers
import { mapApplicationToFormState } from "@/lib/ui";

type ApplicationContextState = {
    slideOverMode: ApplicationModeTypes;
    selectedApplication: ApplicationFormState;
    selectedApplicationId: ApplicationIDTypes;
};

type ApplicationContextActions = {
    startCreateApplication: () => void;
    startEditApplication: (app: Application) => void;
    closeSlideOver: () => void;
};

type ApplicationContextType = ApplicationContextState & ApplicationContextActions;

export const ApplicationUIContext = createContext<ApplicationContextType | null>(null);

export const ApplicationUIProvider = ({ children }: { children: React.ReactNode; }) => {
    const [state, setState] = useState<ApplicationContextState>({
        slideOverMode: null,
        selectedApplication: applicationInitialState,
        selectedApplicationId: null
    });

    const startCreateApplication = () => {
        setState({
            slideOverMode: APPLICATION_MODES.CREATE,
            selectedApplication: applicationInitialState,
            selectedApplicationId: null
        });
    };

    const startEditApplication = (app: Application) => {
        setState({
            slideOverMode: APPLICATION_MODES.EDIT,
            selectedApplication: mapApplicationToFormState(app),
            selectedApplicationId: app.id
        });
    };

    const closeSlideOver = () => {
        setState((prev) => ({
            ...prev,
            slideOverMode: null,
            selectedApplication: applicationInitialState,
            selectedApplicationId: null
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
