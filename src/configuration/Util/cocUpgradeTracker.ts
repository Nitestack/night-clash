import Coc from "@constants/clashOfClans";
import type { ClashOfClansPlayer, ClashOfClansSeason, ClashOfClansVillage, ClashOfClansVillageType } from "@graphql/types";
import { townHall } from "@database/Clash of Clans/Home/townHall";
import { builderHall } from "@database/Clash of Clans/Builder/builderHall";
import { toCamelCase } from "@util/functions";

export default class ClashOfClansUpgradeTracker {
    public static isInHall(item: string, hall: {
        [key: string]: number | {
            amount: number,
            maxLevel: number
        }
    }) {
        return !!hall[toCamelCase(item)];
    };
    public static getDatabaseItem(item: string, playerSchema: ClashOfClansVillage, village: "home" | "builder") {
        return playerSchema[village == "home" ? "homeVillage" : "builderBase"][toCamelCase(item)];
    };
    public static getLevels(item: string, playerSchema: ClashOfClansVillage, village: "home" | "builder") {
        return Object.values(ClashOfClansUpgradeTracker.getDatabaseItem(item, playerSchema, village) || { "1": 1 });
    };
    /**
    * Creates an edited village structure object
    * @param {object} oldStructures The structures
    * @param {Player} player The player
    * @param {"home" | "builder"} village The village
    * @param {boolean?} newStructureLevels If to update the village object
    */
    public static createVillageStructureObject(oldStructures: ClashOfClansVillageType | { [key: string]: string }, player: ClashOfClansPlayer, village: "home" | "builder", newStructureLevels?: boolean): ClashOfClansVillageType {
        const structures: ClashOfClansVillageType = oldStructures.builder ? oldStructures as ClashOfClansVillageType : {
            "walls": {
            },
            "builder": {}
        };
        if (village == "home") {
            //Regular spells are unlocked at TH5
            if (player.townHallLevel >= 5) {
                if (!player.spells) return structures;
                for (let i = Coc.homeNormalSpellsArray.length - 1; i >= 0; i--) {
                    if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeNormalSpellsArray[i].toLowerCase())) {
                        if (!structures.spellFactory) structures.spellFactory = {};
                        structures.spellFactory["1"] = i + 1;
                        break;
                    };
                };
                if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeNormalSpellsArray[3].toLowerCase())
                    && player.spells.find(spell => spell.name.toLowerCase() == Coc.homeNormalSpellsArray[4].toLowerCase())) structures.spellFactory["1"]--;
            };
            //Dark spells are unlocked at TH8
            if (player.townHallLevel >= 8) {
                if (!(player.spells.filter(unit => Coc.homeDarkSpellsArray.includes(unit.name)) || []).length) return structures;
                for (let i = Coc.homeDarkSpellsArray.length - 1; i >= 0; i--) {
                    if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeDarkSpellsArray[i].toLowerCase())) {
                        if (!structures.darkSpellFactory) structures.darkSpellFactory = {};
                        structures.darkSpellFactory["1"] = i + 1;
                        break;
                    };
                };
            };
            //Siege Machines are unlocked at TH12
            if (player.townHallLevel >= 12) {
                if (!(player.troops.filter(unit => Coc.homeSiegeMachinesArray.includes(unit.name)) || []).length) return structures;
                for (let i = Coc.homeSiegeMachinesArray.length - 1; i >= 0; i--) {
                    if (player.troops.find(siegeMachine => siegeMachine.name.toLowerCase() == Coc.homeSiegeMachinesArray[i].toLowerCase())) {
                        if (!structures.workshop) structures.workshop = {};
                        structures.workshop["1"] = i + 1;
                        break;
                    };
                };
            };
            //Pets are unlocked at TH14
            if (player.townHallLevel >= 14) {
                if (!(player.troops.filter(unit => Coc.homePetsArray.includes(unit.name)) || []).length) return structures;
                for (let i = Coc.homePetsArray.length - 1; i >= 0; i--) {
                    if (player.troops.find(pet => pet.name.toLowerCase() == Coc.homePetsArray[i].toLowerCase())) {
                        if (!structures.petHouse) structures.petHouse = {};
                        structures.petHouse["1"] = i + 1;
                        break;
                    };
                };
            };
            /*if (player.townHallLevel >= 14) {
                if (Object.keys(structures.builder).length < 5) {
                    structures.builders["5"] = 0;
                    if (Object.keys(structures.builder).length < 4) {
                        structures.builders["4"] = 0;
                        if (Object.keys(structures.builder).length < 3) structures.builder["3"] = 0;
                    };
                };
                if (structures.builder["1"] == 0) structures.builder["1"] = 1;
                if (structures.builder["2"] == 0) structures.builder["2"] = 1;
            };*/
        } else {
            //Troops are unlocked immediately at BH1
            for (let i = Coc.builderTroopsArray.length - 1; i >= 0; i--) {
                if (player.troops.find(troop => troop.name.toLowerCase() == Coc.builderTroopsArray[i].toLowerCase() && troop.village == "builderBase")) {
                    if (!structures.builderBarracks) structures.builderBarracks = {};
                    structures.builderBarracks["1"] = i + 1;
                    break;
                };
            };
        };
        if (newStructureLevels) {
            //Walls
            const wallObject: {
                [key: string]: number;
            } = {};
            let wallPieces = 0;
            let lowestWallLevel = false;
            //Iterate through all items
            for (const key of Object.keys(oldStructures)) {
                if (key.toLowerCase().includes("wall")) {
                    const [_, level] = key.split("_");
                    const amount = parseInt(oldStructures[key] as string);
                    if (amount > 0 && !lowestWallLevel) lowestWallLevel = true;
                    else if (amount == 0 && !lowestWallLevel) continue;
                    wallObject[level] = amount;
                    wallPieces += amount;
                } else if (key.toLowerCase().includes("builder's hut")) {
                    const [_, id] = key.split("_");
                    if (!structures.builder) structures.builder = {};
                    structures.builder[id] = parseInt(oldStructures[key] as string);
                } else {
                    const [buildingName, id] = key.split("_");
                    if (!structures[toCamelCase(buildingName)]) structures[toCamelCase(buildingName)] = {};
                    structures[toCamelCase(buildingName)][id] = parseInt(oldStructures[key] as string);
                };
            };
            //Walls left
            if (village == "home") {
                const totalPossibleWallAmount = townHall[player.townHallLevel - 1].wall.amount;
                if (wallPieces < totalPossibleWallAmount) wallObject["0"] = totalPossibleWallAmount - wallPieces;
            } else if (village == "builder" && player.builderHallLevel) {
                const totalPossibleWallAmount = typeof builderHall[player.builderHallLevel - 1].wall == "number" ? builderHall[player.builderHallLevel - 1].wall as number : (builderHall[player.builderHallLevel - 1].wall as { amount: number; maxLevel: number; }).amount;
                if (wallPieces < totalPossibleWallAmount) wallObject["0"] = totalPossibleWallAmount - wallPieces;
            };
            structures.walls = wallObject;
        };
        return structures;
    };
    /**
     * Gets the image of a Town Hall
     * @param {number} townHallLevel The Town Hall level 
     * @param {number?} townHallWeaponLevel The Town Hall Weapon level
     */
    public static getTownHallImage(townHallLevel: number, townHallWeaponLevel?: number) {
        return `/Images/Clash of Clans/Home/${townHallLevel >= 12 ?
            `Defenses/${townHallLevel == 12 ? "Giga Tesla" : townHallLevel == 13 ? "Giga Inferno 1" : "Giga Inferno 2"}/${townHallWeaponLevel}` :
            `Town Hall/${townHallLevel}`}.png`;
    };
    /**
     * Gets the image of a Builder Hall
     * @param {number} builderHallLevel The Builder Hall level
     */
    public static getBuilderHallImage(builderHallLevel?: number) {
        return `/Images/Clash of Clans/Builder/Builder Hall/${builderHallLevel || 0}.png`;
    };
    /**
     * Converts an API role to an resolved role string
     * @param {string} role The role to convert 
     */
    public static convertClanRole(role: string) {
        let resolvedRole: string;
        switch (role) {
            case "coLeader":
                resolvedRole = "Co-leader";
                break;
            case "leader":
                resolvedRole = "Leader";
                break;
            case "admin":
                resolvedRole = "Elder";
                break;
            default:
                resolvedRole = "Member";
                break;
        };
        return resolvedRole;
    };
    /**
     * Converts gems in time (milliseconds)
     * @param {number} gems The gems to convert 
     * @param {string} village The village name
     */
    public static gemsToTime(gems: number, village?: "home" | "builder") {
        var r: Array<number>, i: Array<number>, u: number;
        village = typeof village != "undefined" ? village : "home";
        r = [60, 3600, 86400, 604800];
        switch (village) {
            case "builder":
                i = [1, 50, 500, 2e3];
                break;
            default:
                i = [1, 20, 260, 1e3]
        };
        return (u = 0, isNaN(gems) && (gems = 0), gems < 0 && (gems = 0), gems == 0) ? 0 : gems <= i[0] ? 246 : gems <= i[1] ? Math.ceil((gems - i[0]) * ((r[1] - r[0]) / (i[1] - i[0])) + r[0]) : gems <= i[2] ? Math.ceil((gems - i[1]) * ((r[2] - r[1]) / (i[2] - i[1])) + r[1]) : Math.ceil((gems - i[2]) * ((r[3] - r[2]) / (i[3] - i[2])) + r[2]);
    };
    /**
     * Converts a time in seconds to gems
     * @info Edit in ../TS/Upgrade/mainIndex.ts too
     * @param {number} timeInSeconds The time to convert in seconds 
     * @param {string} village The village name
     */
    public static timeToGems(timeInSeconds: number, village?: "home" | "builder") {
        var r: Array<number>, u: Array<number>, i: number, f: number, gems: number;
        village = typeof village != "undefined" ? village : "home";
        r = [60, 3600, 86400, 604800];
        switch (village) {
            case "builder":
                u = [1, 50, 500, 2e3];
                break;
            default:
                u = [1, 20, 260, 1e3]
        };
        if (isNaN(timeInSeconds) && (timeInSeconds = 0), timeInSeconds < 0) return 0;
        if (timeInSeconds == 0) gems = 0;
        else if (timeInSeconds <= 246) gems = u[0];
        else {
            for (i = 3,
                f = 1; f < r.length; f++)
                if (timeInSeconds <= r[f]) {
                    i = f;
                    break
                }
            gems = Math.floor((timeInSeconds - r[i - 1]) * (u[i] - u[i - 1]) / (r[i] - r[i - 1])) + u[i - 1];
            gems == 0 && timeInSeconds > 0 && (gems = 1)
        };
        return gems < 0 && (gems = 0), gems;
    };
    /**
     * Get item of hall
     * @param {string} name The resolved name of the element 
     * @param {number} hallLevel The level of the hall
     * @param {"home" | "builder"} village
     */
    public static getHallItem(name: string, hallLevel: number, village: "home" | "builder"): {
        maxLevel: number,
        amount: number
    } | number {
        return (village == "home" ? townHall : builderHall)[hallLevel - 1][toCamelCase(name)];
    };
    public static getLeagueSeason(season?: ClashOfClansSeason) {
        if (season) {
            const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const dateArray = season.id.split("-");
            return `${months[parseInt(dateArray[1])]} ${dateArray[0]}`;
        };
    };
    public static getClanPerks(clanLevel: number) {
        const perks: {
            donationRequestWaitTime: 20 | 15 | 10,
            donationLimit: [6, 1] | [7, 2] | [9, 3],
            donationRefund: 0 | 20 | 35 | 50,
            donationUpgrade: 0 | 1 | 2,
            treasuryExtraStorage: 0 | 10 | 20 | 30 | 40 | 50
            warBonusExtraLoot: 0 | 10 | 15 | 20 | 25
        } = {
            donationRequestWaitTime: 20,
            donationLimit: [6, 1],
            donationRefund: 0,
            donationUpgrade: 0,
            treasuryExtraStorage: 0,
            warBonusExtraLoot: 0
        };
        if (clanLevel >= 2) {
            perks.donationRequestWaitTime = 15;
            perks.treasuryExtraStorage = 10;
        };
        if (clanLevel >= 3) {
            perks.donationRefund = 20;
            perks.warBonusExtraLoot = 10;
        };
        if (clanLevel >= 4) {
            perks.donationLimit = [7, 2];
            perks.treasuryExtraStorage = 20;
        };
        if (clanLevel >= 5) {
            perks.donationUpgrade = 1;
            perks.warBonusExtraLoot = 15;
        };
        if (clanLevel >= 6) {
            perks.donationRefund = 35;
            perks.treasuryExtraStorage = 30;
        };
        if (clanLevel >= 7) {
            perks.donationRequestWaitTime = 10;
            perks.warBonusExtraLoot = 20;
        };
        if (clanLevel >= 8) {
            perks.donationLimit = [9, 3];
            perks.treasuryExtraStorage = 40;
        };
        if (clanLevel >= 9) {
            perks.donationRefund = 50;
            perks.warBonusExtraLoot = 25;
        };
        if (clanLevel >= 10) {
            perks.donationUpgrade = 2;
            perks.treasuryExtraStorage = 50;
        };
        return perks;
    };
};