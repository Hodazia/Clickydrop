// define some utils file here, like zod schema validation,

import z, { email } from "zod";

export const signupSchema = z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string()
})

export const signinSchema = z.object({
    email:z.string().email(),
    password:z.string()
})

export const SocialpostSchema = z.object({
    platform: z.string(),
    url:z.string()
})