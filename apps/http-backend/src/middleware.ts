import { JWT_SECRET } from "@repo/env/envs";
import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const middleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Token not found. Unauthorized." });
    return;
  }

  try {
    const decoded = verify(token, JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
