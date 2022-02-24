import Accordion from "@components/Accordion";
import Center from "@components/Center";
import Link from "@components/Link";
import { NextPageWithConfiguration } from "@util/types";

const UpgradeTrackerPage: NextPageWithConfiguration = () => {
    return (
        <>
            <Accordion title="Clash of Clans">
                <Link className="h-56" disablemotion="true" href="/upgrade-tracker/clashofclans">
                    <Center>
                        <img className="h-56" src="/Images/Clash of Clans Background.png"/>
                    </Center>
                </Link>
            </Accordion>
            <Accordion title="Boom Beach">
                <Link className="h-56" disablemotion="true" href="/upgrade-tracker/boombeach">
                    <Center>
                        <img className="h-56" src="/Images/Boom Beach Background.png"/>
                    </Center>
                </Link>
            </Accordion>
        </>
    );
};
UpgradeTrackerPage.title = "Upgrade Tracker - Overview";
UpgradeTrackerPage.description = "Use the upgrade tracker to keep track of your village, access secret stats and more...";

export default UpgradeTrackerPage;