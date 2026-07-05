import { AUTH_MODES } from "@/constants/ui";

export type AuthModeTypes = typeof AUTH_MODES[keyof typeof AUTH_MODES];
