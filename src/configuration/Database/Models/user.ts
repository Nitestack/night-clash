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

interface ActualUser {
    //The user's name
    name: string;
    //The user's email
    email: string;
    //The user's role: `user` | `admin`
    role: string;
    //The user's Clash of Clans villages
    clashOfClansVillages: Array<string>;
    //Saved stats tracker players
    clashOfClansStatsTrackerPlayers: Array<ClashOfClansPlayerProfile>;
    //Saved stats tracker clans
    clashOfClansStatsTrackerClans: Array<ClashOfClansClanProfile>
    //Saved stats tracker players
    clashRoyaleStatsTrackerPlayers: Array<ClashRoyalePlayerProfile>;
    //Saved stats tracker clans
    clashRoyaleStatsTrackerClans: Array<ClashRoyaleClanProfile>//Saved stats tracker players
    brawlStarsStatsTrackerPlayers: Array<BrawlStarsPlayerProfile>;
    //Saved stats tracker clans
    brawlStarsStatsTrackerClans: Array<BrawlStarsClubProfile>
};

export type UserDocument = Document & ActualUser & { 
    //The user's password encrypted
    hash: string; 
    //
    resetToken?: string;
    //
    updates?: string;
};

export default mongoose.models.user as Model<UserDocument> || mongoose.model<UserDocument>("user", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: Util.Constants.USER_ROLE_ID
    },
    clashOfClansVillages: [{
        type: String,
        unique: true
    }],
    resetToken: {
        type: String
    },
    updates: {
        type: String
    },
    clashOfClansStatsTrackerClans: [{
        type: {
            name: String,
            tag: String,
            iconUrl: String
        },
        unique: true
    }],
    clashOfClansStatsTrackerPlayers: [{
        type: {
            name: String,
            tag: String,
            townHallLevel: Number,
            townHallWeaponLevel: Number,
            clan: {
                name: String,
                tag: String,
                iconUrl: String
            }
        },
        unique: true
    }],
    clashRoyaleStatsTrackerClans: [{
        type: {
            name: String,
            tag: String,
            badgeId: String
        },
        unique: true
    }],
    clashRoyaleStatsTrackerPlayers: [{
        type: {
            name: String,
            tag: String,
            expLevel: Number,
            clan: {
                name: String,
                tag: String,
                badgeId: Number
            }
        },
        unique: true
    }],
    brawlStarsStatsTrackerClans: [{
        type: {
            name: String,
            tag: String
        },
        unique: true
    }],
    brawlStarsStatsTrackerPlayers: [{
        type: {
            name: String,
            tag: String,
            iconId: Number,
            club: {
                name: String,
                tag: String
            }
        },
        unique: true
    }]
}));