import { APIClan, APIClanMember } from "clashofclans.js";
import { FC, useState } from "react";
import Container from "@components/Grid/Container";
import Row from "@components/Grid/Row";
import Column from "@components/Grid/Column";
import Tabs from "@components/Tabs";
import { faShare, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/Button";
import Util from "@util/index";
import ClashOfClansPlayerProfileStyles from "@modules/ClashOfClansPlayerProfile.module.scss";
import ClashOfClansAchievementStyles from "@modules/ClashOfClansAchievement.module.scss";

const ClashOfClansClanProfile: FC<{
    clan: APIClan;
    village: "home" | "builder";
}> = ({ clan, village }) => {
    const clanPerks = Util.CocUpgradeTracker.getClanPerks(clan.clanLevel);
    const [sortBy, setSortBy] = useState("Most Trophies");
    const [members, setMembers] = useState(clan.memberList);
    const sortMethods = ["Most Trophies", "Highest Town Hall", "By Role", "Most Troops Donated", "Moost Troops Received", "Highest XP Level"];
    if (village == "builder") sortMethods.splice(sortMethods.findIndex(method => method == "Highest Town Hall"), 1);
    function sortArray(sortType: string) {
        let compareFunction: (a: APIClanMember, b: APIClanMember) => number = (a, b) => {
            if (village == "home") return b.trophies - a.trophies;
            else return (b.versusTrophies || 0) - (a.versusTrophies || 0);
        };
        //By Role
        if (sortType == "By Role") compareFunction = (a, b) => (b.role == "leader" ? 4 : (b.role == "coLeader" ? 3 : (b.role == "admin" ? 2 : 1))) - (a.role == "leader" ? 4 : (a.role == "coLeader" ? 3 : (a.role == "admin" ? 2 : 1)));
        else if (sortType == "Most Troops Donated") compareFunction = (a, b) => b.donations - a.donations;
        else if (sortType == "Moost Troops Received") compareFunction = (a, b) => b.donationsReceived - a.donationsReceived;
        else if (sortType == "Highest XP Level") compareFunction = (a, b) => b.expLevel - a.expLevel;
        setSortBy(sortType);
        setMembers(members.sort(compareFunction));
    };
    return (
        <>
            <Tabs tabs={{
                "Info": (
                    <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-3">
                        <Column xs="2">
                            <img className="w-36" src={clan.badgeUrls.large}/>
                        </Column>
                        <Column className="pb-2">
                            <div className="mb-2">
                                <p className="p-0 font-bold text-[#FDFDCA]">{clan.name}</p>
                                <p className="p-0 text-white coc-description font-bold">{clan.tag}</p>
                                <p className="p-0 coc-description">{clan.description}</p>
                            </div>
                            <div className="inline-flex">
                                {clan.labels ? clan.labels.map((label) => 
                                <Button key={label.id} className="mr-1">
                                    <img className="w-12" title={label.name} src={label.iconUrls.small}/>
                                </Button>
                                ) : undefined}
                                <Button className="w-12"><FontAwesomeIcon icon={faShare} size="2x"/></Button>
                            </div>
                        </Column>
                        <Column className="coc-description">
                            <Container className="p-0">
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Clan War League </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="right">{clan.warLeague ? clan.warLeague.name : "Unranked"}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Total Points: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="right">{clan.clanPoints}<FontAwesomeIcon icon={faTrophy} color="yellow"/></p>
                                    </Column>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="right">{clan.clanVersusPoints}<FontAwesomeIcon icon={faTrophy} color="yellow"/></p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Clan Location: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.location ? clan.location.name : "Not Set"}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Chat Language </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.chatLanguage ? clan.chatLanguage : "Not Set"}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Type: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.type == "open" ? "Anyone can join" : (clan.type == "inviteOnly" ? "Invite only" : "Closed")}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Required Trophies: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.requiredTrophies}<FontAwesomeIcon icon={faTrophy} color="yellow"/></p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Required Town Hall level: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.requiredTownhallLevel}</p>
                                    </Column>
                                </Row>
                            </Container>
                        </Column>
                    </Row>
                ),
                "Stats": (
                    <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-3">
                        <Column>
                            <p className="p-0"> War Stats </p>
                            <Container className="coc-description">
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Wars Won </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.warWins}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Wars Lost </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.warLosses || "?"}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> War Ties: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.warTies || "?"}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> War Win Streak: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.warWinStreak}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Clan Leader: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="right">{clan.memberList.find(player => player.role == "leader")?.name}</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> War Frequency: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{
                                            clan.warFrequency == "always" ? "Always" : (
                                                clan.warFrequency == "lessThanOncePerWeek" ? "Rarely" : 
                                                (
                                                    clan.warFrequency == "moreThanOncePerWeek" ? "Twice a week" : 
                                                    (
                                                        clan.warFrequency == "oncePerWeek" ? "Once a week" : (
                                                            clan.warFrequency == "never" ? "Never" : "Not Set"
                                                        )
                                                    )
                                                )
                                            )
                                        }</p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Public War Log </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clan.isWarLogPublic ? "Yes" : "No"}</p>
                                    </Column>
                                </Row>
                            </Container>
                        </Column>
                        <Column>
                            <p className="p-0">Clan Perks</p>
                            <Container className="coc-description">
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Donation request wait time: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="right">{clanPerks.donationRequestWaitTime} minutes </p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Donation limit: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="right">{clanPerks.donationLimit[0]} troops, {clanPerks.donationLimit[1]} spells </p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Donation refund: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clanPerks.donationRefund}% cost </p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Donation upgrade: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clanPerks.donationUpgrade} levels </p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> Treasury extra storage: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clanPerks.treasuryExtraStorage}% </p>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <p className="p-0 whitespace-nowrap" align="left"> War bonus extra loot: </p>
                                    </Column>
                                    <Column>
                                        <p className="p-0" align="right">{clanPerks.warBonusExtraLoot}% </p>
                                    </Column>
                                </Row>
                            </Container>
                        </Column>
                    </Row>
                )
            }}/>
            <Row className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext px-1 py-3">
                <Column>
                    <div className="flex justify-start sm:justify-center items-center">
                        <p className="coc-description text-sm text-[#5D5E5A] p-0 mr-2 whitespace-nowrap"> {clan.members}/50 </p>
                        <Button onClick={() => {
                            sortArray(sortMethods[sortMethods.indexOf(sortBy) + 1] || sortMethods[0]);
                        }}><img className="w-6 h-6" src="/Images/Clash of Clans/Order.png"/></Button>
                        <p className="coc-description text-sm text-white p-0 ml-2 whitespace-nowrap">{sortBy}</p>
                    </div>
                    <Container className="p-0">
                        {members.map((member, i) => (
                            <Row key={i}>
                                <Column className="p-0">
                                    <ClashOfClansClanMember member={member} iterationIndex={i}/>
                                </Column>
                            </Row>
                        ))}
                    </Container>
                </Column>
            </Row>
        </>
    );
};

const ClashOfClansClanMember: FC<{
    member: APIClanMember,
    iterationIndex: number
}> = ({ member, iterationIndex }) => {
    const rank = iterationIndex + 1;
    return (
        <a href={`/stats-tracker/clashofclans/players/${member.tag.replace(/#/g, "")}`} target="_blank">
            <div className={`${ClashOfClansAchievementStyles.achievement} flex items-center justify-start mt-3 p-2 border border-solid border-[#EEEFED] rounded-md h-[60px]`}>
                <p className="p-0 mr-2">{rank}.</p>
                <div className={`${ClashOfClansPlayerProfileStyles.xp} my-2 mr-2`}>{member.expLevel}</div>
                <p className="p-0">{member.name}</p>
            </div>
        </a>
    );
};

export default ClashOfClansClanProfile;