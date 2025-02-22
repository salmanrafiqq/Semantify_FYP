import User from "../model/user.js"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";
import { roles } from "../middleware/roles.js";


export const register = async(req, res, next) => {
    const { fullname, sap, email, password,role } = req.body;
    try {
        const oldUseremail = await User.findOne({ email });
        const oldsap = await User.findOne({ sap });

        if (oldUseremail) return res.status(400).json({ message: "Email already exists" });
        if (oldsap) return res.status(400).json({ message: "sap already exists" });
        let user_role;
if(email===process.env.Admin){
  user_role=roles.admin
}else{
    user_role=role
}
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ fullname, sap, email, password: hashedPassword,role:user_role});

        const Access_Token = jwt.sign({ email: result.email, id: result._id }, process.env.Access_Token, { expiresIn: "48h" });


        res.status(201).json({ result, Access_Token });


    } catch (error) {
        next(error)
    }

}

export const login = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        if (req.cookies[`${oldUser._id}`]) {
            req.cookies[`${oldUser._id}`] = "";
        }

        const Access_Token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.Access_Token, { expiresIn: "48h" });


        res.cookie(String(oldUser._id), Access_Token, {

            expires: new Date(Date.now() + 100000 * 30), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
        });
        console.log(oldUser._id)
        res.status(200).json({ result: oldUser, Access_Token });
    } catch (error) {
        next(error)


    }
};

export const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.Access_Token, (err, user) => {
        if (err) {
            next(err)
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Successfully Logged Out" });
    });
};