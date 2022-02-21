import type { NextApiHandler } from 'next';
import Util from "@util/index";
import bcrypt from "bcryptjs";
import DatabaseManager from '@util/databaseManager';

//@ts-ignore
const Register: NextApiHandler = async (req, res) => {
    await Util.getConnection();
    //Check for Email validaty
    const userCheck = await DatabaseManager.getUser({ username: req.body.username });
    if (userCheck) return res.redirect("/register?error=user");
    const emailCheck = await DatabaseManager.getUser({ email: req.body.email });
    if (emailCheck) return res.redirect("/register?error=email");
    const newUser = new DatabaseManager.User({
        username: req.body.username,
        email: req.body.email,
        hash: bcrypt.hashSync(req.body.password, 8)
    });
    //Sign up
    newUser.save((err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/register?error=internal");
        } else {
            user.role = Util.Constants.USER_ROLE_ID;
            user.save(err => {
                if (err) {
                    console.log(err);
                    return res.redirect("/register?error=internal");
                };
            });
            res.redirect("/login");
        };
    });
};

export default Register;