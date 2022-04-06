import type { FC } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "@util/firebase";

const AuthorizationTab: FC = () => {
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
export default AuthorizationTab;