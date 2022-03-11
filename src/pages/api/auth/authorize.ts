import type { NextApiHandler } from "next";
import Util from "@util/index";
import bcrypt from "bcryptjs";
import DatabaseManager from "@util/databaseManager";
import type { User } from "@models/user";

const Authorize: NextApiHandler = async (req, res) => {
    await Util.getConnection();
    const credentials: Record<"emailOrUsername" | "password", string> = req.body;
    const user = await DatabaseManager.getUser(Util.isEmail(credentials.emailOrUsername) ? { email: credentials.emailOrUsername } : { user: credentials.emailOrUsername });
    if (!user) return Util.ApiHandler.sendError(res, 0, "Invalid login!");
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.hash);
    if (!passwordIsValid) return Util.ApiHandler.sendError(res, 0, "Invalid login!");
    Util.ApiHandler.sendSuccess<User>(res, {
        id: user._id,
        username: user.username,
        email: user.email,
        clashOfClansVillages: user.clashOfClansVillages,
        role: user.role,
        hash: user.hash
    });
};

export default Authorize;