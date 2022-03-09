import Image from "next/image";
import Link from "@components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Util from "@util/index";
import { faDiscord, faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Center from "@components/Center";

const socialNetworks: Array<{
    name: string,
    icon: IconProp
}> = [{
    name: "Discord",
    //@ts-ignore
    icon: faDiscord
}, {
    name: "Twitter",
    //@ts-ignore
    icon: faTwitter
}, {
    name: "Facebook",
    //@ts-ignore
    icon: faFacebook
}, {
    name: "Instagram",
    //@ts-ignore
    icon: faInstagram
}];
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
                                        <FontAwesomeIcon icon={item.icon}/>
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
                <p className="mt-6 text-xs lg:text-sm leading-none text-lightmodetext dark:text-darkmodetext">&copy; {new Date().getUTCFullYear()} {Util.Constants.websiteApplicationName}. All rights reserved.</p>
            </Center>
            <div className="coc-description py-8 px-3">
                <p className="text-lightmodetext dark:text-darkmodetext" align="center"> This website is not affiliated with, endorsed, sponsored, or specifically approved by Supercell. Supercell is not responsible for the operation or content of this site/application. Use of the trademarks and other intellectual property of Supercell is subject to Supercell&apos;s Fan Kit Agreement. </p>
                <p className="text-lightmodetext dark:text-darkmodetext" align="center"> 
                For more information about Supercell, please visit their website 
                <Link rel="noreferrer" disablemotion="true" className="text-primary" href="https://supercell.com/" target="_blank"> here </Link>
                .
                </p>
            </div>
        </footer>
    );
};
export default Footer;