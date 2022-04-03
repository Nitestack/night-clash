//CSS imports
import "@styles/fonts.scss";
import "@styles/brawlstars.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "@styles/globals.scss";
//Imports
import Layout from "@components/Layout/index";
import LoadingScreen from "@components/Layout/LoadingScreen";
import Util from "@util/index";
import FirebaseAuthProvider from "@components/AuthProvider";
import { StrictMode as ReactStrictMode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "src/configuration/Actions/index";
import { MantineProvider } from "@mantine/core";
import config from "../../config.json";
import { useRouter } from "next/router";
import { useTitle, useDescription, useHeader, useMeta, useScripts, useAuth } from "@util/hooks";
//Type imports
import type { FC } from "react";
import type { ComponentWithConfigurationProps, CustomComponentType } from "@util/types";

const queryClient = new QueryClient(); //React Query Client

const CustomComponent: FC<{ Component: CustomComponentType; pageProps: any; }> = ({ Component, pageProps }) => {
    //Router
    const router = useRouter();
    //Dispatcher
    const dispatch = Util.StateManagement.useDispatch();
    //Loading Screen
    const [done, setDone] = useState(!Component.authenticationRequired && !Component.adminRoleRequired && !Component.noAuthenticationRequired);
    //User
    const { user, loading } = useAuth();
    const isLoggedIn = !!user;
    //Layout Hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    const { setMeta } = useMeta();
    const { setScripts } = useScripts();
    //Page Information
    useEffect(() => {
        if (Component.title) setTitle(Component.title);
        if (Component.description) setDescription(Component.description);
        if (Component.header) setHeader(Component.header);
        if (Component.scripts) setScripts(Component.scripts);
        if (Component.meta) setMeta(Component.meta);
    }, []);
    //Mode
    useEffect(() => {
        let mode = Util.getCookie("mode"); //Get mode from cookie
        if (!mode || mode == "") { //If mode is not set, set it to default
            Util.setCookie("mode", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", 730, "/"); //Set mode cookie to default
            mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; //Set mode state to default
        };
        dispatch(Util.StateManagement.loadMode(mode as "light" | "dark")); //Load mode
        if (mode == "dark") document.documentElement.classList.add("dark"); //Add dark mode class for Tailwind CSS
    }, []);
    //Authentication
    useEffect(() => {
        if (loading) return; //If loading, don't do anything
        if (done) return; //If not loading, don't do anything
        if (Component.authenticationRequired) { //If login is required
            if (isLoggedIn) execute(); //If the user is logged in, grant access to the page
            else window.open("/login", "_self"); //If not authenticated, force log in
        } else if (Component.noAuthenticationRequired) { //If the user wants to login or register
            if (isLoggedIn) window.open("/account", "_self"); //If the user is logged in, redirect to the account page
            else execute(); //If not authenticated, force log in
        };
    }, [loading]);
    //If the user is logged in, grant access to the page
    if (done) return (
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    );
    //If authentication is required, but the user is not logged in, show the loading screen
    return (
        <LoadingScreen/>
    );
    //Executing after authentication
    function execute() {
        if (Component.afterAuthentication) Component.afterAuthentication(router, user!); //Execute after authentication
        setDone(true); //If the user is logged in, grant access to the page
    };
};

function MyApp({ Component, pageProps }: ComponentWithConfigurationProps) {
    return (
        <ReactStrictMode> {/*Provider which adds Strict Mode to our React application*/}
            <ReduxProvider store={store}> {/*Provider which adds Redux, a global state manager*/}
                <ReactQueryClientProvider client={queryClient}> {/*Provider which adds React Query, a data fetching/caching service*/}
                <MantineProvider theme={{ 
                    fontFamily: "Supercell-Magic",
                    primaryColor: config.primaryColor
                }}> {/*Provider which adds Mantine, a CSS components/React hooks utility library*/}
                    <FirebaseAuthProvider> {/*Provider which adds Firebase Authentication, a service for managing user accounts*/}
                        <CustomComponent Component={Component} pageProps={pageProps}/> {/*Component which handles authentication and loading screen*/}
                    </FirebaseAuthProvider>
                    {process.env.NODE_ENV == "development" ? <ReactQueryDevtools initialIsOpen={false}/> : undefined}
                </MantineProvider>
                </ReactQueryClientProvider>
            </ReduxProvider>
        </ReactStrictMode>
    );
};

export default MyApp;