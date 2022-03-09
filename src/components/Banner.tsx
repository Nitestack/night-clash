import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import Link from "@components/Link";
import { FC } from "react";
import Center from "@components/Center";

const Banner: FC<{
    desktopText: string;
    mobileText: string;
    href: string;
}> = ({ desktopText, mobileText, href }) => {
    return (
        <div className="bg-primary">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <Center className="justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                        <span className="flex p-2 rounded-lg bg-indigo-800">
                            <SpeakerphoneIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </span>
                        <p className="ml-3 font-medium text-white truncate">
                            <span className="md:hidden"> {mobileText} </span>
                            <span className="hidden md:inline"> {desktopText} </span>
                        </p>
                    </div>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                        <Link href={href} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"> Learn More </Link>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                            <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                        </button>
                    </div>
                </Center>
            </div>
        </div>
    );
};
export default Banner;