import type { APIClan, APIClanMember } from "clashofclans.js";
import type { FC } from "react";
import { useState } from "react";
import Grid from "@components/Utilities/Grid";
import Tabs from "@components/Tabs";
import Button from "@components/Elements/Button";
import Util from "@util/index";
import ClashOfClansTrophyCount from "./ClashOfClansTrophyCount";
import ClashOfClansLabels from "./ClashOfClansLabels";
import Center from "@components/Utilities/Center";
import XP from "@modules/XP";

const ClashOfClansClanProfile: FC<{
    clan: APIClan;
}> = ({ clan }) => {
    const clanPerks = Util.CocUpgradeTracker.getClanPerks(clan.clanLevel);
    const stats = ["info", "stats"];
    const defaultIndex = stats.indexOf(location.hash.replace(/#/g, ""));
    function changeTab(index: number) {
        location.hash = `#${stats[index]}`;
    };
    return (
        <>
            <Tabs initialTabIndex={defaultIndex} onTabChange={(index) => changeTab(index)} tabs={{
                "Info": (
                    <Grid className="grid-cols-1 lg:grid-cols-5 gap-1">
                        <Center className="pb-2 lg:pb-0">
                            <img className="w-52" src={clan.badgeUrls.large}/>
                        </Center>
                        <div className="lg:col-span-2 pb-2 lg:pb-0">
                            <div className="mb-2">
                                <Center className="lg:justify-start">
                                    <p className="font-bold text-[#FDFDCA]">{clan.name}</p>
                                </Center>
                                <Center className="lg:justify-start">
                                    <p className="text-white font-coc-description font-bold">{clan.tag}</p>
                                </Center>
                                <Center className="lg:justify-start">
                                    <p className="font-coc-description">{clan.description}</p>
                                </Center>
                            </div>
                            <Center className="lg:justify-start">
                                <ClashOfClansLabels labels={clan.labels}/>
                            </Center>
                        </div>
                        <Grid className="lg:col-span-2 grid-cols-3 font-coc-description">
                            <p className="whitespace-nowrap text-left"> Clan War League </p>
                            <p className="whitespace-nowrap col-span-2 text-right">{clan.warLeague ? clan.warLeague.name : "Unranked"}</p>
                            <p className="whitespace-nowrap text-left"> Total Points: </p>
                            <ClashOfClansTrophyCount className="justify-end" trophyCount={clan.clanPoints}/>
                            <ClashOfClansTrophyCount className="justify-end" trophyCount={clan.clanVersusPoints} village="builder"/>
                            <p className="whitespace-nowrap text-left"> Clan Location: </p>
                            <p className="whitespace-nowrap col-span-2 text-right">{clan.location ? clan.location.name : "Not Set"}</p>
                            <p className="whitespace-nowrap text-left"> Chat Language </p>
                            <p className="whitespace-nowrap col-span-2 text-right">{clan.chatLanguage ? clan.chatLanguage : "Not Set"}</p>
                            <p className="whitespace-nowrap text-left"> Type: </p>
                            <p className="whitespace-nowrap col-span-2 text-right">{clan.type == "open" ? "Anyone can join" : (clan.type == "inviteOnly" ? "Invite only" : "Closed")}</p>
                            <p className="whitespace-nowrap text-left"> Required Trophies: </p>
                            <ClashOfClansTrophyCount className="justify-end col-span-2"trophyCount={clan.requiredTrophies}/>
                            <p className="whitespace-nowrap text-left"> Required Town Hall level: </p>
                            <p className="whitespace-nowrap col-span-2 text-right">{clan.requiredTownhallLevel}</p>
                        </Grid>
                    </Grid>
                ),
                "Stats": (
                    <Grid className="grid-cols-1 md:grid-cols-2 gap-2 rounded-md border-4 border-solid border-lightmodetext dark:border-darkmodetext p-3">
                        <div className="pb-2 md:pb-2">
                            <p> War Stats </p>
                            <Grid className="grid-cols-2 font-coc-description">
                                <p className="whitespace-nowrap text-left"> Wars Won </p>
                                <p className="text-right">{clan.warWins}</p>
                                <p className="whitespace-nowrap text-left"> Wars Lost </p>
                                <p className="text-right">{clan.warLosses || "?"}</p>
                                <p className="whitespace-nowrap text-left"> War Ties: </p>
                                <p className="text-right">{clan.warTies || "?"}</p>
                                <p className="whitespace-nowrap text-left"> War Win Streak: </p>
                                <p className="text-right">{clan.warWinStreak}</p>
                                <p className="whitespace-nowrap text-left"> Clan Leader: </p>
                                <p className="whitespace-nowrap text-right">{clan.memberList.find(player => player.role == "leader")?.name}</p>
                                <p className="whitespace-nowrap text-left"> War Frequency: </p>
                                <p className="text-right">{
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
                                <p className="whitespace-nowrap text-left"> Public War Log </p>
                                <p className="text-right">{clan.isWarLogPublic ? "Yes" : "No"}</p>
                            </Grid>
                        </div>
                        <div>
                            <p>Clan Perks</p>
                            <Grid className="grid-cols-2 font-coc-description">
                                <p className="whitespace-nowrap text-left"> Donation request wait time: </p>
                                <p className="whitespace-nowrap text-right">{clanPerks.donationRequestWaitTime} minutes </p>
                                <p className="whitespace-nowrap text-left"> Donation limit: </p>
                                <p className="whitespace-nowrap text-right">{clanPerks.donationLimit[0]} troops, {clanPerks.donationLimit[1]} spells </p>
                                <p className="whitespace-nowrap text-left"> Donation refund: </p>
                                <p className="text-right">{clanPerks.donationRefund}% cost </p>
                                <p className="whitespace-nowrap text-left"> Donation upgrade: </p>
                                <p className="text-right">{clanPerks.donationUpgrade} levels </p>
                                <p className="whitespace-nowrap text-left"> Treasury extra storage: </p>
                                <p className="text-right">{clanPerks.treasuryExtraStorage}% </p>
                                <p className="whitespace-nowrap text-left"> War bonus extra loot: </p>
                                <p className="text-right">{clanPerks.warBonusExtraLoot}% </p>
                            </Grid>
                        </div>
                    </Grid>
                )
            }}/>
            <Tabs tabs={{
                "Home Village": <ClashOfClansMemberList memberList={clan.memberList} village="home"/>,
                "Builder Base": <ClashOfClansMemberList memberList={clan.memberList} village="builder"/>
            }}/>
        </>
    );
};

const ClashOfClansMemberList: FC<{
    memberList: Array<APIClanMember>,
    village: "home" | "builder"
}> = ({ memberList, village }) => {
    const [members, setMembers] = useState(memberList);
    const [sortBy, setSortBy] = useState("Most Trophies");
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
    function onSortMethodChange() {
        return () => sortArray(sortMethods[sortMethods.indexOf(sortBy) + 1] || sortMethods[0]);
    };
    return (
        <div className="p-1">
            <Grid className="grid-cols-5 sm:grid-cols-2">
                <div className="flex sm:justify-end items-center">
                    <p className="font-coc-description text-sm text-[#5D5E5A] mr-2 whitespace-nowrap"> {members.length}/50 </p>
                </div>
                <div className="flex sm:justify-start items-center col-span-4 sm:col-span-1">
                    <Button className="bg-blue-500 w-7 h-7 p-0" onClick={onSortMethodChange}><img className="w-6 h-6" src="/Images/Clash of Clans/Order.png"/></Button>
                    <p className="font-coc-description text-sm text-white ml-2 whitespace-nowrap">{sortBy}</p>
                </div>
            </Grid>
            <Grid className="grid-cols-1">
                {memberList.map((member, i) => (
                    <ClashOfClansClanMember member={member} iterationIndex={i} key={i} village={village}/>
                ))}
            </Grid>
        </div>
    );
};

const ClashOfClansClanMember: FC<{
    member: APIClanMember,
    iterationIndex: number,
    village: "home" | "builder"
}> = ({ member, iterationIndex, village }) => {
    const rank = iterationIndex + 1;
    return (
        <a href={`/stats-tracker/clashofclans/players/${member.tag.replace(/#/g, "")}`} target="_blank">
            <Grid className={Util.classNames("bg-cocgraybackground mt-3 p-1 lg:p-2 border border-solid border-[#EEEFED] rounded-md min-h-[60px]", 
                village == "home" ? "grid-cols-8" : "grid-cols-12")}>
                <Center className="justify-self-center">
                    <p className="mr-2">{rank}.</p>
                </Center>
                <Center>
                    <XP expLevel={member.expLevel} className="justify-self-center"/>
                    {village == "home" ? <img className="w-14" src={member.league ? member.league.iconUrls.medium : "/Images/Clash of Clans/Home/no-league.png"}/> : undefined}
                </Center>
                <div className={Util.classNames("justify-self-left", village == "home" ? "col-span-2" : "col-span-4")}>
                    <p>{member.name}</p>
                    <p className="font-coc-description text-[#49463D]">{member.role == "member" ? "" : Util.CocUpgradeTracker.convertClanRole(member.role)}</p>
                </div>
                <Center className={Util.classNames("justify-between font-coc-description", village == "home" ? "col-span-2" : "col-span-4")}>
                    <div>
                        <span className="font-coc-description text-sm text-center text-[#6F6F6D]">Troops donated:</span>
                        <p className="bg-[#EEEFEA] rounded-md text-[#393939] text-center">{Util.numberWithSpaces(member.donations)}</p>
                    </div>
                    <div>
                        <span className="font-coc-description text-sm text-center text-[#6F6F6D]">Troops received:</span>
                        <p className="bg-[#EEEFEA] rounded-md text-[#393939] text-center">{Util.numberWithSpaces(member.donationsReceived)}</p>
                    </div>
                </Center>
                <Center className={Util.classNames("justify-self-end", village == "home" ? "" : "col-span-2")}>
                    <ClashOfClansTrophyCount trophyCountProps={{
                        className: "text-lg"
                    }} imgClassName="w-6" 
                    trophyCount={village == "home" ? member.trophies : member.versusTrophies}
                    village={village}/>
                </Center>
            </Grid>
        </a>
    );
};

export default ClashOfClansClanProfile;