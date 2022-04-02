import { createContext, useContext, useState } from "react";
import type { FC } from "react";
import { auth } from "@util/firebase";
import { signOut, updateEmail, updateProfile, updatePassword, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { User, UserCredential } from "@firebase/auth";
import Util from "@util/index";

type AuthContext = {
    user?: User | null,
    loading: boolean,
    logout: () => Promise<void>,
    login: (email: string, password: string) => Promise<UserCredential | undefined>,
    register: (email: string, username: string, password: string) => Promise<void>,
    editUser: (newUser: {
        email?: string;
        password?: string;
        name?: string;
    }) => Promise<void>
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const useAuth = () => useContext<AuthContext>(AuthContext);

const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(null);
    const [loading, setLoading] = useState(true);
    onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);
        setLoading(false);
    });
    async function login(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (err) {
            console.log(err);
            Util.toast.error("An error happened while signing in! Please try again later!");
        };
    };
    async function logout() {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
            Util.toast.error("An error happened while signing out! Please try again later!");
        };
    };
    async function register(email: string, name: string, password: string) {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredentials) {
                console.log("Created user on Firebase!");
                //Register the user in the database with additional information
                const response = await Util.Axios.post("/api/user/register", {
                    uid: userCredentials.user.uid,
                    name: name
                });
                console.log("Operation successful!");
                //If the registration was successful
                if (response.status == 200) {
                    console.log("Created user on MongoDB!");
                    Util.toast.success("Successfully registered!");
                    window.open("/account", "_self");
                };
            };
        } catch (err) {
            console.log(err); 
            Util.toast.error("An error happened while registering! Please try again later!");
        };
    };
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
        <AuthContext.Provider value={{ loading, user, register, login, editUser, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;