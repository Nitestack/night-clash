import "@styles/fonts.scss";
import "@styles/brawlstars.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "@styles/globals.scss";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Layout from "@components/Layout/index";
import { StrictMode, useEffect, useState } from "react";
import type { FC } from "react";
import type { ComponentWithConfigurationProps, CustomComponentType } from "@util/types";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingScreen from "@components/Layout/LoadingScreen";
import Util from "@util/index";
import { Provider } from "react-redux";
import { store } from "src/configuration/Actions/index";
import { MantineProvider } from "@mantine/core";
import config from "../../config.json";

const isDevelopment = process.env.NODE_ENV == "development";

const minAnimationTime = isDevelopment ? 0 : 1000;

const queryClient = new QueryClient();

const CustomProvider: FC<{ Component: CustomComponentType; pageProps: any; }> = ({ Component, pageProps }) => {
    const dispatch = Util.StateManagement.useDispatch();
    const [done, setDone] = useState(!Component.authenticationRequired && !Component.adminRoleRequired && !Component.noAuthenticationRequired && !Component.fetchData ? true : false);
    const [data, setData] = useState<any>(undefined);
    const { data: session, status } = useSession();
    const user = session?.user;
    const isUser = !!user;
    const router = useRouter();
    useEffect(() => {
        if (done) return; //Do nothing if everything is done
        if (Util.isEmptyObject(router.query) && Component.queryRequired) return; //If the router params are undefined
        if (status == "loading") return; // Do nothing while loading
        if (Component.authenticationRequired) { //If login is required
            if (isUser) handleAuthentication(session);
            else if (!isUser) signIn(); // If not authenticated, force log in
        } else if (Component.noAuthenticationRequired) { //If the user wants to login or register
            // If authenticated already, redirect to /account
            if (isUser) {
                window.location.href = router.query.callBackUrl ? router.query.callBackUrl as string : "/account";
            } else setDone(true);
        } else handleAuthentication();
    }, Component.queryRequired ? [router, status] : [status]);
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
    //Render
    return (
        <MantineProvider theme={{
            fontFamily: "Supercell-Magic",
            colorScheme: Util.StateManagement.useSelector(state => state.mode),
            primaryColor: config.primaryColor
        }}>
            {done ? (Component.disableLayout ? (<Component {...pageProps} data={data} />) : 
            <Layout title={Component.title} header={Component.header} description={Component.description}>
                {/*See at `./configuration/Util/types.ts`*/}
                <Component {...pageProps} data={data} session={session} />
            </Layout> ) : 
            <LoadingScreen/>}
        </MantineProvider>
    );
    function handleAuthentication(session?: any | null) {
        //Function that will be executed after handling authentication
        if (Component.afterAuthentication) {
            const returnValue = Component.afterAuthentication(session, router);
            //If the return value is `false`, it exits the function
            if (typeof returnValue == "boolean" && returnValue == false) return setTimeout(() => setDone(true), minAnimationTime);
        };
        //Fetch data for displaying content
        if (Component.fetchData) {
            const config = Component.fetchData?.config ? Component.fetchData?.config : undefined;
            Util.Axios[Component.fetchData.method](Component.fetchData.url,
                Component.fetchData.method != "post"
                    ? config
                    : Component.fetchData?.data
                    ? Component.fetchData.data(router, session?.user)
                    : undefined,
                Component.fetchData.method == "post" ? config : undefined).then(res => {
                    if (res.status == 200) {
                        setData(res.data);
                        setTimeout(() => setDone(true), minAnimationTime);
                    };
                //Edit the error handler in @utils/apiHandler.ts too
                }).catch((error) => {
                    const { response, request } = error;
                    if (response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        const { data } = response;
                        const redirectUrl: string | undefined = data.redirectUrl;
                        const errorMessage: string = data.errorMessage;
                        if (redirectUrl) {
                            router.push(redirectUrl).then(() => setDone(true));
                        } else Util.toast.error(errorMessage);
                    } else if (request) {
                        // Something happened in setting up the request that triggered an Error
                        Util.toast.error("An error happened on the server! Please try again!");
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        Util.toast.error("An error happened on the server! Please try again!");
                    };
                });  
        } else setTimeout(() => setDone(true), minAnimationTime);
    };
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: ComponentWithConfigurationProps) {
    return (
        <StrictMode>
            <Provider store={store}>
                <SessionProvider session={session}>
                    <QueryClientProvider client={queryClient}>
                        <CustomProvider pageProps={pageProps} Component={Component}/>
                    </QueryClientProvider>
                </SessionProvider>
            </Provider>
        </StrictMode>
    );
};

export default MyApp;