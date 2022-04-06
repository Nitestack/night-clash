import { BrawlStarsPlayerProfile, BrawlStarsClubProfile } from "@database/Models/user";
import type { FC } from "react";
import Body from "@modules/AccountDashboard/Body";
import Header from "@modules/AccountDashboard/Header";
import Grid from "@components/Utilities/Grid";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";
import Center from "@components/Utilities/Center";

const AccountBrawlStarsData: FC<{ 
    players: Array<BrawlStarsPlayerProfile>,
    clubs: Array<BrawlStarsClubProfile>
}> = ({ players, clubs }) => {
    return (
        <>
            <Header 
            header="Brawl Stars" 
            description="Manage saved players and clubs"
            h3Props={{
                className: "font-bs text-2xl"
            }}
            pProps={{
                className: "font-bs text-xl"
            }}/>
            <Body categories={{
                "Saved Players": {
                    headerProps: {
                        className: "font-bs text-xl"
                    },
                    content: 
                        <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                            {players.map((player) => 
                            <Link key={player.tag} target="_blank" href={`/stats-tracker/brawlstars/players/${player.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500 w-full">
                                    <Center>
                                        <img className="w-12" src={`https://cdn.brawlstats.com/player-thumbnails/${player.iconId}.png`}/>
                                        <div>
                                            <p className="font-bs text-xl">{player.name}</p>
                                            <span className="font-bs text-xl">{player.tag}</span>
                                        </div>
                                    </Center>
                                </Button>
                            </Link>)}
                        </Grid>
                },
                "Saved Clans": {
                    headerProps: {
                        className: "font-bs text-xl"
                    },
                    content: 
                        <Grid className="sm:justify-items-center grid-cols-1 sm:grid-cols-2">
                            {clubs.map((club) => 
                            <Link key={club.tag} target="_blank" href={`/stats-tracker/brawlstars/clubs/${club.tag.replace(/#/g, "")}`}>
                                <Button className="bg-blue-500">
                                    <Center>
                                        <div>
                                            <p className="text-xl font-bs">{club.name}</p>
                                            <span className="text-xl font-bs">{club.tag}</span>
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
export default AccountBrawlStarsData;