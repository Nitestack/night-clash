import mongoose from "mongoose";
import type { Model, Document } from "mongoose";
import { VillageType } from "@models/clashofclans";

interface BoomBeachLevels {
    [key: string]: number;
};

interface BoomBeachAchievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
};

export type BoomBeachIsland = Document & {
    /**
     * Whether the second builder is active
     */
    secondBuilderActive: boolean;
    /**
     * The name of the player
     */
    name: string;
    /**
     * The tag of the player
     */
    playerTag: string;
    /**
     * The experience level of the player
     */
    expLevel: number;
    /**
     * The HQ level of the player
     */
    hqLevel: number;
    /**
     * The building levels
     */
    buildings: VillageType;
    /**
     * The troop levels
     */
    troops: BoomBeachLevels;
    /**
     * The Gunboat ability levels
     */
    gunBoatAbilities: BoomBeachLevels;
    /**
     * The mine levels
     */
    mines?: {
        mine: number;
        boomMine: number;
        shockMine: number;
    };
    /**
     * The hero levels
     */
    heroes?: {
        sgtBrick: number;
        drKavan: number;
        cptEverspark: number;
        pvtBullit: number;
    };
    /**
     * The amount of victory points (for the UI)
     */
    victoryPoints?: number;
    /**
     * The achievements of the player (for the UI)
     */
    achievements?: Array<BoomBeachAchievement>;
    /**
     * Information about the task force (for the UI)
     */
    taskForce?: {
        name: string;
        role: "leader" | "coLeader" | "officer" | "member"
    }
};

export default mongoose.models.boombeachisland as Model<BoomBeachIsland> || mongoose.model<BoomBeachIsland>("boombeachisland", new mongoose.Schema({
    secondBuilderActive: {
        type: Boolean,
        required: true,
        default: false
    },
    name: { 
        type: String,
        required: true
    },
    playerTag: { 
        type: String,
        required: true
    },
    hqLevel: {
        type: Number,
        required: true,
        default: 1
    },
    expLevel: {
        type: Number,
        required: true,
        default: 1
    },
    buildings: {
        type: {},
        required: true,
        default: {}
    },
    troops: {
        type: {},
        required: true,
        default: {}
    },
    gunBoatAbilities: {
        type: {},
        required: true,
        default: {}
    },
    mines: {
        type: {},
        required: true,
        default: {
            mine: 0,
            boomMine: 0,
            shockMine: 0
        }
    },
    heroes: {
        type: {},
        required: true,
        default: {
            sgtBrick: 0,
            drKavan: 0,
            cptEverspark: 0,
            pvtBullit: 0
        }
    },
    victoryPoints: {
        type: Number,
        required: true,
        default: 0
    },
    achievements: {
        type: [{
            name: {
                type: String,
                required: true
            },
            stars: {
                type: Number,
                required: true
            },
            value: {
                type: Number,
                required: true
            },
            target: {
                type: Number,
                required: true
            },
            info: {
                type: String,
                required: true
            },
            completionInfo: String
        }],
        required: true,
        default: []
    },
    taskForce: {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "member"
        }
    }
}));