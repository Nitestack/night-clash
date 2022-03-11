import Accordion from "@components/Accordion";
import Center from "@components/Center";
import Link from "@components/Link";
import type { NextPageWithConfiguration } from "@util/types";

const UpgradeTrackerPage: NextPageWithConfiguration = () => {
    return (
        <>
            <Accordion title="Clash of Clans">
                <Link className="h-56" disablemotion="true" href="/upgrade-tracker/clashofclans">
                    <Center>
                        <img className="w-[80vw]" src="/Images/Clash of Clans.png"/>
                    </Center>
                </Link>
            </Accordion>
            <Accordion title="Boom Beach">
                <Link className="h-56" disablemotion="true" href="/upgrade-tracker/boombeach">
                    <Center>
                        <img className="w-[80vw]" src="/Images/Boom Beach.png"/>
                    </Center>
                </Link>
            </Accordion>
        </>
    );
};
UpgradeTrackerPage.title = "Upgrade Tracker - Overview";
UpgradeTrackerPage.description = "Use the upgrade tracker to keep track of your village, access secret stats and more...";

export default UpgradeTrackerPage;