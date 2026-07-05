import { AUTH_MODES } from "@/constants/ui";
import AuthForm from "@/components/auth/AuthForm";

const Page = () => {
    return <AuthForm mode={AUTH_MODES.SIGNUP} />;
};

export default Page;
