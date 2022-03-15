import type { NextPageContext, NextComponentType, NextPage } from "next";
import type { AppInitialProps, AppProps } from "next/app";
import type { Session } from "next-auth";
import type { UserWithoutPassword } from "@models/user";
import type { LayoutProps } from "@components/Layout";
import type axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { NextRouter } from "next/router";
import { store } from "@actions/index";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

/**
 * A session with custom props
 */
export interface UserSession extends Session {
    user?: UserWithoutPassword;
};

/**
 * The object returned of the `useSession()` function
 */
export type SessionObject = { data: UserSession; status: "authenticated"; } 
| { data: null; status: "loading"; } 
| { data: UserSession; status: "authenticated"; } 
| { data: null; status: "unauthenticated" | "loading"; }; 

/**
 * Extra utility configurations for Next pages
 */ 
export interface ComponentConfiguration extends LayoutProps {
    /**
     * Whether authentication is required to view the content of the website or not
     */
    authenticationRequired?: boolean;
    /**
     * Don't use this! 
     * 
     * Just for `./pages/login.tsx` and `./pages/register.tsx`
     */
    noAuthenticationRequired?: boolean;
    /**
     * Just allows admins to view the page
     */
    adminRoleRequired?: boolean;
    /**
     * Specifies to which URL the user will be redirected after signing in 
     * 
     * Will be ignored if {@link authenticationRequired} is `false` or `undefined`
     */
    returnUrl?: string;
    /**
     * If true, you need to import the `Layout` component manually
     * 
     * Configurations {@link title}, {@link header}, {@link description} will be ignored
     */
    disableLayout?: boolean;
    /**
     * If given, it will call the {@link axios} API to request data
     */
    fetchData?: {
        /**
         * The url 
         */
        url: string,
        /**
         * A configuration object
         */
        config?: AxiosRequestConfig<any>,
        /**
         * The request method
         */
        method: "post" | "get",
        /**
         * Data passed to a `POST` or `PUT` request
         * 
         * Will be ignored if `method` isn't `POST`
         * @param {object} data Data that can be accessed to parse into the body
         */
        data?: (router: NextRouter, user?: UserWithoutPassword) => any
    };
    /**
     * A function that will be called after authentication
     * 
     * This function will be ignored if {@link authenticationRequired} is `false` or `undefined`
     */
    afterAuthentication?: (session: UserSession, router: NextRouter) => void;
    /**
     * If this is true, the loading screen will remain until the `query` object has properties
     * 
     * Will be ignored if {@link afterAuthentication} isn't defined
     */
    queryRequired?: boolean;
};

export type CustomComponentType<InitialProps = {}, Props = {}, DataType = any> = NextComponentType<NextPageContext, InitialProps, Props & { data: DataType, session?: UserSession }> & ComponentConfiguration;

/**
 * A component with configuration
 * 
 * Almost same as {@link NextPage}, so update if needed
 */
export type NextPageWithConfiguration<Props = {}, InitialProps = Props, DataType = any> = CustomComponentType<InitialProps, Props, DataType> & {
    getInitialProps?(context: NextPageContext): InitialProps | Promise<InitialProps>;
};

/**
 * Almost same as {@link AppProps}, so update if needed
*/
export type ComponentWithConfigurationProps<Props = {}> = AppInitialProps & {
    Component: CustomComponentType<any, Props>,
    router: NextRouter;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    __N_RSC?: boolean;
};

export interface NextApiCustomHandlerProps {
    success: boolean;
};