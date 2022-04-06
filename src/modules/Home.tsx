import type { FC } from "react";
import Util from "@util/index";
import Center from "@components/Utilities/Center";

const Home: FC = () => {
    const { features } = Util.Constants;
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
export default Home;