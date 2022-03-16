import type { NextApiHandler } from "next";
import Util from "@util/index";
import DatabaseManager from "@util/databaseManager";

Util.connectDB();

const Register: NextApiHandler = async (req, res) => {
    try {
        //Check for User validaty
        const userCheck = await DatabaseManager.getUser({ name: req.body.name });
        if (userCheck) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "Username already taken"
        });
        //Check for Email validaty
        const emailCheck = await DatabaseManager.getUser({ email: req.body.email });
        if (emailCheck) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "E-Mail already taken"
        });
        //Creates new user
        const newUser = new DatabaseManager.User({
            name: req.body.name,
            email: req.body.email,
            hash: req.body.hash,
            role: Util.Constants.USER_ROLE_ID
        });
        //Saves the user in the db
        await newUser.save();
        Util.ApiHandler.sendSuccess(res, {});
    } catch (err) {
        console.log(err);
        Util.ApiHandler.sendError(res);
    };
};

export default Register;