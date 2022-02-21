import type { NextApiHandler } from 'next';
import DatabaseManager from '@util/databaseManager';
import Util from "@util/index";

const GetUserCount: NextApiHandler = async (req, res) => {
    await Util.getConnection();
    const userCount = await DatabaseManager.User.countDocuments().exec();
    if (!userCount) return Util.ApiHandler.sendError(res, 1);
    Util.ApiHandler.sendSuccess<{ userCount: number }>(res, {
        userCount: userCount
    });
};

export default GetUserCount;