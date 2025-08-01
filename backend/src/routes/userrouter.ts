import express from "express";

const router = express.Router();
import {signup} from "../controller/usercontroller"

router.post("/signup",signup);
export default router;
