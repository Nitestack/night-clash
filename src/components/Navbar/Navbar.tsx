/* This example requires Tailwind CSS v2.0+ */
import { ComponentProps, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, AdjustmentsIcon, InformationCircleIcon } from "@heroicons/react/outline";
import NavbarLink from "@components/Navbar/NavbarLink";
import NavbarPopover from "@components/Navbar/NavbarPopover";
import NavbarAccount from "@components/Navbar/NavbarAccount";
import NavbarHeader from "@components/Navbar/NavbarHeader";
import { FC } from "react";
import NavbarToggler from "@components/Navbar/NavbarToggler";
import Motion from "@components/Motion";

const upgradeTrackers: Array<{
    name: string,
    description: string,
    href: string,
    icon: (props: ComponentProps<"svg">) => JSX.Element
}> = [
    {
        name: "Overview",
        description: "See what trackers are available and what they are used for!",
        href: "/upgrade-tracker",
        icon: InformationCircleIcon
    },
    {
        name: "Clash of Clans",
        description: "Keep track of your Clash of Clans villages, manage your builders and your laboratory and plan ahead!",
        href: "/upgrade-tracker/clashofclans",
        icon: AdjustmentsIcon,
    },
    {
        name: "Boom Beach",
        description: "Keep track of your Boom Beach island, manage your builder(s) and your armory and plan ahead!",
        href: "/upgrade-tracker/boombeach",
        icon: AdjustmentsIcon,
    }
];
const statsTrackers: Array<{
    name: string,
    description: string,
    href: string,
    icon: (props: ComponentProps<"svg">) => JSX.Element
}> = [
    {
        name: "Clash of Clans",
        description: "Get a players profile data or request clan data!",
        href: "/stats-tracker#clashofclans",
        icon: InformationCircleIcon
    },
    {
        name: "Clash Royale",
        description: "Get a players profile data or request clan data!",
        href: "/stats-tracker#clashroyale",
        icon: InformationCircleIcon
    },
    {
        name: "Brawl Stars",
        description: "Get a players profile data or request club data!",
        href: "/stats-tracker#brawlstars",
        icon: InformationCircleIcon
    },
    {
        name: "Clash Quest (Future Feature)",
        description: "Get a players profile data or request clan data!",
        href: "/stats-tracker#clashquest",
        icon: InformationCircleIcon
    },
    {
        name: "Clash Mini (Future Feature)",
        description: "Get a players profile data!",
        href: "/stats-tracker#clashmini",
        icon: InformationCircleIcon
    }
];

const tools: Array<{
    name: string,
    description: string,
    href: string,
    icon: (props: ComponentProps<"svg">) => JSX.Element
}> = [{
    name: "Army Maker",
    description: "Make your army and share it or directly save it in game!",
    href: "/tools/coc-army-maker",
    icon: AdjustmentsIcon
}];

const Navbar: FC = () => {
    return ( 
        <Popover id="navbar" className="z-50 sticky bg-lightmodeprimary dark:bg-darkmodeprimary border-b-2 border-primary transition-[1.4s] top-0">
            <div className="px-4 sm:px-6">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <NavbarHeader></NavbarHeader>
                    </div>
                    
                    {/*DESKTOP SCREEN*/}
                    <Popover.Group as="nav" className="hidden md:flex">
                        <NavbarPopover categoryName="Upgrade Tracker" subCategories={upgradeTrackers}></NavbarPopover>
                        <NavbarPopover categoryName="Stats Tracker" subCategories={statsTrackers}></NavbarPopover>
                        <NavbarPopover categoryName="Tools" subCategories={tools}></NavbarPopover>
                    </Popover.Group>
                    <NavbarAccount isMobile={false}></NavbarAccount>
                    <NavbarToggler></NavbarToggler>
                    {/*Mobile Dropdown Icon*/}
                    <Motion>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-lightmodetext dark:text-darkmodetext focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                    </Motion>
                </div>
            </div>
            {/*MOBILE SCREEN*/}
            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-50 md:hidden"
                >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-lightmodeprimary dark:bg-darkmodeprimary divide-y-2 divide-lightmodetext dark:divide-darkmodetext">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <NavbarHeader></NavbarHeader>
                                </div>
                                <Motion>
                                    <div className="-mr-2">
                                        <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-lightmodetext dark:text-darkmodetext focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                                            <XIcon className="h-6 w-6" aria-hidden="true"/>
                                        </Popover.Button>
                                    </div>
                                </Motion>
                            </div>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                                <NavbarLink href="/upgrade-tracker"> Upgrade Tracker </NavbarLink>
                                <NavbarLink href="/stats-tracker"> Stats Tracker </NavbarLink>
                                <NavbarLink href="/tools"> Tools </NavbarLink>
                            </div>
                            <NavbarAccount isMobile={true}></NavbarAccount>
                            <div className="border-t border-lightmodetext dark:border-darkmodetext"></div>
                            <NavbarToggler isMobile={true}></NavbarToggler>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};
export default Navbar;