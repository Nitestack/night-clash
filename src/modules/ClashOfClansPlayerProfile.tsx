import { APIPlayer } from "clashofclans.js";
import { FC } from "react";
import Container from "@components/Grid/Container";
import Row from "@components/Grid/Row";
import Column from "@components/Grid/Column";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faTrophy, faStar } from "@fortawesome/free-solid-svg-icons";
import Util from "@util/index";
import Image from "next/image";
import Center from "@components/Center";
import styles from "@modules/ClashOfClansPlayerProfile.module.scss";

const ClashOfClansPlayerProfile: FC<{
    player: APIPlayer;
    village: "home" | "builder";
}> = ({ player, village }) => {
    return (
        <>
            <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-3">
                <Column className="pb-2">
                    <div className="inline-flex mb-3">
                        <div className={`${styles.xp} my-2 mr-2`}>{player.expLevel}</div>
                        <div>
                            <p className="p-0 font-bold">{player.name}</p>
                            <p className="p-0 text-[#BBBBBD] coc-description font-bold">{player.tag}</p>
                            {player.role ? <p className=" p-0 coc-description">{Util.CocUpgradeTracker.convertClanRole(player.role)}</p> : undefined}
                        </div>
                    </div>
                    <div className="inline-flex">
                        {player.labels ? player.labels.map((label) => 
                        <Button className="mr-1" key={label.id}>
                            <img className="w-12" title={label.name} src={label.iconUrls.small}/>
                        </Button>
                        ) : undefined}
                        <Button className="w-12"><FontAwesomeIcon icon={faShare} size="2x"/></Button>
                    </div>
                </Column>
                <Column className="pb-2">
                    <p className="whitespace-nowrap p-0 mb-2 text-lightmodetext dark:text-darkmodetext font-bold" align="center">{village == "home" ? "Town Hall" : "Builder Hall"} Level {village == "home" ? player.townHallLevel : player.builderHallLevel} {player.townHallWeaponLevel && village == "home" ? <span><FontAwesomeIcon icon={faStar} color="yellow"/>{player.townHallWeaponLevel}</span> : undefined}</p>
                    <Center>
                        <img className="w-36" src={village == "home" ? Util.getTownHallImage(player.townHallLevel, player.townHallWeaponLevel) : Util.getBuilderHallImage(player.builderHallLevel)}/>
                    </Center>
                </Column>
                <Column className="pb-2">
                    <p className={`p-0 mb-2 ${player.clan ? "text-lightmodetext dark:text-darkmodetext font-bold" : "text-[#FFFFCC]"}`} align="center">{player.clan ? player.clan.name : "No Clan"}</p>
                    <Center>
                        <img className="w-36" src={player.clan ? player.clan.badgeUrls.medium : "/Images/Clash of Clans/Home/no-clan.png"}/>    
                    </Center>
                    {player.warPreference ? 
                    <Center>
                        <Button disabled className={player.warPreference == "in" ? "bg-green-500" : "bg-red-600"}> Clan Wars </Button>
                    </Center> : undefined}
                    {player.clan ? 
                    <Center>
                        <a href={`/stats-tracker/clashofclans/clans/${player.clan.tag.replace(/#/g, "")}#home`} target="_blank">
                            <Button style={{ backgroundColor: "green" }}> View Clan </Button>
                        </a>
                    </Center> : undefined}
                </Column>
                {<Column>
                    <Center>
                        <div className="inline-flex">
                            <img className="w-24" src={village == "home" ? (player.league ? player.league.iconUrls.medium : "/Images/Clash of Clans/Home/no-league.png") : "/Images/Clash of Clans/Builder/Builder League.png"}/>   
                            <div className="mt-2">
                                {village == "home" ? <span className="text-xs whitespace-nowrap">{player.league ? player.league.name : "Unranked"}</span> : undefined}
                                <p className="text-lg font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.trophies : player.versusTrophies}</p>
                            </div>
                        </div>
                    </Center>
                    <Center>
                        <div>
                            <span className="coc-description text-sm">All time best:</span>
                            <p className={`${styles["text-bg"]} p-0 font-bold`} align="center"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.bestTrophies : player.bestVersusTrophies}</p>
                        </div>
                    </Center>
                    {village == "home" ? <Center>
                        <div>
                            <span className="coc-description text-sm">War Stars Won:</span>
                            <p className={`${styles["text-bg"]} p-0 font-bold`} align="center"><FontAwesomeIcon icon={faStar} color="white"/>{player.warStars}</p>
                        </div>
                    </Center> : undefined}
                </Column>}
            </Row>
            <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-1">
                <Column>
                    <p className="p-0 coc-description whitespace-nowrap">Troops donated:{" "}<span className={`text-center font-bold p-1 ${styles["text-bg"]} ${styles["text-bg-small"]}`}>{player.donations}</span></p>
                </Column>
                <Column>
                    <p className="p-0 coc-description whitespace-nowrap">Troops received:{" "}<span className={`text-center font-bold p-1 ${styles["text-bg"]} ${styles["text-bg-small"]}`}>{player.donationsReceived}</span></p>
                </Column>
                <Column>
                    <p className="p-0 coc-description whitespace-nowrap">Donation Ratio:{" "}<span className={`text-center font-bold p-1 ${styles["text-bg"]} ${styles["text-bg-small"]}`}>{player.donations > player.donationsReceived ? Math.round(player.donations / player.donationsReceived) : 1} : {player.donationsReceived > player.donations ? Math.round(player.donationsReceived / player.donations) : 1}</span></p>
                </Column>
                {player.attackWins && village == "home" ? 
                <Column>
                    <p className="p-0 coc-description whitespace-nowrap">Attacks Won:{" "}<span className={`text-center font-bold p-1 ${styles["text-bg"]} ${styles["text-bg-small"]}`}>{player.attackWins}</span></p>
                </Column> : undefined}
                {player.defenseWins && village == "home" ? 
                <Column>
                    <p className="p-0 coc-description whitespace-nowrap">Defenses Won:{" "}<span className={`text-center font-bold p-1 ${styles["text-bg"]} ${styles["text-bg-small"]}`}>{player.defenseWins}</span></p>
                </Column> : undefined}
                {village == "builder" ? 
                <Column>
                    <p className="p-0 coc-description whitespace-nowrap">Versus Battle Wins:{" "}<span className={`text-center font-bold p-1 ${styles["text-bg"]} ${styles["text-bg-small"]}`}>{player.versusBattleWins}</span></p>
                </Column> : undefined}
            </Row>
            {player.legendStatistics && ((village == "home" && player.legendStatistics.bestSeason) || (village == "builder" && player.legendStatistics.bestVersusSeason)) ? <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext px-3">
                <p className="p-0" align="center">{village == "home" ? "Legend League Tournament" : "Versus Battle Tournament"}</p>
                <Container className="p-0">
                    <Row>
                        <Column>
                            <Container className="p-0">
                                <Row>
                                    <Column>
                                        <div className={`${styles["legend-league"]} ${village == "home" ? styles["legend-league-home"] : styles["legend-league-builder"]}`}>{village == "home" ? player.legendStatistics.bestSeason?.rank : player.legendStatistics.bestVersusSeason?.rank}</div>
                                    </Column>
                                    <Column>
                                        <p className="p-0 coc-description text-sm">Best: {Util.CocUpgradeTracker.getLeagueSeason(village == "home" ? player.legendStatistics.bestSeason : player.legendStatistics.bestVersusSeason)} Season</p>
                                        <p className="p-0 font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.legendStatistics.bestSeason?.trophies : player.legendStatistics.bestVersusSeason?.trophies}</p>
                                    </Column>
                                </Row>
                            </Container>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Container className="p-0">
                                <Row>
                                    <Column>
                                        <div className="legend-league small">{village == "home" ? player.legendStatistics.previousSeason?.rank : player.legendStatistics.previousVersusSeason?.rank}</div>
                                    </Column>
                                    <Column>
                                        <p className="p-0 coc-description text-sm">Previous: {Util.CocUpgradeTracker.getLeagueSeason(village == "home" ? player.legendStatistics.previousSeason : player.legendStatistics.previousVersusSeason)} Season</p>
                                        <p className="p-0 font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.legendStatistics.previousSeason?.trophies : player.legendStatistics.previousVersusSeason?.trophies}</p>
                                    </Column>
                                </Row>
                            </Container>
                        </Column>
                    </Row>
                    {village == "home" ? <Row>
                        <p className="p-0 coc-description text-sm">{village == "home" ? "Legend Trophies" : "Prestige"}</p>
                        <p className="p-0 font-bold"><Image height="40px" width="40px" src="/Images/Clash of Clans/Home/Legend Trophies.png"/>{player.legendStatistics.legendTrophies}</p>
                    </Row> : undefined}
                </Container>
            </Row> : undefined}
        </>
    );
};
export default ClashOfClansPlayerProfile;