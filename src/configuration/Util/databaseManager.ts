import { FilterQuery } from "mongoose";
import userModel, { UserDocument } from "@models/user";
import roleModel from "@models/role";
import cocVillageModel, { ClashOfClansVillage } from "@models/clashofclans";

export default class DatabaseManager {
    public static User = userModel;
    public static Role = roleModel;
    public static ClashOfClansVillage = cocVillageModel;
    public static ROLES = ["user", "admin", "moderator"];
    public static async getUserById(id: string) {
        return await DatabaseManager.User.findById(id);
    };
    public static async getUser(filter: FilterQuery<UserDocument>) {
        return await DatabaseManager.User.findOne(filter);
    };
    public static async getClashOfClansVillageById(id: string) {
        return await DatabaseManager.ClashOfClansVillage.findOne({ playerTag: id });
    };
    public static async getClashOfClansVillage(filter: FilterQuery<ClashOfClansVillage>) {
        return await DatabaseManager.ClashOfClansVillage.findOne(filter);
    };
};