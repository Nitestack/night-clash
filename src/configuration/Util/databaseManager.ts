import type { FilterQuery } from "mongoose";
import userModel from "@models/user";
import type { UserDocument } from "@models/user";
import roleModel from "@models/role";
import cocVillageModel from "@models/clashofclans";
import boomBeachIslandModel from "@models/boombeach";
import type { ClashOfClansVillage } from "@models/clashofclans";
import type { BoomBeachIsland } from "@models/boombeach";

export default class DatabaseManager {
    public static User = userModel;
    public static Role = roleModel;
    public static ClashOfClansVillage = cocVillageModel;
    public static BoomBeachIsland = boomBeachIslandModel;
    public static ROLES = ["user", "admin", "moderator"];
    public static async getUserById(id: string) {
        return await DatabaseManager.User.findById(id);
    };
    public static async getUser(filter: FilterQuery<UserDocument>) {
        return await DatabaseManager.User.findOne(filter);
    };
    public static async getClashOfClansVillageById(id: string) {
        return await DatabaseManager.ClashOfClansVillage.findById(id);
    };
    public static async getClashOfClansVillage(filter: FilterQuery<ClashOfClansVillage>) {
        return await DatabaseManager.ClashOfClansVillage.findOne(filter);
    };
    public static async getBoomBeachIslandById(id: string) {
        return await DatabaseManager.BoomBeachIsland.findById(id);
    };
    public static async getBoomBeachIsland(filter: FilterQuery<BoomBeachIsland>) {
        return await DatabaseManager.BoomBeachIsland.findOne(filter);
    };
};