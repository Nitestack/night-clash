import Util from "@util/index";
import mongoose from "mongoose";
import type { Model, Document } from "mongoose";

export type ClashOfClansPlayerProfile = {
    name: string,
    tag: string,
    townHallLevel: number,
    townHallWeaponLevel?: number,
    clan?: ClashOfClansClanProfile
};

export type ClashOfClansClanProfile = {
    name: string,
    tag: string,
    iconUrl: string
};

export type ClashRoyalePlayerProfile = {
    name: string,
    tag: string,
    expLevel: number,
    clan?: ClashRoyaleClanProfile
};

export type ClashRoyaleClanProfile = {
    name: string,
    tag: string,
    badgeId: number
};

export type BrawlStarsPlayerProfile = {
    name: string,
    tag: string,
    iconId: number,
    club?: BrawlStarsClubProfile
};

export type BrawlStarsClubProfile = {
    name: string,
    tag: string
};

export type UserDocument = Document & {
    //The user's id in the Firebase Database
    uid: string;
    //The user's role: `user` | `admin`
    role: string;
    //The user's Clash of Clans villages
    clashOfClansVillages: Array<string>;
    //The user's Boom Beach islands
    boomBeachIslands: Array<string>;
    //Saved stats tracker players
    clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>;
    //Saved stats tracker clans
    clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>
    //Saved stats tracker players
    clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>;
    //Saved stats tracker clans
    clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>
    //Saved stats tracker players
    brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>;
    //Saved stats tracker clans
    brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>;
};

export default mongoose.models.user as Model<UserDocument> || mongoose.model<UserDocument>("user", new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: Util.Constants.USER_ROLE_ID
    },
    clashOfClansVillages: {
        type: [String],
        required: true,
        default: []
    },
    boomBeachIslands: {
        type: [String],
        required: true,
        default: []
    },
    clashOfClansStatsTrackerClans: [{
        name: String,
        tag: String,
        iconUrl: String
    }],
    clashOfClansStatsTrackerPlayers: [{
        name: String,
        tag: String,
        townHallLevel: Number,
        townHallWeaponLevel: Number,
        clan: {
            name: String,
            tag: String,
            iconUrl: String
        }
    }],
    clashRoyaleStatsTrackerClans: [{
        name: String,
        tag: String,
        badgeId: String
    }],
    clashRoyaleStatsTrackerPlayers: [{
        name: String,
        tag: String,
        expLevel: Number,
        clan: {
            name: String,
            tag: String,
            badgeId: Number
        }
    }],
    brawlStarsStatsTrackerClans: [{
        name: String,
        tag: String
    }],
    brawlStarsStatsTrackerPlayers: [{
        name: String,
        tag: String,
        iconId: Number,
        club: {
            name: String,
            tag: String
        }
    }]
}));