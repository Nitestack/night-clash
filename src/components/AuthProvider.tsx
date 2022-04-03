import Util from "@util/index";
import { createContext, useContext, useState } from "react";
import { auth } from "@util/firebase";
import { signOut, updateEmail, updateProfile, updatePassword } from "firebase/auth";
//Type imports
import type { User } from "@firebase/auth";
import type { FC } from "react";

type AuthContext = {
    //The user object
    user?: User | null,
    //If the authentication process is in progress
    loading: boolean,
    //Logs the user out
    logout: () => Promise<void>,
    //Updates the user's credentials
    editUser: (newUser: {
        email?: string;
        password?: string;
        name?: string;
    }) => Promise<void>
};

//Create a new context
const AuthContext = createContext<AuthContext>({} as AuthContext);

//export a hook that returns the context
export const useAuth = () => useContext<AuthContext>(AuthContext);

//Context Provider
const FirebaseAuthenticationProvider: FC = ({ children }) => {
    //State variables
    const [user, setUser] = useState<User | null | undefined>(null);
    const [loading, setLoading] = useState(true);
    //Event Listener for authentication state changes
    auth.onAuthStateChanged(user => {
        if (user) setUser(user);
        else setUser(null);
        setLoading(false);
    });
    //Logs the user out
    async function logout() {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
            Util.toast.error("An error happened while signing out! Please try again later!");
        };
    };
    //Updates the user's credentials
    async function editUser(newUser: {
        email?: string,
        password?: string,
        name?: string
    }) {
        const { email, password, name } = newUser;
        try {
            if (email) await updateEmail(auth.currentUser!, email);
            if (password) await updatePassword(auth.currentUser!, password);
            if (name) await updateProfile(auth.currentUser!, { displayName: name });
        } catch (err) {
            console.log(err);
            Util.toast.error("An error happened while editing your profile! Please try again later!");
        };
    };
    return (
        <AuthContext.Provider value={{ loading, user, editUser, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default FirebaseAuthenticationProvider;