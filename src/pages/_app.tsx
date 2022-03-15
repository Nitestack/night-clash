import "@styles/fonts.scss";
import "@styles/brawlstars.scss";
import "prismjs/themes/prism-okaidia.min.css";
import "@styles/globals.scss";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Layout from "@components/Layout/index";
import { StrictMode, useEffect, useState } from "react";
import type { FC } from "react";
import type { ComponentWithConfigurationProps, SessionObject, UserSession, CustomComponentType } from "@util/types";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingScreen from "@components/Layout/LoadingScreen";
import $ from "jquery";
import Util from "@util/index";
import { Provider } from "react-redux";
import { store } from "src/configuration/Actions/index";
import ErrorModal from "@components/Layout/ErrorModal";

const isDevelopment = process.env.NODE_ENV == "development";

const minAnimationTime = isDevelopment ? 0 : 1000;

const queryClient = new QueryClient();

const CustomProvider: FC<{ Component: CustomComponentType; pageProps: any; }> = ({ Component, pageProps }) => {
    const dispatch = Util.StateManagement.useDispatch();
    if (Component.authenticationRequired || Component.adminRoleRequired || Component.noAuthenticationRequired || Component.fetchData) {
        dispatch(Util.StateManagement.showLoadingScreen());
    };
    const done = !Util.StateManagement.useSelector((state) => state.loading);
    const [data, setData] = useState<any>(undefined);
    const { data: session, status } = useSession() as SessionObject;
    const user = session?.user;
    const isUser = !!user;
    const router = useRouter();
    useEffect(() => {
        if (done) return; //Do nothing if everything is done
        if ($.isEmptyObject(router.query) && Component.queryRequired) return;
        if (status == "loading") return; // Do nothing while loading
        if (Component.authenticationRequired) {
            if (isUser) handleAuthentication(session);
            else if (!isUser && !isDevelopment) signIn(); // If not authenticated, force log in
        } else if (Component.adminRoleRequired) {
            if (!isUser && !isDevelopment) signIn();
            else if (user?.role != Util.Constants.ADMIN_ROLE_ID || !isDevelopment) router.push("/404");
            else handleAuthentication();
        } else if (Component.noAuthenticationRequired) {
            // If authenticated, redirect to /account
            if (isUser) router.push("/account");
            else dispatch(Util.StateManagement.hideLoadingScreen());
        } else {
            handleAuthentication();
        };
    }, Component.queryRequired ? [router.query, status] : [status]);
    return done ? 
    (Component.disableLayout ? (<Component {...pageProps} data={data} />) : 
        <Layout title={Component.title} header={Component.header} description={Component.description}>
            {/*See at `./configuration/Util/types.ts`*/}
            <Component {...pageProps} data={data} session={session} />
        </Layout>
    ) : <LoadingScreen/>;
    function handleAuthentication(session?: UserSession) {
        //Function that will be executed after handling authentication
        if (Component.afterAuthentication) {
            //@ts-ignore
            const returnValue = Component.afterAuthentication(session, router);
            //If the return value is `false`, it exits the function
            if (typeof returnValue == "boolean" && returnValue == false) return setTimeout(() => dispatch(Util.StateManagement.hideLoadingScreen()), minAnimationTime);
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
                        setTimeout(() => dispatch(Util.StateManagement.hideLoadingScreen()), minAnimationTime);
                    };
                }).catch((error) => {
                    const { response, request } = error;
                    if (response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        const { data } = response;
                        const redirectUrl: string | undefined = data.redirectUrl;
                        const errorMessage: string = data.errorMessage;
                        if (redirectUrl) {
                            router.push(redirectUrl);
                        } else dispatch(Util.StateManagement.displayError({
                            type: response.status == 500 ? "INTERNAL_SERVER_ERROR" : "BAD_REQUEST",
                            description: errorMessage
                        }));
                    } else if (request) {
                        // Something happened in setting up the request that triggered an Error
                        dispatch(Util.StateManagement.displayError({
                            type: "INTERNAL_SERVER_ERROR"
                        }));
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        dispatch(Util.StateManagement.displayError({
                            type: "INTERNAL_SERVER_ERROR"
                        }));
                    };
                });  
        } else setTimeout(() => dispatch(Util.StateManagement.hideLoadingScreen()), minAnimationTime);
    };
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: ComponentWithConfigurationProps) {
    useEffect(() => {
        $("img").on("mousedown", function (event) {
            if (event.button == 2) return;
        });
        //Light/Dark Mode
        let mode = Util.getCookie("mode");
        if (!mode || mode == "") {
            Util.setCookie("mode", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", 730, "/");
            mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        };
        if (mode == "dark") $(document.documentElement).addClass("dark");
        else $(document.documentElement).removeClass("dark");
    }, []);
    return (
        <StrictMode>
            <Provider store={store}>
                <SessionProvider session={session}>
                    <QueryClientProvider client={queryClient}>
                        <ErrorModal/>
                        <CustomProvider pageProps={pageProps} Component={Component}/>
                    </QueryClientProvider>
                </SessionProvider>
            </Provider>
        </StrictMode>
    );
};

export default MyApp;