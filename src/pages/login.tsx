import type { GetServerSideProps } from "next";
import Link from "@components/Elements/Link";
import { getCsrfToken } from "next-auth/react";
import type { NextPageWithConfiguration } from "@util/types";
import { LockClosedIcon } from "@heroicons/react/solid";
import Center from "@components/Utilities/Center";
import Input from "@components/Elements/Input";
import Button from "@components/Elements/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Util from "@util/index";

const LoginPage: NextPageWithConfiguration<{ csrfToken: string }> = ({ csrfToken }) => {
    const router = useRouter();
    useEffect(() => {
        const errorMessage = router.query.error as string;
        if (errorMessage) {
            //Code 400
            if (errorMessage.toLowerCase().includes("code") && errorMessage.includes("400")) Util.toast.error("Invalid login!");
            else Util.toast.error(errorMessage);
        };
    }, []);
    return (
        <Center className="min-h-full p-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" action="/api/auth/callback/credentials" method="post">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                    <Input name="email" type="email" autoComplete="email" required className="rounded-t-md w-full" placeholder="E-Mail"/>
                    <Input name="password" type="password" autoComplete="current-password" required className="rounded-b-md w-full" placeholder="Password"/>
                    <Center className="justify-between">
                        <div className="flex items-center">
                            <div className="ml-2 block text-sm text-gray-900"> Don&apos;t have an account? </div>
                        </div>
                        <div className="text-sm">
                            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap"> Sign Up </Link>
                        </div>
                    </Center>
                    <div>
                        <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                            </span>
                            Sign in
                        </Button>
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