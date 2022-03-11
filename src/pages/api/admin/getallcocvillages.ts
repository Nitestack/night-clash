import Util from "@util/index";
import prism from "prismjs";
import loadLanguages from "prismjs/components/index";
import type { NextApiHandler } from "next";
import DatabaseManager from "@util/databaseManager";
loadLanguages("json");

const GetAllCoCVillages: NextApiHandler = async (req, res) => {
    await Util.getConnection();
    const villages = await DatabaseManager.ClashOfClansVillage.find().exec();
    if (!villages) return Util.ApiHandler.sendError(res, 1);
    Util.ApiHandler.sendSuccess<{ cocVillagesHTMLCode: string }>(res, {
        cocVillagesHTMLCode: prism.highlight(JSON.stringify(villages, null, 2), prism.languages.json, "json")
    });
};

export default GetAllCoCVillages;