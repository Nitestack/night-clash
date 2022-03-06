import { ClashOfClansVillage } from "src/configuration/Database/Models/clashofclans";
import Util from "src/configuration/Util/index";
import { NextPageWithConfiguration } from "src/configuration/Util/types";
import Layout from "src/components/Layout";
import Link from "src/components/Link";
import Center from "src/components/Center";

const CocUpgradeTrackerPlayerPage: NextPageWithConfiguration<{}, {}, {
    playerSchema: ClashOfClansVillage & { _id: any }
}> = ({ data }) => {
    const { playerSchema } = data;
    const { player } = playerSchema;
    const { townHallLevel, builderHallLevel, townHallWeaponLevel, tag, name } = player;
    return (
        <Layout header={`${name} - Overview`} title={`${name} - Overview - Clash of Clans - Upgrade Tracker`} description="Choose a village to proceed using the upgrade tracker!">
            <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
                <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
                    <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                        <div className="flex flex-col justify-center text-center">
                            <h1 className="text-3xl lg:text-4xl font-semibold text-lightmodeprimary dark:text-darkmodeprimary">Town Hall</h1>
                            <Link className="text-lightmodetext dark:text-darkmodetext" href={`/upgrade-tracker/clashofclans/${tag.replace(/#/g, "")}/home`}>
                                <Center>
                                    <img className="w-36" src={Util.getTownHallImage(townHallLevel, townHallWeaponLevel)}/>
                                </Center>
                            </Link>
                        </div>
                    </div>
                    {builderHallLevel ? 
                    <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                        <div className="flex flex-col justify-center text-center">
                            <h1 className="text-3xl lg:text-4xl font-semibold text-lightmodeprimary dark:text-darkmodeprimary">Builder Hall</h1>
                            <Link className="text-lightmodetext dark:text-darkmodetext" href={`/upgrade-tracker/clashofclans/${tag.replace(/#/g, "")}/builder`}>
                                <Center>
                                    <img className="w-36" src={Util.getBuilderHallImage(builderHallLevel)}/>
                                </Center>
                            </Link>
                        </div>
                    </div> : undefined}
                </div>
            </div>
        </Layout>
    );
};

CocUpgradeTrackerPlayerPage.disableLayout = true;
CocUpgradeTrackerPlayerPage.authenticationRequired = true;
CocUpgradeTrackerPlayerPage.queryRequired = true;
CocUpgradeTrackerPlayerPage.afterAuthentication = function(session, router) {
    const playerTag = router.query.playerTag as string;
    //Ensures the player tag parameter was given
    if (!playerTag) {
        router.push("/upgrade-tracker/clashofclans");
        return false;
    };
};
CocUpgradeTrackerPlayerPage.fetchData = {
    url: "/api/upgrade-tracker/clashofclans/village",
    data: (data) => {
        return {
            playerTag: data.resolvedTag,
            user: data.user
        }
    },
    parseData: (router, user) => {
        return {
            resolvedTag: Util.validateTag(router.query.playerTag as string),
            user: user
        }
    },
    method: "post"
};
export default CocUpgradeTrackerPlayerPage;