import type { NextPageWithConfiguration } from "@util/types";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useState } from "react";
import Link from "@components/Elements/Link";
import { LockClosedIcon } from "@heroicons/react/solid";
import Center from "@components/Utilities/Center";
import Input from "@components/Elements/Input";
import Util from "@util/index";

const RegisterPage: NextPageWithConfiguration = () => {
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    function savePassword() {
        return (ev: ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value);
    };
    function validatePassword() {
        return (ev: ChangeEvent<HTMLInputElement>) => setConfirmedPassword(ev.target.value);
    };
    function onSubmit() {
        return (ev: FormEvent<HTMLFormElement>) => {
            if (password != confirmedPassword) {
                ev.preventDefault();
                Util.toast.error("Confirmed password does not match with password!");
            };
        };
    };
    return (
        <Center className="min-h-full p-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form onSubmit={onSubmit()} className="mt-8 space-y-6" action="/api/user/register" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px font-coc-description">
                        <Input name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg rounded-t-md" placeholder="Username"/>
                        <Input name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="E-Mail"/>
                        <Input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Password" onChange={savePassword()}/>
                        <Input id="confirmpassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg rounded-b-md" placeholder="Confirm Password" onChange={validatePassword()}/>
                    </div>
                    <Center className="justify-between">
                        <div className="flex items-center">
                            <div className="ml-2 block text-sm text-gray-900"> Have an account? </div>
                        </div>
                        <div className="text-sm">
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign In </Link>
                        </div>
                    </Center>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                            </span>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </Center>
    );
};

RegisterPage.title = "Sign Up";
RegisterPage.description = "Create an account to save and manage your data!";
RegisterPage.noAuthenticationRequired = true;

export default RegisterPage;