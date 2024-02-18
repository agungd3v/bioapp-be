import { NextFunction, Request, Response } from "express";
import { verify } from "./utils/crypto";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({status: 401, message: "akses ditolak"});

    const getToken = token.split("Bearer ")[1] ?? "";
    const user = verify(getToken);

    (global as any).user = user;

    next();
  } catch (error: any) {
    console.log(error.toString());
    return res.status(400).json({status: 400, message: "token kadaluwarsa"});
  }
}

export const getUser = (user: any) => user;

export default middleware;