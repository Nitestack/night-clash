import mongoose, { Document, Model, SchemaDefinitionProperty } from "mongoose";
import { APIPlayer } from "clashofclans.js";

export type VillageType = { [key: string]: string | { [key: string]: string; } };

/**
 * The Clash of Clans Village Document
 */
export type ClashOfClansVillage = Document & {
    /**
     * The tag of the player for identication
     */
    playerTag: string;
    /**
     * The player
     */
    player: APIPlayer;
    /**
     * The Home Village object
     */
    homeVillage: VillageType;
    /**
     * The Builder Base object
     */
    builderBase: VillageType;
    /**
     * The season builder boost: 0` | `10` | `15` | `20`
     */
    builderSeasonBoost: number;
    /**
     * The season research boost: `0` | `10` | `15` | `20`
     */
    researchSeasonBoost: number;
    /**
     * The builders of the Home Village
     */
    homeVillageBuilder: Array<Builder>;
    /**
     * The builder(s) of the Builder Base
     */
    builderBaseBuilder: Array<Builder>;
    /**
     * The laboratory of the Home Village
     */
    homeLab: Array<Laboratory>;
    /**
     * The star laboratory of the Builder Base
     */
    builderLab: Array<Laboratory>;
    /**
     * The Pet House of the Home Village
     */
    petHouse: Array<PetHouse>;
    /**
     * The O.T.T.O builder
     */
    otto: {
        /**
         * Whether the player unlocked O.T.T.O
         */
        unlocked: boolean;
        /**
         * What O.T.T.O is upgrading
         */
        builder: Array<Builder>;
        /**
         * Current location of O.T.T.O: `home` | `builder`
         */
        currentVillage: string;
    };
};

export interface Builder {
    name: string;
    id: number;
    start: Date;
    currentLevel: number;
    durationInMilliseconds: number;
};

export interface Laboratory {
    name: string;
    start: Date;
    durationInMilliseconds: number;
    currentLevel: number;
};

export interface PetHouse {
    name: string;
    start: Date;
    durationInMilliseconds: number;
    currentLevel: number;
};

const requiredString: SchemaDefinitionProperty = {
    type: String,
    required: true
};
const requiredNumber: SchemaDefinitionProperty = {
    type: Number,
    required: true
};

//@ts-ignore
export default mongoose.models.clashofclansvillage as Model<ClashOfClansVillage> || mongoose.model<ClashOfClansVillage>("clashofclansvillage", new mongoose.Schema({
    playerTag: {
        type: String,
        required: true,
        unique: true
    },
    player: {},
    homeVillage: {
        type: {},
        required: true,
        default: {}
    },
    builderBase: {
        type: {},
        required: true,
        default: {}
    },
    builderSeasonBoost: {
        type: Number,
        required: true,
        default: 0
    },
    researchSeasonBoost: {
        type: Number,
        required: true,
        default: 0
    },
    homeVillageBuilder: {
        type: [{
            name: requiredString,
            id: requiredNumber,
            start: {
                type: Date,
                required: true
            },
            durationInMilliseconds: requiredNumber,
            currentLevel: requiredNumber
        }],
        required: true,
        default: []
    },
    builderBaseBuilder: {
        type: [{
            name: requiredString,
            id: requiredNumber,
            start: {
                type: Date,
                required: true
            },
            durationInMilliseconds: requiredNumber,
            currentLevel: requiredNumber
        }],
        required: true,
        default: []
    },
    homeLab: [{
        name: requiredString,
        start: {
            type: Date,
            required: true
        },
        durationInMilliseconds: requiredNumber,
        currentLevel: requiredNumber
    }],
    builderLab: {
        type: [{
            name: requiredString,
            start: {
                type: Date,
                required: true
            },
            durationInMilliseconds: requiredNumber,
            currentLevel: requiredNumber
        }],
        required: true,
        default: []
    },
    petHouse: {
        type: [{
            name: requiredString,
            start: {
                type: Date,
                required: true
            },
            durationInMilliseconds: requiredNumber,
            currentLevel: requiredNumber
        }],
        required: true,
        default: []
    },
    otto: {
        type: {
            unlocked: {
                type: Boolean,
                required: true,
                default: false
            },
            builder: {
                type: [{
                    name: requiredString,
                    id: requiredNumber,
                    start: {
                        type: Date,
                        required: true
                    },
                    durationInMilliseconds: requiredNumber,
                    currentLevel: requiredNumber
                }],
                required: true,
                default: []
            },
            currentVillage: {
                type: String,
                required: true,
                default: "builder"
            }
        },
        required: true
    }
}));