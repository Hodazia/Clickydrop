import express from "express";
import { Request, Response } from "express";
export declare const signup: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const signin: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const logout: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getMe: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
//# sourceMappingURL=usercontroller.d.ts.map