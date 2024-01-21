import type { NextPageContext, NextComponentType, NextPage } from "next";
import type { AppInitialProps, AppProps } from "next/app";
import type { NextRouter } from "next/router";
import { store } from "@actions/index";
import type { PrismaClient } from ".prisma/client";
import type { User } from "firebase/auth";
import type { APIClients } from "@util/api";
export * from ".prisma/client";
export * from "@graphql/types";

//Global declaration
declare global {
    var prisma: PrismaClient | undefined;
    var api: Partial<APIClients>;
    namespace NodeJS {
        interface ProcessEnv {
            //.env.local
            APOLLO_CLIENT_URL: string;
            //.env
            DATABASE_URL: string;
            PASSWORD: string;
            EMAIL: string;
            FIREBASE_API_KEY: string;
            FIREBASE_AUTH_DOMAIN: string;
            FIREBASE_PROJECT_ID: string;
            FIREBASE_STORAGE_BUCKET: string;
            FIREBASE_MESSAGING_SENDER_ID: string;
            FIREBASE_APP_ID: string;
            FIREBASE_MEASUREMENT_ID: string;
        };
    };
};

/* REDUX */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type
export type AppDispatch = typeof store.dispatch;


/* NextJS */

/**
 * Extra utility configurations for Next pages
 */ 
export interface ComponentConfiguration {
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
     * A function that will be called after authentication
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