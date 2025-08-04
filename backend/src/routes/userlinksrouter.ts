import express from "express";

const router = express.Router();
import { verifyToken } from "../middlewares/auth";
import { createLinks } from "../controller/linkscontroller";
import multer from "multer"
// all of these routes are authenticated routes
/*
when u try to add, u need to be sign in and have a cookie, which
will be sent by the browser without us manually sharing the cookies
in the headers,

Same is true for delete, modify

*/

// have a place to store all your files,
const upload = multer({ storage: multer.memoryStorage() });


router.post("/add", verifyToken, upload.single("image"), createLinks);
router.post("/delete", verifyToken);
export default router;
