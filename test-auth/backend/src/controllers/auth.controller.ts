import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

function getString(body: any, key: string): string | undefined {
  const v = body?.[key];
  return typeof v === "string" ? v : undefined;
}

export async function register(req: Request, res: Response) {
  const email = getString(req.body, "email")?.trim().toLowerCase();
  const password = getString(req.body, "password");
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const result = await AuthService.register({ email, password });
    return res.status(201).json(result);
  } catch (e: any) {
    if (e?.code === "USER_EXISTS") {
      return res.status(409).json({ message: "user already exists" });
    }
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  const email = getString(req.body, "email")?.trim().toLowerCase();
  const password = getString(req.body, "password");
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const result = await AuthService.login({ email, password });
    return res.status(200).json(result);
  } catch (e: any) {
    if (e?.code === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(500).json({ message: "internal server error" });
  }
}

