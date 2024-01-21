import { Arg, Query, Resolver, Ctx } from "type-graphql";
import type { Context } from "@graphql/context";
import { ClashOfClansClan, ClashOfClansPlayer, ClashRoyalePlayer, ClashRoyaleClan } from "@graphql/types";

@Resolver()
export class StatsResolver {
    @Query(returns => ClashOfClansPlayer)
    async getClashOfClansPlayer(@Arg("tag") tag: string, @Ctx() ctx: Context) {
        const response = await ctx.api.coc.rest.getPlayer(tag);
        if (response.data) return response.data;
        return null;
    };
    @Query(returns => ClashOfClansClan)
    async getClashOfClansClan(@Arg("tag") tag: string, @Ctx() ctx: Context) {
        const response = await ctx.api.coc.rest.getClan(tag);
        if (response.data) return response.data;
        return null;
    };
    @Query(returns => ClashRoyalePlayer)
    async getClashRoyalePlayer(@Arg("tag") tag: string, @Ctx() ctx: Context) {
        const playerResponse = await ctx.api.cr.player(tag);
        let player: ClashRoyalePlayer;
        if (playerResponse)  {
            player = {
                ...playerResponse
            };
            const chestResponse = await ctx.api.cr.playersUpcomingChests(tag);
            if (chestResponse) {
                player.upcomingChests = chestResponse.items;
                const battleLogResponse = await ctx.api.cr.playerBattleLog(tag);
                const battleLog = [];
                for (const key of Object.keys(battleLogResponse)) if (battleLogResponse[key].type) battleLog.push(battleLogResponse[key]);
                if (battleLogResponse) {
                    player.battleLog = battleLog;
                    return player;
                };
                return null;
            };
            return null;
        };
        return null;
    };
    @Query(returns => ClashRoyaleClan)
    async getClashRoyaleClan(@Arg("tag") tag: string, @Ctx() ctx: Context) {
        const clan = await ctx.api.cr.clan(tag);
        if (clan) return clan;
        return null;
    };
    @Query(returns => ClashOfClansPlayer)
    async getBrawlStarsPlayer(@Arg("tag") tag: string, @Ctx() ctx: Context) {
        const player = await ctx.api.bs.player(tag);
        if (player) return player;
        return null;
    };
    @Query(returns => ClashOfClansPlayer)
    async getBrawlStarsClub(@Arg("tag") tag: string, @Ctx() ctx: Context) {
        const club = await ctx.api.bs.club(tag);
        if (club) return club;
        return null;
    };
};