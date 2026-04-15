import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

function getJwtSecret() {
  const v = process.env.JWT_SECRET;
  if (!v) throw new Error("Missing env var: JWT_SECRET");
  return v;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;
  if (!token) {
    return res.status(401).json({ message: "missing bearer token" });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret()) as any;
    const userId = typeof payload?.sub === "string" ? payload.sub : undefined;
    if (!userId) return res.status(401).json({ message: "invalid token" });
    req.userId = userId;
    return next();
  } catch {
    return res.status(401).json({ message: "invalid token" });
  }
}

