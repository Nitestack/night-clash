import type { NextPageContext, NextComponentType, NextPage } from "next";
import type { AppInitialProps, AppProps } from "next/app";
import type { LayoutProps } from "@components/Layout";
import type axios from "axios";
import type { NextRouter } from "next/router";
import { store } from "@actions/index";
import type { User } from "firebase/auth";

/* REDUX */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


/* NextJS */

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
     * If true, you need to import the `Layout` component manually
     * 
     * Configurations {@link title}, {@link header}, {@link description} will be ignored
     */
    disableLayout?: boolean;
    /**
     * A function that will be called after authentication
     * 
     * This function will be ignored if {@link authenticationRequired} is `false` or `undefined`
     */
    afterAuthentication?: (router: NextRouter, user?: User) => void;
};

export type CustomComponentType<InitialProps = {}, Props = {}> = NextComponentType<NextPageContext, InitialProps, Props> & ComponentConfiguration;

/**
 * A component with configuration
 * 
 * Almost same as {@link NextPage}, so update if needed
 */
export type NextPageWithConfiguration<Props = {}, InitialProps = Props> = CustomComponentType<InitialProps, Props> & {
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

export interface NextApiError {
    errorMessage: string
};