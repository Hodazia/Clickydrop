"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//@ts-ignore
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'Clickydrop' }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve({ secure_url: result.secure_url }); // an object secure_url:{https://lnsdvslnvs}
        });
        stream_1.Readable.from(file.buffer).pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=cloudinary.js.map