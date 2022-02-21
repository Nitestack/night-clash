import { APIPlayer } from "clashofclans.js";
import { FC } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faTrophy, faStar } from "@fortawesome/free-solid-svg-icons";
import Util from "@util/index";
import Image from "next/image";
import Center from "@components/Center";

const ClashOfClansPlayerProfile: FC<{
    player: APIPlayer;
    village: "home" | "builder";
}> = ({ player, village }) => {
    return (
        <>
            <style jsx>{`
                /*XP*/
                .xp,
                .xp-cr,
                .xp-cr-max {
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    color: white;
                    text-align: center;
                    -webkit-text-stroke: 0;
                    font-weight: bold;
                }
                .xp {
                    background-image: url("/Images/Clash of Clans/xp.png");
                    background-size: cover;
                    height: 60px;
                    width: 60px;
                    padding-top: 18.5px;
                    margin-left: 5px;
                }
                .legend-league {
                    background-image: url("/Images/Clash of Clans/${village == "home" ? "Home" : "Builder"}/Legend League.png");
                    background-size: cover;
                    height: 60px;
                    width: 60px;
                    padding-top: 16px;
                    font-size: 1vw;
                }
                .legend-league.small {
                    height: 45px;
                    width: 45px;
                    padding-top: 11px;
                }
            `}</style>
            <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-3">
                <Col>
                    <Container className="p-0">
                        <Row>
                            <div className="xp text-sm">{player.expLevel}</div>
                            <Col className="p-0">
                                <p className="p-0 font-bold">{player.name}</p>
                                <p className="p-0 text-[#BBBBBD] coc-description font-bold">{player.tag}</p>
                                {player.role ? <p className=" p-0 coc-description">{Util.CocUpgradeTracker.convertClanRole(player.role)}</p> : undefined}
                            </Col>
                        </Row>
                    </Container>
                    <div className="inline-flex">
                        {player.labels ? player.labels.map((label) => 
                        <Image key={label.id} title={label.name} src={label.iconUrls.small} height="50px" width="50px"/>
                        ) : undefined}
                        <Col><Button><FontAwesomeIcon icon={faShare}/></Button></Col>
                    </div>
                </Col>
                <Col>
                    <p className={"p-0" + player.clan ? "text-lightmodetext dark:text-darkmodetext font-bold" : "text-[#FFFFCC]"} align="center">{player.clan ? player.clan.name : "No Clan"}</p>
                    <Center>
                        <Image src={player.clan ? player.clan.badgeUrls.medium : "/Images/Clash of Clans/Home/no-clan.png"} height="150px" width="150px"/>
                    </Center>
                </Col>
                {<Col>
                    <Container className="p-0">
                        <Row>
                            <Col className="p-0">
                                <img className="h-24" src={village == "home" ? 
                                (player.league ? player.league.iconUrls.medium : "/Images/Clash of Clans/Home/no-league.png") : 
                                "/Images/Clash of Clans/Builder/Builder League.png"}/>   
                            </Col>
                            <Col className="mt-2">
                                {village == "home" ? <span className="text-sm">{player.league ? player.league.name : "Unranked"}</span> : undefined}
                                <p className="text-lg font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.trophies : player.versusTrophies}</p>
                            </Col>
                        </Row>
                    </Container>
                    <div>
                        <span className="coc-description text-sm">All time best:</span>
                        <p className="p-0 font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.bestTrophies : player.bestVersusTrophies}</p>
                    </div>
                    {village == "home" ? <div>
                        <span className="coc-description text-sm">War Stars Won:</span>
                        <p className="p-0 font-bold"><FontAwesomeIcon icon={faStar} color="white"/>{player.warStars}</p>
                    </div> : undefined}
                </Col>}
            </Row>
            <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-1">
                <Col>
                    <p className="p-0 coc-description">Troops donated:{" "}<p className="p-0 font-bold">{player.donations}</p></p>
                </Col>
                <Col>
                    <p className="p-0 coc-description">Troops received:{" "}<p className="p-0 font-bold">{player.donationsReceived}</p></p>
                </Col>
                {player.attackWins ? 
                <Col>
                    <p className="p-0 coc-description">Attacks Won:{" "}<p className="p-0 font-bold">{player.attackWins}</p></p>
                </Col> : undefined}
                {player.defenseWins ? 
                <Col>
                    <p className="p-0 coc-description">Defenses Won:{" "}<p className="p-0 font-bold">{player.defenseWins}</p></p>
                </Col> : undefined}
            </Row>
            {player.legendStatistics && ((village == "home" && player.legendStatistics.bestSeason) || (village == "builder" && player.legendStatistics.bestVersusSeason)) ? <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext px-3">
                <p className="p-0" align="center">{village == "home" ? "Legend League Tournament" : "Versus Battle Tournament"}</p>
                <Container className="p-0">
                    <Row>
                        <Col className="p-0">
                            <Container className="p-0">
                                <Row>
                                    <Col>
                                        <div className="legend-league">{village == "home" ? player.legendStatistics.bestSeason?.rank : player.legendStatistics.bestVersusSeason?.rank}</div>
                                    </Col>
                                    <Col>
                                        <p className="p-0 coc-description text-sm">Best: {Util.CocUpgradeTracker.getLeagueSeason(village == "home" ? player.legendStatistics.bestSeason : player.legendStatistics.bestVersusSeason)} Season</p>
                                        <p className="p-0 font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.legendStatistics.bestSeason?.trophies : player.legendStatistics.bestVersusSeason?.trophies}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-0">
                            <Container className="p-0">
                                <Row>
                                    <Col>
                                        <div className="legend-league small">{village == "home" ? player.legendStatistics.previousSeason?.rank : player.legendStatistics.previousVersusSeason?.rank}</div>
                                    </Col>
                                    <Col>
                                        <p className="p-0 coc-description text-sm">Previous: {Util.CocUpgradeTracker.getLeagueSeason(village == "home" ? player.legendStatistics.previousSeason : player.legendStatistics.previousVersusSeason)} Season</p>
                                        <p className="p-0 font-bold"><FontAwesomeIcon icon={faTrophy} color="yellow"/>{village == "home" ? player.legendStatistics.previousSeason?.trophies : player.legendStatistics.previousVersusSeason?.trophies}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
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