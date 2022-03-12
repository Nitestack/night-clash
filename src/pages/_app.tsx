import "@styles/fonts.scss";
import "@styles/brawlstars.scss";
import "@public/prism/prism.css";
import "@styles/main.scss";
import "@styles/loader.scss";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Layout from "@components/Layout";
import { StrictMode, useEffect, useState } from "react";
import type { FC } from "react";
import type {
    ComponentWithConfigurationProps,
    SessionObject,
    UserSession,
    CustomComponentType
} from "@util/types";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingScreen from "@components/Loading";
import $ from "jquery";
import Util from "@util/index";

const isDevelopment = process.env.NODE_ENV == "development";

const minAnimationTime = isDevelopment ? 0 : 1000;

const queryClient = new QueryClient();

const CustomProvider: FC<{
    Component: CustomComponentType;
    pageProps: any;
}> = ({ Component, pageProps }) => {
    const [done, setDone] = useState(!Component.authenticationRequired && !Component.adminRoleRequired && !Component.noAuthenticationRequired && !Component.fetchData ? true : false);
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
            else setDone(true);
        } else {
            handleAuthentication();
        };
    }, Component.queryRequired ? [status, router.query] : [status]);
    return done ? (
        Component.disableLayout ? (<Component {...pageProps} data={data} />) : (
            <Layout
                title={Component.title}
                header={Component.header}
                description={Component.description}>
                {/*See at `./configuration/Util/types.ts`*/}
                <Component {...pageProps} data={data} session={session} />
            </Layout>
        )
    ) : <LoadingScreen/>;
    function handleAuthentication(session?: UserSession) {
        if (Component.afterAuthentication) {
            //@ts-ignore
            const returnValue = Component.afterAuthentication(session, router);
            if (typeof returnValue == "boolean" && returnValue == false) return setTimeout(() => {
                setDone(true);
            }, minAnimationTime);
        };
        if (Component.fetchData) {
            const config = Component.fetchData?.config
                ? Component.fetchData?.config
                : undefined;
            Util.Axios[Component.fetchData.method](
                Component.fetchData.url,
                Component.fetchData.method != "post"
                    ? config
                    : Component.fetchData?.data
                    ? Component.fetchData.data(Component.fetchData?.parseData
                        //@ts-ignore
                        ? Component.fetchData?.parseData(router, user) : {})
                    : undefined,
                Component.fetchData.method == "post" ? config : undefined).then(res => {
                    if (res.status == 200) {
                        setData(res.data);
                        setTimeout(() => {
                            setDone(true);
                        }, minAnimationTime);
                    };
                }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        const { data } = error.response;
                        const redirectUrl: string | undefined = data.redirectUrl;
                        const errorMessage: string = data.errorMessage;
                        if (redirectUrl) router.push(redirectUrl);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    };
                });  
        } else setTimeout(() => {
            setDone(true);
        }, minAnimationTime);
    }
};

function MyApp({ Component, pageProps: { session, ...pageProps }, }: ComponentWithConfigurationProps) {
    useEffect(() => {
        $("img").on("mousedown", function (event) {
            if (event.button == 2) return;
        });
        //Light/Dark Mode
        let mode = Util.getCookie("mode");
        if (!mode || mode == "") {
            Util.setCookie(
                "mode",
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light",
                730,
                "/"
            );
            mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        };
        if (mode == "dark") $(document.documentElement).addClass("dark");
        else $(document.documentElement).removeClass("dark");
    }, []);
    return (
        <StrictMode>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <CustomProvider pageProps={pageProps} Component={Component}/>
                </QueryClientProvider>
            </SessionProvider>
        </StrictMode>
    );
};

export default MyApp;