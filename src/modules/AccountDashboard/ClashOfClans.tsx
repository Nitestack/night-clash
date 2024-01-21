import type { FC } from "react";
import type { ClashOfClansClanProfile, ClashOfClansPlayerProfile } from "@graphql/types";
import Util from "@util/index";
import Header from "@modules/AccountDashboard/Header";
import Body from "@modules/AccountDashboard/Body";
import Grid from "@components/Utilities/Grid";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";
import Center from "@components/Utilities/Center";

const AccountClashOfClansData: FC<{ 
    clans: Array<ClashOfClansClanProfile>, 
    players: Array<ClashOfClansPlayerProfile>,
    villages: Array<ClashOfClansPlayerProfile>,
}> = ({ clans, players, villages }) => {
    return (
        <>
            <Header header="Clash of Clans" description="Manage saved villages, players and clans"/>
            <Body categories={{
                "Upgrade Tracker": {
                    content: 
                        <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                            {villages.map((village) => 
                            <Link key={village.tag} target="_blank" href={`/upgrade-tracker/clashofclans/${village.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500 w-full">
                                    <Center>
                                        <img className="w-12" src={Util.CocUpgradeTracker.getTownHallImage(village.townHallLevel, village.townHallWeaponLevel)}/>
                                        <div>
                                            <p>{village.name}</p>
                                            <span>{village.tag}</span>
                                        </div>
                                    </Center>
                                </Button>
                            </Link>)}
                        </Grid>
                },
                "Saved Players": {
                    content: 
                        <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                            {players.map((village) => 
                            <Link key={village.tag} target="_blank" href={`/stats-tracker/clashofclans/players/${village.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500 w-full">
                                    <Center>
                                        <img className="w-12" src={Util.CocUpgradeTracker.getTownHallImage(village.townHallLevel, village.townHallWeaponLevel)}/>
                                        <div>
                                            <p>{village.name}</p>
                                            <span>{village.tag}</span>
                                        </div>
                                    </Center>
                                </Button>
                            </Link>)}
                        </Grid>
                },
                "Saved Clans": {
                    content: 
                        <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                            {clans.map((clan) => 
                            <Link key={clan.tag} target="_blank" href={`/stats-tracker/clashofclans/clans/${clan.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500">
                                    <Center>
                                        <img className="w-12" src={clan.iconUrl}/>
                                        <div>
                                            <p>{clan.name}</p>
                                            <span>{clan.tag}</span>
                                        </div>
                                    </Center>
                                </Button>
                            </Link>)}
                        </Grid>
                }
            }}/>
        </>
    );
};
export default AccountClashOfClansData;