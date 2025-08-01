import express, {Request, Response} from "express";
import {connectDB} from "./models/db";
import dotenv from "dotenv"
const app = express();
import userRouter from "./routes/userrouter"
import cookieParser from "cookie-parser"

dotenv.config();
app.use(express.json());

//add a cookie parser
app.use(cookieParser());

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});


// MVC template 

app.use("/api/v1/user",userRouter);
app.listen(3000, () => {
    connectDB();
  console.log("Server is running on port 3000");
});