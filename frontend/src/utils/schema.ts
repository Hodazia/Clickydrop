import z, { email } from "zod";

export const BACKEND_URL = 'http://localhost:3000/api/v1/user'
export const signupSchema = z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string()
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


