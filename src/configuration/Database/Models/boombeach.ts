import mongoose, { Model, Document } from "mongoose";

interface BoomBeachLevels {
    [key: string]: string;
};

interface BoomBeachAchievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo: string | null;
};

export type BoomBeachIsland = Document & {
    /**
     * Whether the second builder is active
     */
    secondBuilderActive?: boolean;
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
     * The building levels
     */
    buildings: BoomBeachLevels;
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
    mines?: BoomBeachLevels;
    /**
     * The amount of victory points (for the UI)
     */
    victoryPoints?: number;
    /**
     * The achievements of the player (for the UI)
     */
    achievements?: Array<BoomBeachAchievement>;
    /**
     * The task force name where the player is currently in (for the UI)
     */
    taskForceName?: string;
    /**
     * The task force role if the player is in a task force (for the UI)
     */
    role?: "member" | "officer" | "coLeader" | "leader";
};

export default mongoose.models.boombeachisland as Model<BoomBeachIsland> || mongoose.model<BoomBeachIsland>("boombeachisland", new mongoose.Schema({

}));