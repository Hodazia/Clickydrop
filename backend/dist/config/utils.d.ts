import z from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SocialpostSchema: z.ZodObject<{
    platform: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=utils.d.ts.map