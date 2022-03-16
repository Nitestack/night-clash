import type { NextApiHandler } from "next";
import Util from "@util/index";
import bcrypt from "bcryptjs";
import DatabaseManager from "@util/databaseManager";
import { sign } from "jsonwebtoken";

Util.connectDB();
//@ts-ignore
const Register: NextApiHandler = async (req, res) => {
    try {
        //Check for User validaty
        const userCheck = await DatabaseManager.getUser({ name: req.body.username });
        if (userCheck) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "Username already exists"
        });
        //Check for Email validaty
        const emailCheck = await DatabaseManager.getUser({ email: req.body.email });
        if (emailCheck) return Util.ApiHandler.sendError(res, 0, {
            errorMessage: "E-Mail already exists"
        });
        //Creates new user
        const newUser = new DatabaseManager.User({
            username: req.body.username,
            email: req.body.email,
            hash: bcrypt.hashSync(req.body.password, 8)
        });
        //Creates a JWT token
        const token = sign({ _id: newUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: "730d"
        });
        //JWT Token => Cookie
        newUser.emailToken = token;
        //User Role assignment
        newUser.role = Util.Constants.USER_ROLE_ID;
        //Saves the user in the db
        await newUser.save();
    } catch (err) {
        console.log(err);
    };
};

export default Register;