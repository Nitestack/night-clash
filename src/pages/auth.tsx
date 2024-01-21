import type { NextPageWithConfiguration } from "types";
import { useTitle, useDescription, useHeader } from "@util/hooks";
import AuthorizationTab from "@modules/AuthorizationTab";

const AuthenticationPage: NextPageWithConfiguration = () => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    //Page info
    setTitle("Authentication");
    setDescription("Sign in or create an account to access the dashboard!");
    setHeader("Authorize");
    return <AuthorizationTab />;
};
AuthenticationPage.noAuthenticationRequired = true;

export default AuthenticationPage;
