import express, {Request, Response} from "express";
import {connectDB} from "./models/db";
import dotenv from "dotenv"
const app = express();
import userRouter from "./routes/userrouter"

dotenv.config();
app.use(express.json());
app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});

// MVC template 

app.use("/api/v1/user",userRouter);
app.listen(3000, () => {
    connectDB();
  console.log("Server is running on port 3000");
});