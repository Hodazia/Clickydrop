import bcrypt, { hash } from "bcryptjs"
import { PrismaClient } from "../generated/prisma";
import { signinSchema, signupSchema, SocialpostSchema } from "../config/utils";
import { Request,Response } from "express";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const Socials = async (req:Request,res:Response) => {
    // get the socials of the logged in user, 
    try{
        //@ts-ignore
        const userid = req.tokenuserid as number;
        console.log("USer id is ", userid);
        if (!userid) {
            return res.status(401).json({ error: "Unauthorized, no userId found" });
        }
        const socials = await prisma.social.findMany({
            where:{
                userId: userid
            }
        })
        res.status(200).json({
            "message":"Fetched the socials data successfully!",
            socials:socials
        })
    }
    catch(err)
    {
        return res.status(500).json({
            "message":"Error fetched socials details"
        })
        
    }
}

export const PostSocial = async (req:Request,res:Response) => {
    // get the post socials, 
    try{
        const parsed = SocialpostSchema.safeParse(req.body);
        if (!parsed.success) {
        return res.status(403).json({ message: "Invalid post credentials" });
        }
        const {platform, url} = parsed.data;
        
        //@ts-ignore
        const userId = req.tokenuserid as number | undefined
        console.log("User id of the req object is ", userId);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized, no userId found" });
          }
        if(!platform || !url)
        {
            return res.status(401).json({ error: "Platform and URL are required"});
        }

        const social = await prisma.social.create({
            data:{
                platform,
                url,
                userId
            }
        })

        return res.status(200).json({
            "message":"social created successfully!",
            social
        })
    }
    catch(error)
    {
        return res.status(500).json({
            "message":"Error creating social link!"
        })
    }
}