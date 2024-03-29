import type { ComponentProps, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, AdjustmentsIcon, InformationCircleIcon } from "@heroicons/react/outline";
import NavbarLink from "@components/Layout/Navbar/NavbarLink";
import NavbarPopover from "@components/Layout/Navbar/NavbarPopover";
import NavbarAccount from "@components/Layout/Navbar/NavbarAccount";
import NavbarHeader from "@components/Layout/Navbar/NavbarHeader";
import { Fragment } from "react";
import NavbarToggler from "@components/Layout/Navbar/NavbarToggler";
import Motion from "@components/Utilities/Motion";
import Center from "@components/Utilities/Center";

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
        <Popover className="z-40 sticky bg-lightmodeprimary dark:bg-darkmodeprimary border-b-2 border-primary transition-[1.4s] top-0">
            <div className="px-4 lg:px-2 xl:px-6">
                <Center className="justify-between py-6 lg:justify-center lg:space-x-1">
                    <Center className="justify-start lg:w-0 lg:flex-1">
                        <NavbarHeader/>
                        <Popover.Group as="nav" className="hidden lg:flex">
                            <NavbarPopover categoryName="Upgrade Tracker" subCategories={upgradeTrackers}/>
                            <NavbarPopover categoryName="Stats Tracker" subCategories={statsTrackers}/>
                            <NavbarPopover categoryName="Tools" subCategories={tools}/>
                        </Popover.Group>
                        <NavbarAccount isMobile={false}/>
                    </Center>
                    {/*DESKTOP SCREEN*/}
                    <NavbarToggler/>
                    {/*Mobile Dropdown Icon*/}
                    <div className="-mr-2 -my-2 lg:hidden">
                        <Motion>
                            <Popover.Button className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-lightmodetext dark:text-darkmodetext focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </Motion>
                    </div>
                </Center>
            </div>
            {/*MOBILE SCREEN*/}
            <Transition as={Fragment} enter="duration-200 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-50 lg:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-lightmodeprimary dark:bg-darkmodeprimary divide-y-2 divide-lightmodetext dark:divide-darkmodetext">
                        <div className="pt-5 pb-6 px-5">
                            <Center className="justify-between">
                                <div>
                                    <NavbarHeader/>
                                </div>
                                <Motion>
                                    <div className="-mr-2">
                                        <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-lightmodetext dark:text-darkmodetext focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                                            <XIcon className="h-6 w-6" aria-hidden="true"/>
                                        </Popover.Button>
                                    </div>
                                </Motion>
                            </Center>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                                <NavbarLink href="/upgrade-tracker"> Upgrade Tracker </NavbarLink>
                                <NavbarLink href="/stats-tracker"> Stats Tracker </NavbarLink>
                                <NavbarLink href="/tools"> Tools </NavbarLink>
                            </div>
                            <NavbarAccount isMobile/>
                            <div className="border-t border-lightmodetext dark:border-darkmodetext"></div>
                            <NavbarToggler isMobile/>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};
export default Navbar;