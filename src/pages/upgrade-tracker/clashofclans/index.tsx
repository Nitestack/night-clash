import Util from "@util/index";
import type { NextPageWithConfiguration } from "@util/types";
import Center from "@components/Center";

const CoCUpgradeTrackerPage: NextPageWithConfiguration = () => {
    return (
        <Center className="mx-auto container py-12 px-4 sm:px-6 2xl:px-0">
            <Center className="flex-col lg:flex-row space-y-6 lg:space-y-0">
                <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
                    <div>
                        <p className="text-3xl xl:text-4xl font-semibold leading-9 text-lightmodeprimary dark:text-darkmodeprimary">Keep your village on track</p>
                    </div>
                    <div className="mt-4 lg:w-4/5 xl:w-3/5">
                        <p className="text-xl font-coc-description leading-6 text-lightmodetext dark:text-darkmodetext">The upgrade tracker helps keeping track of your village. You&apos;ll see, when your next builder or the laboratory is available and what is left to upgrade for your Town Hall and Builder Hall level. Schedule your builders and your laboratory and get notified whether an upgrade has finished!</p>
                        <p className="text-xl font-coc-description leading-6 text-lightmodetext dark:text-darkmodetext mt-6">In order to get started you must have a {Util.Constants.websiteApplicationName} account to save the village!</p>
                    </div>
                </div>
                <Center className="flex-col sm:flex-row sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                    <div>
                        <img className="hidden lg:block" src="https://i.ibb.co/61TfVVW/olena-sergienko-gx-KL334b-UK4-unsplash-1.png" alt="sofa" />
                        <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/QvxmJjB/olena-sergienko-gx-KL334b-UK4-unsplash-1-1.png" alt="sofa" />
                    </div>
                    <Center className="flex-col space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-8">
                        <div>
                            <img className="hidden lg:block" src="https://i.ibb.co/1MY5P3y/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-1.png" alt="chairs" />
                            <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/r0rvcCh/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1.png" alt="chairs" />
                        </div>
                        <div>
                            <img className="hidden lg:block" src="https://i.ibb.co/9N7ZX2C/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1.png" alt="chairs" />
                            <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/0BFt400/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-2.png" alt="chairs" />
                        </div>
                    </Center>
                </Center>
            </Center>
        </Center>
    );
};
CoCUpgradeTrackerPage.title = "Upgrade Tracker - Clash of Clans";
CoCUpgradeTrackerPage.description = "Use the upgrade tracker to keep track of your village, access additional stats and more..."

export default CoCUpgradeTrackerPage;