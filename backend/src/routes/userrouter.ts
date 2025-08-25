import express from "express";

const router = express.Router();
import { verifyToken } from "../middlewares/auth";
import { Signup,Signin, GetData } from "../controller/usercontroller";


router.post("/signup",Signup);
router.post("/signin",Signin);
router.get("/me",verifyToken,GetData)
export default router;
