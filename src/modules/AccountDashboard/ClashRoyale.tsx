import type { FC } from "react";
import type { ClashRoyaleClanProfile, ClashRoyalePlayerProfile } from "@graphql/types";
import Header from "@modules/AccountDashboard/Header";
import Body from "@modules/AccountDashboard/Body";
import Grid from "@components/Utilities/Grid";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";
import Center from "@components/Utilities/Center";
import XP from "@modules/XP";

const AccountClashRoyaleData: FC<{ 
    clans: Array<ClashRoyaleClanProfile>, 
    players: Array<ClashRoyalePlayerProfile>
}> = ({ clans, players }) => {
    return (
        <>
            <Header header="Clash Royale" description="Manage saved players and clans"/>
            <Body categories={{
                "Saved Players": {
                    content: 
                        <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                            {players.map((player) => 
                            <Link key={player.tag} target="_blank" href={`/stats-tracker/clashroyale/players/${player.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500 w-full">
                                    <Center>
                                        <XP cr expLevel={player.expLevel}/>
                                        <div>
                                            <p>{player.name}</p>
                                            <span>{player.tag}</span>
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
                            <Link key={clan.tag} target="_blank" href={`/stats-tracker/clashroyale/clans/${clan.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500">
                                    <Center>
                                        <img className="w-12" src={`https://cdn.statsroyale.com/images/badges/${clan.badgeId}.png`}/>
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
export default AccountClashRoyaleData;