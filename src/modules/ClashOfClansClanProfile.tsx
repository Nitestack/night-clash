import { APIClan, APIClanMember } from "clashofclans.js";
import { FC, useState } from "react";
import Grid from "@components/Grid";
import Tabs from "@components/Tabs";
import { faShare, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/Button";
import Util from "@util/index";
import ClashOfClansPlayerProfileStyles from "@modules/ClashOfClansPlayerProfile.module.scss";
import ClashOfClansAchievementStyles from "@modules/ClashOfClansAchievement.module.scss";
import Tooltip from "@components/Tooltip";

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
                    <Grid className="grid-cols-1 lg:grid-cols-3 gap-1">
                        <div className="flex items-center justify-center">
                            <img className="w-36 md:w-52" src={clan.badgeUrls.large}/>
                        </div>
                        <div>
                            <div className="mb-2">
                                <p className=" font-bold text-[#FDFDCA]">{clan.name}</p>
                                <p className=" text-white coc-description font-bold">{clan.tag}</p>
                                <p className=" coc-description">{clan.description}</p>
                            </div>
                            <div className="flex items-center justify-start">
                                {clan.labels ? clan.labels.map((label) => 
                                <Tooltip className="mr-1" key={label.id} toolTipNode={label.name}>
                                    <Button className="p-0">
                                        <img className="w-12" title={label.name} src={label.iconUrls.small}/>
                                    </Button>
                                </Tooltip>
                                ) : undefined}
                                <Button className="w-12"><FontAwesomeIcon icon={faShare} size="2x"/></Button>
                            </div>
                        </div>
                        <Grid className="grid-cols-3 coc-description">
                            <p className="whitespace-nowrap" align="left"> Clan War League </p>
                            <p className="whitespace-nowrap col-span-2" align="right">{clan.warLeague ? clan.warLeague.name : "Unranked"}</p>
                            <p className="whitespace-nowrap" align="left"> Total Points: </p>
                            <p className="whitespace-nowrap" align="right">{clan.clanPoints}<FontAwesomeIcon icon={faTrophy} color="yellow"/></p>
                            <p className="whitespace-nowrap" align="right">{clan.clanVersusPoints}<FontAwesomeIcon icon={faTrophy} color="yellow"/></p>
                            <p className="whitespace-nowrap" align="left"> Clan Location: </p>
                            <p className="whitespace-nowrap col-span-2" align="right">{clan.location ? clan.location.name : "Not Set"}</p>
                            <p className="whitespace-nowrap" align="left"> Chat Language </p>
                            <p className="whitespace-nowrap col-span-2" align="right">{clan.chatLanguage ? clan.chatLanguage : "Not Set"}</p>
                            <p className="whitespace-nowrap" align="left"> Type: </p>
                            <p className="whitespace-nowrap col-span-2" align="right">{clan.type == "open" ? "Anyone can join" : (clan.type == "inviteOnly" ? "Invite only" : "Closed")}</p>
                            <p className="whitespace-nowrap" align="left"> Required Trophies: </p>
                            <p className="whitespace-nowrap col-span-2" align="right">{clan.requiredTrophies}<FontAwesomeIcon icon={faTrophy} color="yellow"/></p>
                            <p className="whitespace-nowrap" align="left"> Required Town Hall level: </p>
                            <p className="whitespace-nowrap col-span-2" align="right">{clan.requiredTownhallLevel}</p>
                        </Grid>
                    </Grid>
                ),
                "Stats": (
                    <div className="rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-3">
                        <div>
                            <p className=""> War Stats </p>
                            <Grid className="coc-description">
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Wars Won </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clan.warWins}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Wars Lost </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clan.warLosses || "?"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> War Ties: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clan.warTies || "?"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> War Win Streak: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clan.warWinStreak}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Clan Leader: </p>
                                    </div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="right">{clan.memberList.find(player => player.role == "leader")?.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> War Frequency: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{
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
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Public War Log </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clan.isWarLogPublic ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                        <div>
                            <p className="">Clan Perks</p>
                            <Grid className="coc-description">
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Donation request wait time: </p>
                                    </div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="right">{clanPerks.donationRequestWaitTime} minutes </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Donation limit: </p>
                                    </div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="right">{clanPerks.donationLimit[0]} troops, {clanPerks.donationLimit[1]} spells </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Donation refund: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clanPerks.donationRefund}% cost </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Donation upgrade: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clanPerks.donationUpgrade} levels </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> Treasury extra storage: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clanPerks.treasuryExtraStorage}% </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className=" whitespace-nowrap" align="left"> War bonus extra loot: </p>
                                    </div>
                                    <div>
                                        <p className="" align="right">{clanPerks.warBonusExtraLoot}% </p>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                )
            }}/>
            <div className="p-1">
                <Grid className="grid-cols-5 sm:grid-cols-2">
                    <div className="flex sm:justify-end items-center">
                        <p className="coc-description text-sm text-[#5D5E5A] mr-2 whitespace-nowrap"> {clan.members}/50 </p>
                    </div>
                    <div className="flex sm:justify-start items-center col-span-4 sm:col-span-1">
                        <Button className="bg-blue-500 w-7 h-7 p-0" onClick={() => {
                            sortArray(sortMethods[sortMethods.indexOf(sortBy) + 1] || sortMethods[0]);
                        }}><img className="w-6 h-6" src="/Images/Clash of Clans/Order.png"/></Button>
                        <p className="coc-description text-sm text-white ml-2 whitespace-nowrap">{sortBy}</p>
                    </div>
                </Grid>
                <Grid className="grid-cols-1">
                    {members.map((member, i) => (
                        <ClashOfClansClanMember member={member} iterationIndex={i}/>
                    ))}
                </Grid>
            </div>
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
            <Grid className={Util.classNames(ClashOfClansAchievementStyles.achievement, "grid-cols-1")}>
                <p className=" mr-2">{rank}.</p>
                <div className={ClashOfClansPlayerProfileStyles.xp}>{member.expLevel}</div>
                <p className="">{member.name}</p>
            </Grid>
        </a>
    );
};

export default ClashOfClansClanProfile;