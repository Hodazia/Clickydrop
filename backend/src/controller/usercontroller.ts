// define the user's controller in here, like sign up, sign in and so on


import express from "express";
import { Request,Response } from "express";
import { signupSchema,signinSchema } from "../config/utils";
import { UserModel } from "../models/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

/*
The secure: true attribute for a cookie tells the browser to only send 
that cookie over an encrypted HTTPS connection. 
Since both your frontend (http://localhost:5173) and your backend 
(http://localhost:3000) are running on http (an insecure protocol),
 the browser is correctly refusing to send the authentication cookie with 
 the request.

Your verifyToken middleware on the backend is then receiving a request 
with no cookie, leading it to correctly return a 401 Unauthorized status.
 Postman works because it does not enforce the same strict browser 
 security policies.
*/

let options = {
  maxAge: 20 * 60 * 1000, // would expire in 20minutes
  httpOnly: true, // The cookie is only accessible by the web server
  secure: true,
  sameSite: "None",
};


export const signup = async (req:Request,res:Response) => {
    // once signed in ,on the next controllers u can add a photo to the user's profile
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
      password:hashedPassword,
      role:"user"
    });

    console.log('User saved to DB:', user);
    const token = jwt.sign({ id: user._id , role:user.role},
       process.env.JWT_SECRET as string, 
       { expiresIn: '1h' });


       // no need to send cookies
    return res
          .status(201)
          .json({
      message: '✅ User registered',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role:user.role
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

export const signin = async (req:Request,res:Response) => {
  const {email, password} = req.body;
  // extracted the email and password

  const {success,data,error} = signinSchema.safeParse({email,password});

  if(!success)
  {
      return res.status(400).json({
          "message":"Invalid Credentials "
      })
  }

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id:"admin", role: "admin" },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return res
        .cookie("JWttoken", token, 
          {
            maxAge: 20 * 60 * 1000, // would expire in 20minutes
          })
        .status(200)
        .json({
          message: "✅ Logged in as Admin",
          user: {
            username: process.env.ADMIN_USERNAME,
            email,
            role: "admin"
          }})
        }
        // Else, normal user login
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    

    return res.cookie("JWTtoken", token, 
      {
        maxAge: 20 * 60 * 1000, // would expire in 20minutes
      }).
    status(200).json({
      message: "✅ Logged in as User",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }})
  }
  catch(error)
  {
    console.log("Error signing in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

export const logout = async (req:Request,res:Response) => {
  // clear the cookies, 
  res.clearCookie("token");
  return res.status(200).json({
    "message":"Successfully logged out"
  })
}

// it will be having a middleware from the route
export const getMe = async (req:Request,res:Response) => {
  // get the details of the user,
  try{
      //@ts-ignore
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const user = await UserModel.findById(userId).select('username email avatarUrl');


      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ user });
  }
  catch(err)
  {
    console.error('Error fetching user:', err);
    return res.status(500).json({ message: 'Server error' });

  }
}

export const checkAuth = async (req:Request, res:Response) => {
  const token = req.cookies.JWTtoken;
   // Access the cookie sent by the browser

   console.log("the cookies from checkAuth are , " ,token);
  if (token) {
    // could also add logic here to verify the JWT token's validity ??
    // with jwt.verify(token, JWT_SECRET)
    return res.status(200).json({ isAuthenticated: true });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
};

export const sendfeedback = async (req:Request,res:Response) => {
  // 
  // send it to the backend
  const {email,query} = req.body;

  // Validate incoming data (basic validation)
  if (!email || !query) {
      return res.status(400).json(
          { success: false, 
          message: "Please provide name, email, and query." });
  }

// have a general HTML Template for this
const thankYouHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Feedback!</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
      body {
          font-family: "Inter", sans-serif;
      }
  </style>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
  <div class="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full text-center">
      <h1 class="text-4xl font-extrabold text-blue-600 mb-6">Hey User ${email} Thank You!</h1>
      <p class="text-gray-700 text-lg mb-4">
          We sincerely appreciate you taking the time to send us your query/feedback.
          Your input is incredibly valuable and helps us improve our website and services.
      </p>
      <p class="text-gray-700 text-lg mb-4">
          Your query <strong>${query}</strong> , has been received.
      </p>
      <p class="text-gray-700 text-lg mb-6">
          We are constantly working to enhance your experience.
           Please keep an eye out for
          new features and updates in our upcoming versions!
      </p>
      <p class="text-gray-500 text-sm mt-8">
          &copy; 2025 ClickyDrop . All rights reserved.
      </p>
  </div>
</body>
</html>
`;

  // create a nodemailer transport
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zia23hoda@gmail.com', // Your Gmail address
        pass: process.env.GMAIL_APP_AUTH, // Use an App Password (not your Gmail password)
      },
  })

  async function sendEmail() {
      try {
        const mailOptions = {
          from: 'zia23hoda@gmail.com',
          to: email,
          subject: `Feedback Received Successfully `,
          text: 'Hello, this is a plain-text email!',
          html: thankYouHtmlTemplate, // Optional HTML content
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);

        return res.status(200).json(
          { success: true,
           message: "Your query has been sent successfully!" });
      } 
      catch (err) {
        console.error('Error sending email:', err);
        return res.status(500).json(
          { success: false, 
          message: "Failed to send your query. Please try again later." });
      }
    }
    
    sendEmail();      

} 
