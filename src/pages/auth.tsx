import type { NextPageWithConfiguration } from "@util/types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "@util/firebase";
import { useTitle, useDescription, useHeader } from "@util/hooks";

const AuthenticationPage: NextPageWithConfiguration = () => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    //Page info
    setTitle("Authentication");
    setDescription("Sign in or create an account to access the dashboard!");
    setHeader("Authorize");
    return (
        <StyledFirebaseAuth uiConfig={{
            signInFlow: "popup",
            signInSuccessUrl: "/account",
            signInOptions: [{
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            }]
        }} firebaseAuth={auth} className="font-coc-description"/>
    );
};
AuthenticationPage.noAuthenticationRequired = true;

export default AuthenticationPage;