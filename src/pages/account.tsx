import { NextPageWithConfiguration, UserSession } from "@util/types";
import { useSession } from "next-auth/react";
import Util from "@util/index";

const AccountPage: NextPageWithConfiguration = () => {
    const { data: session } = useSession() as { data: UserSession };
    return (
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"> Account Information </h3>
                    <p className="mt-1 max-w-2xl text-lg text-gray-500 font-coc-description"> Personal details and data. </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> Username </dt>
                            <dd className="mt-1 text-lg font-coc-description text-gray-900 sm:mt-0 sm:col-span-2"> {session.user?.username} </dd>
                        </div>
                        {session.user?.role == Util.Constants.ADMIN_ROLE_ID ? <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Role
                            </dt>
                            <dd className="mt-1 text-lg font-coc-description text-gray-900 sm:mt-0 sm:col-span-2"> Admin </dd>
                        </div> : undefined}
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500"> E-Mail Address </dt>
                            <dd className="mt-1 text-lg font-coc-description text-gray-900 sm:mt-0 sm:col-span-2"> {session.user?.email} </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
};

AccountPage.title = "Account";
AccountPage.header = "My Account";
AccountPage.description = "Access your saved data or edit your credentials!";
AccountPage.authenticationRequired = true;
AccountPage.returnUrl = "/account";

export default AccountPage;