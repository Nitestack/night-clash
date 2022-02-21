import type { NextApiHandler } from 'next';
import Util from "@util/index";
import prism from "prismjs";
import loadLanguages from "prismjs/components/index";
import DatabaseManager from "@util/databaseManager";
loadLanguages("json");

const GetAllUsers: NextApiHandler = async (req, res) => {
    await Util.getConnection();
    const users = await DatabaseManager.User.find().exec();
    if (!users) return Util.ApiHandler.sendError(res, 1);
    res.status(200).json({
        usersHTMLCode: prism.highlight(JSON.stringify(users, null, 2), prism.languages.json, 'json')
    });
};

export default GetAllUsers;