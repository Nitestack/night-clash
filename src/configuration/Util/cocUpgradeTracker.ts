import Coc from "@constants/clashOfClans";
import { APIPlayer, APISeason } from "clashofclans.js";
import { VillageType } from "@models/clashofclans";
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
    /**
     * Gets the levels of one item type
     * @param {string} item The item 
     */
    public static getLevelArray(item: string, village: { [key: string]: string }, player: APIPlayer) {
        const numberArray: Array<number> = []; 
        for (const key of Object.keys(village)) { 
            if (item.includes("Giga")) {
                //@ts-ignore
                numberArray.push(player.townHallWeaponLevel); 
                break; 
            };
            if (key.toLowerCase().includes("xbow") && item.toLowerCase() == "x-bow") numberArray.push(parseInt(village[key])); 
            else if (key.slice(0, -1).replace(/([A-Z]+)/g, ' $1').trim().toLowerCase() == item.replace(/'/g, "").toLowerCase()) numberArray.push(parseInt(village[key])); 
        };
        return numberArray;
    };
    /**
    * Creates an edited village structure object
    * @param {object} structures The structures
    * @param {Player} player The player
    * @param {"home" | "builder"} village The village
    * @param {boolean?} settingUpWalls If to setup walls
    */
    public static createVillageStructureObject(structures: VillageType, player: APIPlayer, village: "home" | "builder", settingUpWalls?: boolean): VillageType {
        //If the structure object includes an player object
        if (structures["player"]) delete structures["player"];
        if (village == "home") {
            //Regular spells are unlocked at TH5
            if (player.townHallLevel >= 5) {
                if (!player.spells) return structures;
                for (let i = Coc.homeNormalSpellsArray.length - 1; i >= 0; i--) {
                    if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeNormalSpellsArray[i].toLowerCase())) {
                        structures["SpellFactory1"] = `${i + 1}`;
                        break;
                    };
                };
            };
            //Dark spells are unlocked at TH8
            if (player.townHallLevel >= 8) {
                if (!(player.spells.filter(unit => Coc.homeDarkSpellsArray.includes(unit.name)) || []).length) return structures;
                for (let i = Coc.homeDarkSpellsArray.length - 1; i >= 0; i--) {
                    if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeDarkSpellsArray[i].toLowerCase())) {
                        structures["DarkSpellFactory1"] = `${i + 1}`;
                        break;
                    };
                };
            };
            //Siege Machines are unlocked at TH12
            if (player.townHallLevel >= 12) {
                if (!(player.troops.filter(unit => Coc.homeSiegeMachinesArray.includes(unit.name)) || []).length) return structures;
                for (let i = Coc.homeSiegeMachinesArray.length - 1; i >= 0; i--) {
                    if (player.troops.find(siegeMachine => siegeMachine.name.toLowerCase() == Coc.homeSiegeMachinesArray[i].toLowerCase())) {
                        structures["Workshop1"] = `${i + 1}`;
                        break;
                    };
                };
            };
            //Pets are unlocked at TH14
            if (player.townHallLevel >= 14) {
                if (!(player.troops.filter(unit => Coc.homePetsArray.includes(unit.name)) || []).length) return structures;
                for (let i = Coc.homePetsArray.length - 1; i >= 0; i--) {
                    if (player.troops.find(pet => pet.name.toLowerCase() == Coc.homePetsArray[i].toLowerCase())) {
                        structures["PetHouse1"] = `${i + 1}`;
                        break;
                    };
                };
            };
            if (player.townHallLevel >= 14) {
                if (parseInt(structures["Builder"] as string) < 5) {
                    structures["BuildersHut5"] = "0";
                    if (parseInt(structures["Builder"] as string) < 4) {
                        structures["BuildersHut4"] = "0";
                        if (parseInt(structures["Builder"] as string) < 3) structures["BuildersHut3"] = "0";
                    };
                };
                if (structures["BuildersHut1"] == "0") structures["BuildersHut1"] = "1";
                if (structures["BuildersHut2"] == "0") structures["BuildersHut2"] = "1";
            };
        } else {
            //Troops are unlocked immediately at BH1
            for (let i = Coc.builderTroopsArray.length - 1; i >= 0; i--) {
                if (player.troops.find(troop => troop.name.toLowerCase() == Coc.builderTroopsArray[i].toLowerCase() && troop.village == "builderBase")) {
                    structures["BuilderBarracks1"] = `${i + 1}`;
                    break;
                };
            };
        };
        if (settingUpWalls) {
            const wallObject: {
                [key: string]: string;
            } = {};
            for (const structureKey of Object.keys(structures)) {
                //If it isn't a Wall level
                if (!structureKey.includes("Wall")) continue;
                else if (structures[structureKey] == "0") {
                    delete structures[structureKey];
                    continue;
                };
                wallObject[structureKey.replace(/Wall/g, "")] = structures[structureKey] as string;
                delete structures[structureKey];
            };
            let wallPieces = 0;
            for (const amount of Object.values(wallObject)) wallPieces += parseInt(amount as string);
            if (village == "home" || (village == "builder" && player.builderHallLevel)) {
                const totalPossibleWallAmount = townHall[player.townHallLevel - 1].wall.amount;
                if (wallPieces < totalPossibleWallAmount) wallObject["0"] = `${totalPossibleWallAmount - wallPieces}`;
            } else if (village == "builder" && player.builderHallLevel) {
                const totalPossibleWallAmount = typeof builderHall[player.builderHallLevel - 1].wall == "number" ? builderHall[player.builderHallLevel - 1].wall as number : (builderHall[player.builderHallLevel - 1].wall as { amount: number; maxLevel: number; }).amount;
                if (wallPieces < totalPossibleWallAmount) wallObject["0"] = `${totalPossibleWallAmount - wallPieces}`;
            };
            structures["Walls"] = wallObject;
        };
        return structures;
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
    public static getLeagueSeason(season?: APISeason) {
        if (season) {
            const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const dateArray = season.id.split("-");
            return `${months[parseInt(dateArray[1])]} ${dateArray[0]}`;
        };
    };
};