import type { NextApiHandler } from "next";
import Util from "@util/index";
import bcrypt from "bcryptjs";
import DatabaseManager from "@util/databaseManager";
import { sign } from "jsonwebtoken";

Util.connectDB();

const Authorize: NextApiHandler = async (req, res) => {
    try {
        const credentials: Record<"email" | "password", string> = req.body;
        const user = await DatabaseManager.getUser({ email: credentials.email });
        if (!user) return Util.ApiHandler.sendError(res, 0);
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.hash);
        if (!passwordIsValid) return Util.ApiHandler.sendError(res, 0);
        //Creates a JWT token
        const token = sign({ _id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: "730d"
        });
        Util.ApiHandler.sendSuccess(res, {
            _id: user._id,
            email: user.email,
            name: user.name,
            token: token,
            role: user.role
        });
    } catch (err) {
        Util.ApiHandler.sendError(res, 1);
    };
};

export default Authorize;