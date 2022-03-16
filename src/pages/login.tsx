import Link from "@components/Elements/Link";
import type { NextPageWithConfiguration } from "@util/types";
import { LockClosedIcon } from "@heroicons/react/solid";
import Center from "@components/Utilities/Center";
import Input from "@components/Elements/Input";
import Button from "@components/Elements/Button";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Util from "@util/index";
import validator from "validator";
import { signIn } from "next-auth/react";

const LoginPage: NextPageWithConfiguration = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    useEffect(() => {
        const errorMessage = router.query.error as string;
        if (errorMessage) {
            //Code 400
            if (errorMessage.toLowerCase().includes("code") && (errorMessage.includes("400") || errorMessage.includes("500"))) Util.toast.error("Invalid login!");
            else Util.toast.error(errorMessage);
        };
    }, []);
    function onSubmit() {
        return async () => {
            if (!validator.isEmail(email)) return Util.toast.error("Invalid email!");
            await Util.ApiHandler.clientSideErrorHandler(async () => {
                const response = await Util.Axios.post("/api/user/gethash", {
                    email: email
                });
                if (response.status == 200) {
                    if (!Util.comparePasswords(password, response.data.hash)) return Util.toast.error("Invalid login!");
                    signIn("credentials", {
                        email: email,
                        hash: Util.encryptPassword(password)
                    });
                };
            });
        };
    };
    function saveEmail() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            setEmail(ev.target.value);
        };
    };
    function savePassword() {
        return (ev: ChangeEvent<HTMLInputElement>) => {
            setPassword(ev.target.value);
        };
    };
    return (
        <Center className="min-h-full p-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Input type="email" autoComplete="email" required className="rounded-t-md w-full" placeholder="E-Mail" onChange={saveEmail()}/>
                <Input type="password" autoComplete="current-password" required className="rounded-b-md w-full" placeholder="Password" onChange={savePassword()}/>
                <Center className="justify-between">
                    <div className="flex items-center">
                        <div className="ml-2 block text-sm text-gray-900"> Don&apos;t have an account? </div>
                    </div>
                    <div className="text-sm">
                        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap"> Sign Up </Link>
                    </div>
                </Center>
                <div>
                    <Button onClick={onSubmit()} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                        </span>
                        Sign in
                    </Button>
                </div>
            </div>
        </Center>
    );
};

LoginPage.title = "Sign In";
LoginPage.description = "Sign in to your account to access the dashboard!";
LoginPage.noAuthenticationRequired = true;

export default LoginPage;