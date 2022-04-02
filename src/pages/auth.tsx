import type { NextPageWithConfiguration } from "@util/types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "@util/firebase";

const AuthenticationPage: NextPageWithConfiguration = () => {
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
AuthenticationPage.title = "Authentication";
AuthenticationPage.description = "Sign in or create an account to access the dashboard!";
AuthenticationPage.noAuthenticationRequired = true;

export default AuthenticationPage;