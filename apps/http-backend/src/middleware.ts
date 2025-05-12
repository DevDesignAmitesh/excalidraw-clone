import { JWT_SECRET } from "@repo/types/types";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const middleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Token not found. Unauthorized." });
    return;
  }

  try {
    const decoded = verify(token, JWT_SECRET!) as {
      userId: string;
    };
    if (decoded.userId) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
