
import bcrypt, { hash } from "bcryptjs"
import { PrismaClient } from "../generated/prisma";
import { signinSchema, signupSchema } from "../config/utils";
import { Request,Response } from "express";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const Signup = async (req:Request,res:Response) => {
  // let the user signup here
  /*
  the user shall be unique to get signup here,
  */
 try {

 const { success } = signupSchema.safeParse(req.body);
 if(!success)
 {
  return res.status(404).json({
    "message":"Provide correct credentials"
  })
 }

 const { username,email,password} = req.body;
 if(!username || !email || !password)
 {
  return res.status(403).json({
    "message":"Provide all the credentials"
  })
 }
 // Check if user exists
 const existingUser = await prisma.user.findFirst({
  where: {
    OR: [{ email }, { username }],
  },
});

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
 // Hash the password before putting it in DB
 // put the data in the DB

 const hashedpswd = await bcrypt.hash(password,10);

 const result =  await prisma.user.create({
  data:{
    username:username,
    email:email,
    password:hashedpswd
  }
 })

 return res.status(201).json({
  "message":"User registered successfully",
  username,
  email
 })
 }
 catch(err)
 {
  return res.status(500).
  json({
    "message":"there is an error signing up"
  })
 }
}

export const Signin = async (req:Request,res:Response) =>{
  // sign in to the user
  try {
    const { success} = signinSchema.safeParse(req.body)
    if(!success)
    {
      return res.status(400).json({
        "message":"Provide correct structure for the sign in"
      })
    }
    const {email,password} = req.body;
    const user = await prisma.user.findFirst({
      where:{
        OR: [{ email }],
      }
    })

    if(!user)
    {
      return res.status(404).json({
        "message":"User doesn't exists, first sign up"
      })
    }
    // check if the password matches

    // maintain this order of comparing , first the password from req.body,
    const pswdvalid = await bcrypt.compare(password,user.password);
    if (!pswdvalid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("USer id ", user.id);

    const token = jwt.sign({userid:user.id},process.env.JWT_SECRET as string);
    return res.status(200).json({
      "message":"user signed in successfully!",
      token:token,
      email:user.email,
      username:user.username
    })

  }
  catch(err)
  {
    return res.status(500).json({
      "message":"Error signing in to the app"
    })
  }
}

export const GetData = async (req:Request, res:Response) => {
  // get the details of the user
  //@ts-ignore
  const userid = req.tokenuserid as number;
  const user = await prisma.user.findFirst({
    where:{  id:userid }
  });

  return res.status(200).json({
    "username":user?.username,
    "email":user?.email,
  })
}