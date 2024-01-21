import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User, AccountUser, ClashOfClansPlayerProfile } from "@graphql/types";
import type { Context } from "@graphql/context";
import type { APIPlayer } from "clashofclans.js";

@Resolver()
export class UserResolver {
    @Query(returns => User, { description: "Gets an user of the database by their id" })
    async getProfileById(@Arg("uid") uid: string, @Ctx() ctx: Context) {
        return await ctx.prisma.user.findFirst({
            where: {
                uid: uid
            }
        });
    };
    @Mutation(returns => User, { description: "Registers an user to the database" })
    async registerUser(@Arg("uid") uid: string, @Ctx() ctx: Context) {
        return await ctx.prisma.user.create({
            data: {
                uid: uid,
                role: "USER",
                boomBeachIslandsID: [],
                clashOfClansVillagesID: [],
                brawlStarsStatsTrackerClans: [],
                brawlStarsStatsTrackerPlayers: [],
                clashOfClansStatsTrackerClans: [],
                clashOfClansStatsTrackerPlayers: [],
                clashRoyaleStatsTrackerClans: [],
                clashRoyaleStatsTrackerPlayers: []
            }
        });
    };
    @Query(returns => AccountUser, { description: "Gets an user of the database by their id and returns an object wrapped for the account page" })
    async accountGetProfileById(@Arg("uid") uid: string, @Ctx() ctx: Context) {
        const user = await ctx.prisma.user.findFirst({
            where: {
                uid: uid
            }
        });
        if (user) {
            const villages: Array<ClashOfClansPlayerProfile> = [];
            const clashOfClansVillages = await ctx.prisma.clashOfClansVillage.findMany({
                where: {
                    usersID: {
                        has: user.id
                    }
                }
            });
            for (const village of clashOfClansVillages) {
                const player: APIPlayer = village.player as unknown as APIPlayer;
                const pushObject: ClashOfClansPlayerProfile = {
                    name: player.name,
                    tag: village.playerTag,
                    townHallLevel: player.townHallLevel,
                    townHallWeaponLevel: player.townHallWeaponLevel
                };
                if (player.clan) pushObject.clan = {
                    name: player.clan.name,
                    tag: player.clan.tag,
                    iconUrl: player.clan.badgeUrls.large
                };
                villages.push(pushObject);
            };
            return {
                ...user,
                clashOfClansVillages: villages,
                boomBeachIslands: [] as any
            };
        };
        return null;
    };
};