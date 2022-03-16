import Image from "next/image";
import Link from "@components/Elements/Link";
import type { FC } from "react";
import Util from "@util/index";
import Center from "@components/Utilities/Center";

const links: Array<{
    name: string,
    href: string
}> = [
    {
        name: "Upgrade Tracker",
        href: "/upgrade-tracker"
    },
    {
        name: "Stats Tracker",
        href: "/stats-tracker"
    },
    {
        name: "Tools",
        href: "/tools"
    }
];

const socialNetworks: Array<{
    name: string
}> = [];

const Footer: FC = () => {
    return (
        <footer id="footer" className="relative dark:bg-darkmodeprimary bg-lightmodeprimary pt-24 mt-12">
            <div className=" border-t border-b border-lightmodetext dark:border-darkmodetext py-16">
                <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
                    <div className="lg:flex">
                        <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                            <div className="w-full lg:w-1/2 px-6">
                                <ul>
                                    {links.map((item, i) =>
                                    <li className="mt-6 first:mt-0" key={i}>
                                        <Link href={item.href} className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-lightmodetext dark:text-darkmodetext">
                                            {item.name}
                                        </Link>
                                    </li>)}
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li key="Privacy">
                                        <Link href="/privacy" className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-lightmodetext dark:text-darkmodetext">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="mt-6" key="Terms">
                                        <Link href="/terms" className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-lightmodetext dark:text-darkmodetext">
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex">
                            <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                                <div className="flex items-center mb-6">
                                    {socialNetworks.map((item, i) => 
                                    <Link rel="noreferrer" key={i} className="m-2 rounded-full p-2 bg-primary text-lightmodetext dark:text-darkmodetext focus:ring-2 focus:ring-primarycontrast" target="_blank" href={`/${item.name.replace(/ /g, "").toLowerCase()}`}>
                                        
                                    </Link>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Center className="py-8 flex-col border-b">
                <Link href="/">
                    <Image className="rounded-full bg-primary" src="/Images/profile.png" width="150" height="150"></Image>
                </Link>
                <p className="mt-6 text-xs lg:text-sm leading-none text-lightmodetext dark:text-darkmodetext">&copy; {new Date().getUTCFullYear()} {Util.Constants.APPLICATION_NAME}. All rights reserved.</p>
            </Center>
            <div className="font-coc-description py-8 px-3">
                <p className="text-lightmodetext dark:text-darkmodetext text-center"> This website is not affiliated with, endorsed, sponsored, or specifically approved by Supercell. Supercell is not responsible for the operation or content of this site/application. Use of the trademarks and other intellectual property of Supercell is subject to Supercell&apos;s Fan Kit Agreement. </p>
                <p className="text-lightmodetext dark:text-darkmodetext text-center"> 
                For more information about Supercell, please visit their website 
                <Link rel="noreferrer" disablemotion="true" className="text-primary" href="https://supercell.com/" target="_blank"> here </Link>
                .
                </p>
            </div>
        </footer>
    );
};
export default Footer;