import express from "express";
import { PostSocial, Socials } from "../controller/socialcontroller";
import { verifyToken } from "../middlewares/auth";

const Socialrouter = express.Router();

Socialrouter.get("/getsocials",verifyToken,Socials);
Socialrouter.post("/postsocials",verifyToken,PostSocial);

export default Socialrouter