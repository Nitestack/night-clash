import Util from "@util/index";
import { NextPageWithConfiguration } from "@util/types";

const BBUpgradeTrackerPage: NextPageWithConfiguration = () => {
    return (
        <div className="mx-auto container flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
                <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
                    <div>
                        <p className="text-3xl xl:text-4xl font-semibold leading-9 text-lightmodeprimary dark:text-darkmodeprimary">Keep your island on track</p>
                    </div>
                    <div className="mt-4 lg:w-4/5 xl:w-3/5">
                        <p className="text-xl coc-description leading-6 text-lightmodetext dark:text-darkmodetext">The upgrade tracker helps keeping track of your island. You'll see, when your builder(s) or the armory is available and what is left to upgrade for your Headquarters level. Schedule your builder(s) and your armory and get notified whether an upgrade has finished!</p>
                        <p className="text-xl coc-description leading-6 text-lightmodetext dark:text-darkmodetext mt-6">In order to get started you must have a {Util.Constants.websiteApplicationName} account to save the village!</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                    <div>
                        <img className="hidden lg:block" src="https://i.ibb.co/61TfVVW/olena-sergienko-gx-KL334b-UK4-unsplash-1.png" alt="sofa" />
                        <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/QvxmJjB/olena-sergienko-gx-KL334b-UK4-unsplash-1-1.png" alt="sofa" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-8">
                        <div>
                            <img className="hidden lg:block" src="https://i.ibb.co/1MY5P3y/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-1.png" alt="chairs" />
                            <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/r0rvcCh/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1.png" alt="chairs" />
                        </div>
                        <div>
                            <img className="hidden lg:block" src="https://i.ibb.co/9N7ZX2C/behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1.png" alt="chairs" />
                            <img className="w-80 sm:w-auto lg:hidden" src="https://i.ibb.co/0BFt400/nirzar-pangarkar-Csw-Kf-D546-Z8-unsplash-2.png" alt="chairs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
BBUpgradeTrackerPage.title = "Upgrade Tracker - Boom Beach";
BBUpgradeTrackerPage.description = "Use the upgrade tracker to keep track of your island, access additional stats and more..."

export default BBUpgradeTrackerPage;