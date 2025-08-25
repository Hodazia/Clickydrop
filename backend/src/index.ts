import express, {Request, Response} from "express";
import {connectDB} from "./models/db";
import dotenv from "dotenv"
const app = express();
import userRouter from "./routes/userrouter"
import linkRouter from "./routes/userlinksrouter"

import cookieParser from "cookie-parser"
import cors from "cors";
import { PrismaClient } from "./generated/prisma";
import Socialrouter from "./routes/socialrouter";

const prisma = new PrismaClient();

async function createuser(username:string,email:string,password:string)
{
  // define a user
  const res = await prisma.user.create({
    data: {
        username,
        password,
        email
    }
  })
  console.log(res);
}

async function getUser(username: string) {
  //
}

dotenv.config();
app.use(express.json());

//add a cookie parser
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
// define which frontend website can access the backend, 

// important configurations for the fe+be to remain sync
app.use(cors({
  origin: "http://localhost:5173", // Make sure this matches your frontend's URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});


// MVC template 

app.use("/api/v1/user",userRouter); // for the users. 
app.use("/api/v1/social",Socialrouter); // for the social media links




// for the links , 
app.use("/api/v1/links",linkRouter);

app.listen(3000, () => {
    connectDB();
    // createuser("ZIA#243","zia23hoda@gmail.com","zia23hoda");
    
    console.log("Server is running on port 3000");
});