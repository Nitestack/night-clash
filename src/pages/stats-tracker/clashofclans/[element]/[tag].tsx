import ClashOfClansPlayerProfile from "@modules/ClashOfClansPlayerProfile";
import ClashOfClansOverview from "@modules/ClashOfClansOverview";
import Tabs from "@components/Tabs";
import ClashOfClansClanProfile from "@modules/ClashOfClansClanProfile";
import { useNextPageFetchData, useTitle, useDescription, useHeader } from "@util/hooks";
import type { ClashOfClansPlayer, ClashOfClansClan } from "@graphql/types";
import { useRouter } from "next/router";
import Util from "@util/index";

const ClashOfClansStatsTracker = useNextPageFetchData(({ data }) => {
    const router = useRouter();
    const player = router.query.element == "players" ? data as ClashOfClansPlayer : undefined;
    const clan = router.query.element == "clans" ? data as ClashOfClansClan : undefined;
    const stats = ["home", "builder"];
    if ((!location.hash || !stats.includes(location.hash.replace(/#/g, "")))&& player) location.hash = `#${stats[0]}`;
    if ((!location.hash || !["info", "stats"].includes(location.hash.replace(/#/g, "")))&& clan) location.hash = `#info`;
    const defaultIndex = stats.indexOf(location.hash.replace(/#/g, ""));
    
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    
    if (player) {
        setTitle(`${player.name} - Player - Clash of Clans - Stats Tracker`);
        setDescription(player.tag);
        setHeader(player.name);
        return (
            <Tabs 
                tabs={{
                    "Home Village": <>
                        <ClashOfClansPlayerProfile player={player} village="home"/>
                        <ClashOfClansOverview player={player} village="home"/>
                    </>,
                    "Builder Base": <>
                        <ClashOfClansPlayerProfile player={player} village="builder"/>
                        <ClashOfClansOverview player={player} village="builder"/>
                    </>
                }} 
                initialTabIndex={defaultIndex}
                onTabChange={(index) => location.hash = `#${stats[index]}`}
            />
        );
    } else if (clan) {
        setTitle(`${clan.name} - Clan - Clash of Clans - Stats Tracker`);
        setDescription(clan.tag);
        setHeader(clan.name);
        return (
            <ClashOfClansClanProfile clan={clan}/>
        );
    } else return (
        <></>
    );
}, {
    setKey: (router) => router.query.element == "players" ? "getClashOfClansPlayer" : "getClashOfClansClan",
    setQuery: (gql, router) => router.query.element == "players" ? gql`
        query($tag: String!) {
            getClashOfClansPlayer(tag: $tag) {
                name
                tag
                townHallLevel
                townHallWeaponLevel
                expLevel
                trophies
                bestTrophies
                warStars
                attackWins
                defenseWins
                builderHallLevel
                versusTrophies
                bestVersusTrophies
                versusBattleWins
                donations
                donationsReceived
                role
                warPreference
                clan {
                    tag
                    name
                    clanLevel
                    badgeUrls {
                        small
                        large
                        medium
                    }
                }
                league {
                    id
                    name
                    iconUrls {
                        small
                        tiny
                        medium
                    }
                }
                legendStatistics {
                    previousSeason {
                        id
                        rank
                        trophies
                    }
                    previousVersusSeason {
                        id
                        rank
                        trophies
                    }
                    bestVersusSeason {
                        id
                        rank
                        trophies
                    }
                    currentSeason {
                        id
                        rank
                        trophies
                    }
                    bestSeason {
                        id
                        rank
                        trophies
                    }
                    legendTrophies
                }
                achievements {
                    name
                    stars
                    value
                    target
                    info
                    completionInfo
                    village
                }
                troops {
                    name
                    level
                    maxLevel
                    superTroopIsActive
                    village
                }
                heroes {
                    name
                    level
                    maxLevel
                    superTroopIsActive
                    village
                }
                spells {
                    name
                    level
                    maxLevel
                    superTroopIsActive
                    village
                }
                labels {
                    id
                    name
                    iconUrls {
                        medium
                        small
                        tiny
                    }
                }
            }
        }
        ` : gql`
        query($tag: String!) {
            getClashOfClansClan(tag: $tag) {
                tag
                name
                type
                description
                clanLevel
                clanPoints
                clanVersusPoints
                requiredTrophies
                requiredTownhallLevel
                warFrequency
                warWinStreak
                warWins
                warTies
                warLosses
                isWarLogPublic
                members
                location {
                    localizedName
                    id
                    name
                    isCountry
                    countryCode
                }
                chatLanguage {
                    name
                    id
                    languageCode
                }
                badgeUrls {
                    small
                    large
                    medium
                }
                warLeague {
                    id
                    name
                }
                labels {
                    id
                    name
                    iconUrls {
                        small
                        tiny
                        medium
                    }
                }
                memberList {
                    name
                    tag
                    role
                    expLevel
                    league {
                        id
                        name
                        iconUrls {
                            medium
                            small
                            tiny
                        }
                    }
                    trophies
                    versusTrophies
                    clanRank
                    previousClanRank
                    donations
                    donationsReceived
                }
            }
        }
        `,
    setOptions: (router) => ({
        variables: {
            tag: Util.validateTag(router.query.tag as string)
        }
    })
});
ClashOfClansStatsTracker.afterAuthentication = (router, user) => {
    const playerTag = router.query.tag as string;
    const element = router.query.element as string;
    //Ensures the player tag parameter was given
    if (!playerTag) return router.push("/stats-tracker#clashofclans");
    //Ensures the element paramenter is given
    if (!element) return router.push("/stats-tracker#clashofclans");
    //Ensures element is either "players", "clans" or "clubs"
    if (!["players", "clans"].includes(element)) return router.push("/stats-tracker#clashofclans");
};

export default ClashOfClansStatsTracker;