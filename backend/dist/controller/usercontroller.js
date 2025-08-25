"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetData = exports.Signin = exports.Signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../generated/prisma");
const utils_1 = require("../config/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new prisma_1.PrismaClient();
const Signup = async (req, res) => {
    // let the user signup here
    /*
    the user shall be unique to get signup here,
    */
    try {
        const { success } = utils_1.signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(404).json({
                "message": "Provide correct credentials"
            });
        }
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(403).json({
                "message": "Provide all the credentials"
            });
        }
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password before putting it in DB
        // put the data in the DB
        const hashedpswd = await bcryptjs_1.default.hash(password, 10);
        const result = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedpswd
            }
        });
        return res.status(201).json({
            "message": "User registered successfully",
            username,
            email
        });
    }
    catch (err) {
        return res.status(500).
            json({
            "message": "there is an error signing up"
        });
    }
};
exports.Signup = Signup;
const Signin = async (req, res) => {
    // sign in to the user
    try {
        const { success } = utils_1.signinSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                "message": "Provide correct structure for the sign in"
            });
        }
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email }],
            }
        });
        if (!user) {
            return res.status(404).json({
                "message": "User doesn't exists, first sign up"
            });
        }
        // check if the password matches
        // maintain this order of comparing , first the password from req.body,
        const pswdvalid = await bcryptjs_1.default.compare(password, user.password);
        if (!pswdvalid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log("USer id ", user.id);
        const token = jsonwebtoken_1.default.sign({ userid: user.id }, process.env.JWT_SECRET);
        return res.status(200).json({
            "message": "user signed in successfully!",
            token: token,
            email: user.email,
            username: user.username
        });
    }
    catch (err) {
        return res.status(500).json({
            "message": "Error signing in to the app"
        });
    }
};
exports.Signin = Signin;
const GetData = async (req, res) => {
    // get the details of the user
    //@ts-ignore
    const userid = req.tokenuserid;
    const user = await prisma.user.findFirst({
        where: { id: userid }
    });
    return res.status(200).json({
        "username": user?.username,
        "email": user?.email,
    });
};
exports.GetData = GetData;
//# sourceMappingURL=usercontroller.js.map