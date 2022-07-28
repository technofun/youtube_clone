import Users from "../models/Users.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { createError } from "../error.js";


export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({ ...req.body, password: hash })
        await newUser.save();
        res.status(200).send("user created successfully!")
    } catch (error) {
        next(error)
    }
}
export const signin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ name: req.body.name })
        if (!user) return next(createError(404, "User not found!"))
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return next(createError(400, "Invalid Username or Password!"))
        const token = jwt.sign({ id: user._id }, process.env.JWT)
        const {password,...others} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (error) {
        next(error)  
    }
}
