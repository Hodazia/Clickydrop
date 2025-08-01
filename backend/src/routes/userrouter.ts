import express from "express";

const router = express.Router();
import {signup,signin,logout,getMe} from "../controller/usercontroller"
import { verifyToken } from "../middlewares/auth";

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/logout",logout);
router.get("/me", verifyToken, getMe);
export default router;
