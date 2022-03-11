import { GetServerSideProps } from "next";
import Link from "@components/Link";
import { getCsrfToken } from "next-auth/react";
import { NextPageWithConfiguration } from "@util/types";
import { LockClosedIcon } from "@heroicons/react/solid";
import Center from "@components/Center";

const LoginPage: NextPageWithConfiguration<{ csrfToken: string }> = ({ csrfToken }) => {
    return (
        <Center className="min-h-full p-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" action="/api/auth/callback/credentials" method="POST">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                    <div className="rounded-md shadow-sm -space-y-px font-coc-description">
                        <div>
                            <input name="emailOrUsername" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="E-Mail or Username"/>
                        </div>
                        <div>
                            <input name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Password"/>
                        </div>
                    </div>
                    <Center className="justify-between">
                        <div className="flex items-center">
                            <div className="ml-2 block text-sm text-gray-900"> Don&apos;t have an account? </div>
                        </div>
                        <div className="text-sm">
                            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap"> Sign Up </Link>
                        </div>
                    </Center>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </Center>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    };
};

LoginPage.title = "Sign In";
LoginPage.description = "Sign in to your account to access the dashboard!";
LoginPage.noAuthenticationRequired = true;

export default LoginPage;