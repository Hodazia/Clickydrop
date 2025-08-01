// define the user's controller in here, like sign up, sign in and so on


import express from "express";
import { Request,Response } from "express";
import { signupSchema } from "../config/utils";
import { UserModel } from "../models/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req:Request,res:Response) => {
    // once signed in , u can add a photo to the user's profile
    try {
        const {email,password,username} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

    const {success,data,error} = signupSchema.safeParse({email,password,username});


    if(!success)
    {
        return res.status(400).json({
            "message":"Invalid Credentials "
        })
    }

    // check for an exisitng user
    const existinguser = await UserModel.findOne({email:email});
    if(existinguser)
    {
        return res.status(409).json({
            "message":"user already exists, enter new/unique credentials"
        }
        )
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password:hashedPassword
    });

    console.log('User saved to DB:', user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    const options = {
      httpOnly : true,
      secure : true
    }

    return res
          .status(201)
          .cookie("token",token,options)
          .json({
      message: '✅ User registered',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

    }
    catch(error)
    {
        console.log("Error signing in ",error);
        return res.status(500).json({
            "message":"Internal server error"
        })
    }

}