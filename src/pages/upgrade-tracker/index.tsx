import Accordion from "@components/Accordion";
import Center from "@components/Utilities/Center";
import Link from "@components/Elements/Link";
import type { NextPageWithConfiguration } from "types";
import { useTitle, useDescription } from "@util/hooks";

const UpgradeTrackerPage: NextPageWithConfiguration = () => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    //Page info
    setTitle("Upgrade Tracker", true);
    setDescription("Track the progress of your upgrades!");
    return (
        <>
            <Accordion title="Clash of Clans">
                <Link
                    className="h-56"
                    disablemotion
                    href="/upgrade-tracker/clashofclans">
                    <Center>
                        <img
                            className="w-[80vw]"
                            src="/Images/Clash of Clans.png"
                        />
                    </Center>
                </Link>
            </Accordion>
            <Accordion title="Boom Beach">
                <Link
                    className="h-56"
                    disablemotion
                    href="/upgrade-tracker/boombeach">
                    <Center>
                        <img
                            className="w-[80vw]"
                            src="/Images/Boom Beach.png"
                        />
                    </Center>
                </Link>
            </Accordion>
        </>
    );
};

export default UpgradeTrackerPage;
