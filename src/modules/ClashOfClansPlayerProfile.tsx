import { APIPlayer } from "clashofclans.js";
import { FC } from "react";
import Grid from "@components/Grid";
import Button from "@components/Button";
import Util from "@util/index";
import Image from "next/image";
import styles from "@modules/ClashOfClansPlayerProfile.module.scss";
import ClashOfClansTrophyCount from "./ClashOfClansTrophyCount";
import ClashOfClansLabels from "./ClashOfClansLabels";
import Center from "@components/Center";

const ClashOfClansPlayerProfile: FC<{
    player: APIPlayer;
    village: "home" | "builder";
}> = ({ player, village }) => {
    return (
        <>
            <Grid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1">
                <div className="pb-2 lg:pb-0">
                    <Center>
                        <div className={Util.classNames(styles.xp, "my-2 mr-2")}>{player.expLevel}</div>
                        <div>
                            <p className="font-bold">{player.name}</p>
                            <p className="text-[#BBBBBD] font-coc-description font-bold">{player.tag}</p>
                            {player.role ? <p className="p-0 font-coc-description">{Util.CocUpgradeTracker.convertClanRole(player.role)}</p> : undefined}
                        </div>
                    </Center>
                    <Center>
                        <ClashOfClansLabels labels={player.labels}/>
                    </Center>
                </div>
                <div className="pb-2 lg:pb-0">
                    <p className="whitespace-nowrap flex items-center justify-center mb-2 text-lightmodetext dark:text-darkmodetext font-bold text-center">{village == "home" ? "Town Hall" : "Builder Hall"} Level {village == "home" ? player.townHallLevel : player.builderHallLevel} {player.townHallWeaponLevel && village == "home" ? <span className="flex items-center justify-center"><img className="w-6" src="/Images/Clash of Clans/Achievement Star.png"/>{player.townHallWeaponLevel}</span> : undefined}</p>
                    <Center>
                        <img className="w-40" src={village == "home" ? Util.getTownHallImage(player.townHallLevel, player.townHallWeaponLevel) : Util.getBuilderHallImage(player.builderHallLevel)}/>
                    </Center>
                </div>
                <div className="pb-2 lg:pb-0">
                    <p className={Util.classNames(player.clan ? "text-lightmodetext dark:text-darkmodetext font-bold" : "text-[#FFFFCC]", "p-0 mb-2 text-center")}>{player.clan ? player.clan.name : "No Clan"}</p>
                    <Center>
                        <img className="w-40" src={player.clan ? player.clan.badgeUrls.medium : "/Images/Clash of Clans/Home/no-clan.png"}/>
                    </Center>
                    {player.warPreference ? 
                    <Center>
                        <Button disabled className={player.warPreference == "in" ? "bg-green-500" : "bg-red-600"}> Clan Wars </Button>
                    </Center> : undefined}
                    {player.clan ? 
                    <Center>
                        <a href={`/stats-tracker/clashofclans/clans/${player.clan.tag.replace(/#/g, "")}#home`} target="_blank">
                            <Button className="bg-green-500"> View Clan </Button>
                        </a>
                    </Center> : undefined}
                </div>
                <div className="pb-2 lg:pb-0">
                    <Grid className="grid-rows-4">
                        <Center className="row-span-2">
                            <img className="w-36" src={village == "home" ? (player.league ? player.league.iconUrls.medium : "/Images/Clash of Clans/Home/no-league.png") : "/Images/Clash of Clans/Builder/Builder League.png"}/>   
                            <div>
                                {village == "home" ? <span className="text-xs whitespace-nowrap">{player.league ? player.league.name : "Unranked"}</span> : undefined}
                                <ClashOfClansTrophyCount className="text-xl font-bold" trophyCount={village == "home" ? player.trophies : player.versusTrophies} village={village}/>
                            </div>
                        </Center>
                        <Center>
                            <div>
                                <span className="font-coc-description text-sm text-center">All time best:</span>
                                <ClashOfClansTrophyCount cursed className={Util.classNames(styles["text-bg"], "font-bold justify-center")} trophyCount={village == "home" ? player.bestTrophies : player.bestVersusTrophies} village={village}/>
                            </div>
                        </Center>
                        {village == "home" ? <Center>
                            <div>
                                <span className="font-coc-description text-sm text-center">War Stars Won:</span>
                                <Grid className={Util.classNames(styles["text-bg"], "grid-cols-3")}>
                                    <img className="w-6 text-left" src="/Images/Clash of Clans/star.png"/>
                                    <p className="font-bold col-span-2">{player.warStars}</p>
                                </Grid>
                            </div>
                        </Center> : undefined}
                    </Grid>
                </div>
            </Grid>
            <Grid className={Util.classNames("grid-cols-1 rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-1", player.donationsReceived >= 100000 || player.donations >= 100000 ? "md:grid-cols-3" : "md:grid-cols-5")}>
                <Center className="md:justify-start">
                    <p className="font-coc-description whitespace-nowrap">Troops donated:{" "}<span className={Util.classNames(styles["text-bg"], styles["text-bg-small"],"text-center font-bold p-1")}>{player.donations}</span></p>
                </Center>
                <Center className="md:justify-start">
                    <p className="font-coc-description whitespace-nowrap">Troops received:{" "}<span className={Util.classNames(styles["text-bg"], styles["text-bg-small"],"text-center font-bold p-1")}>{player.donationsReceived}</span></p>
                </Center>
                <Center className="md:justify-start">
                    <p className="font-coc-description whitespace-nowrap">Donation Ratio:{" "}<span className={Util.classNames(styles["text-bg"], styles["text-bg-small"],"text-center font-bold p-1")}>{player.donations > player.donationsReceived ? Math.round(player.donations / player.donationsReceived) : 1} : {player.donationsReceived > player.donations ? Math.round(player.donationsReceived / player.donations) : 1}</span></p>
                </Center>
                {player.attackWins && village == "home" ? 
                <Center className="md:justify-start">
                    <p className="font-coc-description whitespace-nowrap">Attacks Won:{" "}<span className={Util.classNames(styles["text-bg"], styles["text-bg-small"],"text-center font-bold p-1")}>{player.attackWins || 0}</span></p>
                </Center> : undefined}
                {player.defenseWins && village == "home" ? 
                <Center className="md:justify-start">
                    <p className="font-coc-description whitespace-nowrap">Defenses Won:{" "}<span className={Util.classNames(styles["text-bg"], styles["text-bg-small"],"text-center font-bold p-1")}>{player.defenseWins || 0}</span></p>
                </Center> : undefined}
                {village == "builder" ? 
                <Center className="md:justify-start">
                    <p className="font-coc-description whitespace-nowrap">Versus Battle Wins:{" "}<span className={Util.classNames(styles["text-bg"], styles["text-bg-small"],"text-center font-bold p-1")}>{player.versusBattleWins}</span></p>
                </Center> : undefined}
            </Grid>
            {player.legendStatistics && ((village == "home" && player.legendStatistics.bestSeason) || (village == "builder" && player.legendStatistics.bestVersusSeason)) ? <div className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext px-3">
                <p className="text-center">{village == "home" ? "Legend League Tournament" : "Versus Battle Tournament"}</p>
                <Grid>
                    <div>
                        <div>
                            <Grid>
                                <div>
                                    <div>
                                        <div className={Util.classNames(styles["legend-league"], village == "home" ? styles["legend-league-home"] : styles["legend-league-builder"])}>{village == "home" ? player.legendStatistics.bestSeason?.rank : player.legendStatistics.bestVersusSeason?.rank}</div>
                                    </div>
                                    <div>
                                        <p className="font-coc-description text-sm">Best: {Util.CocUpgradeTracker.getLeagueSeason(village == "home" ? player.legendStatistics.bestSeason : player.legendStatistics.bestVersusSeason)} Season</p>
                                        <ClashOfClansTrophyCount className="font-bold" village={village} trophyCount={village == "home" ? player.legendStatistics.bestSeason?.trophies : player.legendStatistics.bestVersusSeason?.trophies}/>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Grid>
                                <div>
                                    <div>
                                        <div className="legend-league small">{village == "home" ? player.legendStatistics.previousSeason?.rank : player.legendStatistics.previousVersusSeason?.rank}</div>
                                    </div>
                                    <div>
                                        <p className="font-coc-description text-sm">Previous: {Util.CocUpgradeTracker.getLeagueSeason(village == "home" ? player.legendStatistics.previousSeason : player.legendStatistics.previousVersusSeason)} Season</p>
                                        <ClashOfClansTrophyCount className="font-bold justify-center" village={village} trophyCount={village == "home" ? player.legendStatistics.previousSeason?.trophies : player.legendStatistics.previousVersusSeason?.trophies}/>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                    {village == "home" ? <div>
                        <p className="font-coc-description text-sm">{village == "home" ? "Legend Trophies" : "Prestige"}</p>
                        <p className="font-bold"><Image height="40px" width="40px" src="/Images/Clash of Clans/Home/Legend Trophies.png"/>{player.legendStatistics.legendTrophies}</p>
                    </div> : undefined}
                </Grid>
            </div> : undefined}
        </>
    );
};
export default ClashOfClansPlayerProfile;