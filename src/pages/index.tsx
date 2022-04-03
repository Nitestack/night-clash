import type { NextPageWithConfiguration } from "@util/types";
import type { ComponentProps } from "react";
import { AdjustmentsIcon, ChartBarIcon, CogIcon } from "@heroicons/react/outline";
import Center from "@components/Utilities/Center";
import Util from "@util/index";

const features: Array<{
    name: string,
    description: string,
    icon: (props: ComponentProps<"svg">) => JSX.Element
}> = [
    {
        name: "Upgrade Tracker",
        description: "Track your upgrades and keep track of your progress!",
        icon: AdjustmentsIcon,
    },
    {
        name: "Stats Tracker",
        description: "Track stats of a player, a clan or other various stats!",
        icon: ChartBarIcon,
    },
    {
        name: "Tools",
        description: "Utility tools to help you in game!",
        icon: CogIcon,
    }
];

const HomePage: NextPageWithConfiguration = () => {
    return (
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 rounded-md p-5 bg-lightmodeprimary dark:bg-darkmodeprimary">
            {features.map((feature) => (
                <div key={feature.name} className="relative">
                    <dt>
                        <Center className="absolute h-12 w-12 rounded-md bg-indigo-500 text-white">
                            <feature.icon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </Center>
                        <p className="ml-16 text-lg leading-6 font-medium text-lightmodetext dark:text-darkmodetext">
                            {feature.name}
                        </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-lightmodetext dark:text-darkmodetext">
                        {feature.description}
                    </dd>
                </div>
            ))}
        </dl>
    );
};

HomePage.title = "Home";
HomePage.description = `${Util.Constants.APPLICATION_NAME} ${Util.Constants.APPLICATION_DESCRIPTION}`;

export default HomePage;