import Tabs from "@components/Tabs";
import { useNextPageFetchData, useTitle, useDescription, useHeader } from "@util/hooks";
import type { ClashRoyalePlayer, ClashRoyaleClan } from "@graphql/types";
import { useRouter } from "next/router";
import Util from "@util/index";
import ClashRoyaleUpcomingChests from "@modules/ClashRoyaleUpcomingChests";

const ClashRoyaleStatsTracker = useNextPageFetchData(({ data }) => {
    const router = useRouter();
    const player = router.query.element == "players" ? data as ClashRoyalePlayer : undefined;
    const clan = router.query.element == "clans" ? data as ClashRoyaleClan : undefined;
    const playerStats = ["info", "upcomingchests", "battlelog"];
    const clanStats = ["info" , "war", "pastwars"];
    if ((!location.hash || !playerStats.includes(location.hash.replace(/#/g, "")))&& player) location.hash = `#${playerStats[0]}`;
    if ((!location.hash || !clanStats.includes(location.hash.replace(/#/g, ""))) && clan) location.hash = `#${clanStats[0]}`;
    const defaultIndex = (player ? playerStats : clanStats).indexOf(location.hash.replace(/#/g, ""));
    
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    
    if (player) {
        setTitle(`${player.name} - Player - Clash Royale - Stats Tracker`);
        setDescription(player.tag);
        setHeader(player.name);
        return (
            <Tabs 
                tabs={{
                    "Info": <></>,
                    "Upcoming Chests": <ClashRoyaleUpcomingChests chests={player.upcomingChests}/>,
                    "Battle Log": <></>
                }} 
                initialTabIndex={defaultIndex}
                onTabChange={(index) => location.hash = `#${playerStats[index]}`}
            />
        );
    } else if (clan) {
        setTitle(`${clan.name} - Clan - Clash Royale - Stats Tracker`);
        setDescription(clan.tag);
        setHeader(clan.name);
        return (
            <Tabs
                tabs={{
                    "Info": <></>,
                    "War": <></>,
                    "Past Wars": <></>
                }}
            />
        );
    } else return (
        <></>
    );
}, {
    setKey: (router) => router.query.element == "players" ? "getClashRoyalePlayer" : "getClashRoyaleClan",
    setQuery: (gql, router) => router.query.element == "players" ? gql`
        query($tag: String!) {
            getClashRoyalePlayer(tag: $tag) {
                role
                wins
                losses
                totalDonations
                tag
                name
                expLevel
                trophies
                bestTrophies
                donations
                donationsReceived
                achievements {
                    completionInfo
                    info
                    name
                    stars
                    target
                    value
                }
                battleCount
                threeCrownWins
                challengeCardsWon
                challengeMaxWins
                tournamentCardsWon
                tournamentBattleCount
                warDayWins
                clanCardsCollected
                starPoints
                expPoints
                clan {
                    badgeId
                    tag
                    name
                }
                arena {
                    id
                    name
                }
                leagueStatistics {
                    currentSeason {
                        rank
                        trophies
                        bestTrophies
                    }
                    previousSeason {
                        id
                        rank
                        trophies
                        bestTrophies
                    }
                    bestSeason {
                        id
                        rank
                        trophies
                    }
                }
                cards {
                    name
                    id
                    level
                    starLevel
                    maxLevel
                    count
                    iconUrls {
                        medium
                    }
                }
                currentFavouriteCard {
                    name
                    id
                    iconUrls {
                        medium
                    }
                    maxLevel
                }
                badges {
                    maxLevel
                    progress
                    level
                    target
                    name
                    iconUrls {
                        large
                    }
                }
                currentDeck {
                    name
                    id
                    level
                    starLevel
                    maxLevel
                    count
                    iconUrls {
                        medium
                    }
                }
                upcomingChests {
                    index
                    name
                }
                battleLog {
                    deckSelection
                    type
                    battleTime
                    isLadderTournament
                    isHostedMatch
                    challengeId
                    tournamentTag
                    challengeTitle
                    challengeWinCountBefore
                    boatBattleSide
                    boatBattleWon
                    newTowersDestroyed
                    prevTowersDestroyed
                    remainingTowers
                    gameMode {
                        id
                        name
                    }
                    arena {
                        id
                        name
                    }
                    opponent {
                        tag
                        name
                        startingTrophies
                        crowns
                        kingTowerHitPoints
                        princessTowersHitPoints
                        clan {
                            badgeId
                            tag
                            name
                        }
                        cards {
                            name
                            id
                            level
                            starLevel
                            maxLevel
                            iconUrls {
                                medium
                            }
                        }
                        trophyChange
                    }
                    team {
                        tag
                        name
                        startingTrophies
                        crowns
                        kingTowerHitPoints
                        princessTowersHitPoints
                        trophyChange
                        clan {
                            badgeId
                            tag
                            name
                        }
                        cards {
                            name
                            id
                            starLevel
                            maxLevel
                            level
                            iconUrls {
                                medium
                            }
                        }
                    }
                }
            }
        }
        ` : gql`
        query($tag: String!) {
            getClashRoyaleClan(tag: $tag) {
                tag
                name
                type
                description
                badgeId
                clanScore
                clanWarTrophies
                clanChestPoints
                requiredTrophies
                donationsPerWeek
                clanChestStatus
                clanChestLevel
                clanChestMaxLevel
                members
                location {
                    localizedName
                    id
                    name
                    isCountry
                    countryCode
                }
                memberList {
                    tag
                    name
                    role
                    lastSeen
                    expLevel
                    trophies
                    arena {
                        id
                        name
                    }
                    clanRank
                    previousClanRank
                    donations
                    donationsReceived
                    clanChestPoints
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
ClashRoyaleStatsTracker.afterAuthentication = (router, user) => {
    const playerTag = router.query.tag as string;
    const element = router.query.element as string;
    //Ensures the player tag parameter was given
    if (!playerTag) return router.push("/stats-tracker#clashroyale");
    //Ensures the element paramenter is given
    if (!element) return router.push("/stats-tracker#clashroyale");
    //Ensures element is either "players", "clans" or "clubs"
    if (!["players", "clans"].includes(element)) return router.push("/stats-tracker#clashroyale");
};

export default ClashRoyaleStatsTracker;