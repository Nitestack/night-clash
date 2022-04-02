import "@styles/fonts.scss";
import "@styles/brawlstars.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "@styles/globals.scss";
import Layout from "@components/Layout/index";
import { StrictMode, useEffect, useState } from "react";
import type { FC } from "react";
import type { ComponentWithConfigurationProps, CustomComponentType } from "@util/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import LoadingScreen from "@components/Layout/LoadingScreen";
import Util from "@util/index";
import { Provider } from "react-redux";
import { store } from "src/configuration/Actions/index";
import { MantineProvider } from "@mantine/core";
import config from "../../config.json";
import AuthProvider, { useAuth } from "@components/AuthProvider";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

const CustomProvider: FC<{ Component: CustomComponentType; pageProps: any; }> = ({ Component, pageProps }) => {
    const router = useRouter();
    const dispatch = Util.StateManagement.useDispatch();
    const [isLoading, setIsLoading] = useState(Component.authenticationRequired || Component.adminRoleRequired || Component.noAuthenticationRequired);
    const { user, loading } = useAuth();
    const isLoggedIn = !!user;
    //Mode
    useEffect(() => {
        let mode = Util.getCookie("mode");
        if (!mode || mode == "") {
            Util.setCookie("mode", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", 730, "/");
            mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        };
        dispatch(Util.StateManagement.loadMode(mode as "light" | "dark"));
        if (mode == "dark") document.documentElement.classList.add("dark");
    }, []);
    //Authentication
    useEffect(() => {
        if (loading) return; //If loading, don't do anything
        if (!isLoading) return; //If not loading, don't do anything
        if (Component.authenticationRequired) { //If login is required
            if (isLoggedIn) handleAuthentication(); //If the user is logged in, grant access to the page
            else window.open("/login", "_self"); //If not authenticated, force log in
        } else if (Component.noAuthenticationRequired) { //If the user wants to login or register
            if (isLoggedIn) window.open("/account", "_self"); //If the user is logged in, redirect to the account page
            else handleAuthentication(); //If not authenticated, force log in
        };
    }, [loading]);
    if (isLoading) return (
        <LoadingScreen/>
    );
    else {
        if (Component.disableLayout) return (
            <Component {...pageProps}/>
        );
        else return (
            <Layout title={Component.title} header={Component.header} description={Component.description}>
                <Component {...pageProps}/>
            </Layout>
        );
    };
    function handleAuthentication() {
        if (Component.afterAuthentication) Component.afterAuthentication(router, user!);
        setIsLoading(false); //If the user is logged in, grant access to the page
    };
};

function MyApp({ Component, pageProps }: ComponentWithConfigurationProps) {
    return (
        <StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                <MantineProvider theme={{
                    fontFamily: "Supercell-Magic",
                    primaryColor: config.primaryColor
                }}>
                    <AuthProvider>
                        <CustomProvider Component={Component} pageProps={pageProps}/>
                    </AuthProvider>
                    {process.env.NODE_ENV == "development" ? <ReactQueryDevtools initialIsOpen={false}/> : undefined}
                </MantineProvider>
                </QueryClientProvider>
            </Provider>
        </StrictMode>
    );
};

export default MyApp;