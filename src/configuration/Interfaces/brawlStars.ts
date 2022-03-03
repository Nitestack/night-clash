export interface BSProfile {
    club: {
        tag: string,
        name: string
    },
    isQualifiedFromChampionshipChallenge: boolean,
    "3vs3Victories": number,
    icon: {
        id: number
    },
    tag: string
    name: string
    trophies: number,
    expLevel: number,
    expPoints: number,
    highestTrophies: number,
    powerPlayPoints: number,
    highestPowerPlayPoints: number,
    soloVictories: number,
    duoVictories: number,
    bestRoboRumbleTime: number,
    bestTimeAsBigBrawler: number,
    brawlers: Array<{
        id: number,
        name: string,
        power: number,
        rank: number,
        trophies: number,
        highestTrophies: number,
        gears: Array<{
            name: string,
            id: number,
            level: number
        }>,
        starPowers: Array<{
            name: string,
            id: number
        }>,
        gadgets: Array<{
            name: string,
            id: number
        }>
    }>
    nameColor: string
};

export interface BSClan {
    tag: string,
    name: string,
    description: string,
    type: "open" | "inviteOnly" | "closed" | "unknown",
    badgeId: number,
    requiredTrophies: number,
    trophies: number,
    members: Array<{
        icon: {
            id: number
        },
        tag: string,
        name: string,
        trophies: string,
        role: "notMember" | "member" | "president" | "senior" | "vicePresident" | "unknown",
        nameColor: string
    }>
};