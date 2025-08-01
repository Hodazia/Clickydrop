"use strict";
// define the user's controller in here, like sign up, sign in and so on
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.signin = exports.signup = void 0;
const utils_1 = require("../config/utils");
const db_1 = require("../models/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    // once signed in , u can add a photo to the user's profile
    try {
        const { email, password, username } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const { success, data, error } = utils_1.signupSchema.safeParse({ email, password, username });
        if (!success) {
            return res.status(400).json({
                "message": "Invalid Credentials "
            });
        }
        // check for an exisitng user
        const existinguser = await db_1.UserModel.findOne({ email: email });
        if (existinguser) {
            return res.status(409).json({
                "message": "user already exists, enter new/unique credentials"
            });
        }
        //hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: "user"
        });
        console.log('User saved to DB:', user);
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(201)
            .cookie("token", token, options)
            .json({
            message: '✅ User registered',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.log("Error signing in ", error);
        return res.status(500).json({
            "message": "Internal server error"
        });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    // extracted the email and password
    try {
        if (email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD) {
            const token = jsonwebtoken_1.default.sign({ id: "admin", role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res
                .cookie("token", token, { httpOnly: true, secure: true })
                .status(200)
                .json({
                message: "✅ Logged in as Admin",
                user: {
                    username: process.env.ADMIN_USERNAME,
                    email,
                    role: "admin"
                }
            });
        }
        // Else, normal user login
        const user = await db_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.cookie("token", token, { httpOnly: true, secure: true }).
            status(200).json({
            message: "✅ Logged in as User",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch (error) {
        console.log("Error signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.signin = signin;
const logout = async (req, res) => {
    // clear the cookies, 
    res.clearCookie("token");
    return res.status(200).json({
        "message": "Successfully logged out"
    });
};
exports.logout = logout;
const getMe = async (req, res) => {
    // get the details of the user,
    try {
        //@ts-ignore
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await db_1.UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=usercontroller.js.map