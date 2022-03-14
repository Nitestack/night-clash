import type { NextPageWithConfiguration } from "@util/types";
import type { ChangeEvent } from "react";
import { useState } from "react";
import Link from "@components/Elements/Link";
import { LockClosedIcon } from "@heroicons/react/solid";
import Center from "@components/Utilities/Center";

const RegisterPage: NextPageWithConfiguration = () => {
    const [state, setState] = useState<{ password: string, errorMessage: string }>({ password: "", errorMessage: "" });
    function onConfirm(ev: ChangeEvent<HTMLInputElement>) {
        if (!ev.target.value || ev.target.value == "") return;
        const confirmedPassword = ev.target.value;
        if (!state.password || state.password == "") setState({ ...state, errorMessage: "Please enter a password first before confirming!" });
        else if (state.password != confirmedPassword) setState({ ...state, errorMessage: "Password doesn't match!" });
        else setState({ ...state, errorMessage: "" });
    };
    function savePassword() {
        return (ev: ChangeEvent<HTMLInputElement>) => setState({ ...state, password: ev.target.value });
    };
    function validatePassword() {
        return (ev: ChangeEvent<HTMLInputElement>) => onConfirm(ev);
    };
    return (
        <Center className="min-h-full p-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" action="/api/auth/register" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px font-coc-description">
                        <div>
                            <input name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg rounded-t-md" placeholder="Username"/>
                        </div>
                        <div>
                            <input name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="E-Mail"></input>
                        </div>
                        <div>
                            <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Password" onChange={savePassword()}/>
                        </div>
                        <div>
                            <input id="confirmpassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg rounded-b-md" placeholder="Confirm Password" onChange={validatePassword()}></input>
                            <p className="font-coc-description text-red-600 mt-2 text-lg text-center">{state.errorMessage}</p>
                        </div>
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