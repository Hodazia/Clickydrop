import { Request,Response } from "express"
import {v2 as cloudinary} from "cloudinary"
import { LinksModel } from "../models/db";
import { uploadToCloudinary } from "../config/cloudinary"; 

export const createLinks = async (req:Request,res:Response) => {
    // creating links, 

    try{
        const {title, url} = req.body;
    // have a title of the link and a url link which when u click u will be 
    // redirected to

    if (!title || !url) {
        return res.status(400).json(
        { message: 'Title and URL are required.' });
    }

    /*there will be a middleware from the routes
    like req.user -> {id,title}
    */
   //@ts-ignore
   const userID = req.user.id;

    //now for the image file, use a cloudinary to store 
    let imageUrl = '';
        //@ts-ignore
        if (req.file) {
            // Upload image to Cloudinary if a file is present
            //@ts-ignore
            const result  = await uploadToCloudinary(req.file)
            //@ts-ignore
            imageUrl = result.secure_url;
        }

        const newLink =await LinksModel.create({
            user: userID,
            title,
            url,
            imageUrl,
        });

        res.status(201).json(
        { message: 'Link created successfully.', link: newLink });
    } 
    catch(err)
    {
        console.log("Error from the server side, ");
        res.status(500).json({ message: 'Server error.'});
    }
    
    
}