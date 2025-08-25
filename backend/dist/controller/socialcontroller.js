"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSocial = exports.Socials = void 0;
const prisma_1 = require("../generated/prisma");
const utils_1 = require("../config/utils");
const prisma = new prisma_1.PrismaClient();
const Socials = async (req, res) => {
    // get the socials of the logged in user, 
    try {
        //@ts-ignore
        const userid = req.tokenuserid;
        console.log("USer id is ", userid);
        if (!userid) {
            return res.status(401).json({ error: "Unauthorized, no userId found" });
        }
        const socials = await prisma.social.findMany({
            where: {
                userId: userid
            }
        });
        res.status(200).json({
            "message": "Fetched the socials data successfully!",
            socials: socials
        });
    }
    catch (err) {
        return res.status(500).json({
            "message": "Error fetched socials details"
        });
    }
};
exports.Socials = Socials;
const PostSocial = async (req, res) => {
    // get the post socials, 
    try {
        const parsed = utils_1.SocialpostSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(403).json({ message: "Invalid post credentials" });
        }
        const { platform, url } = parsed.data;
        //@ts-ignore
        const userId = req.tokenuserid;
        console.log("User id of the req object is ", userId);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized, no userId found" });
        }
        if (!platform || !url) {
            return res.status(401).json({ error: "Platform and URL are required" });
        }
        const social = await prisma.social.create({
            data: {
                platform,
                url,
                userId
            }
        });
        return res.status(200).json({
            "message": "social created successfully!",
            social
        });
    }
    catch (error) {
        return res.status(500).json({
            "message": "Error creating social link!"
        });
    }
};
exports.PostSocial = PostSocial;
//# sourceMappingURL=socialcontroller.js.map