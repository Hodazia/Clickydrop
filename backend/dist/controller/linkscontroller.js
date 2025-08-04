"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinks = void 0;
const db_1 = require("../models/db");
const cloudinary_1 = require("../config/cloudinary");
const createLinks = async (req, res) => {
    // creating links, 
    try {
        const { title, url } = req.body;
        // have a title of the link and a url link which when u click u will be 
        // redirected to
        if (!title || !url) {
            return res.status(400).json({ message: 'Title and URL are required.' });
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
            const result = await (0, cloudinary_1.uploadToCloudinary)(req.file);
            //@ts-ignore
            imageUrl = result.secure_url;
        }
        const newLink = await db_1.LinksModel.create({
            user: userID,
            title,
            url,
            imageUrl,
        });
        res.status(201).json({ message: 'Link created successfully.', link: newLink });
    }
    catch (err) {
        console.log("Error from the server side, ");
        res.status(500).json({ message: 'Server error.' });
    }
};
exports.createLinks = createLinks;
//# sourceMappingURL=linkscontroller.js.map