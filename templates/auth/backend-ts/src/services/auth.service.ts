import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserStore } from "../models/user.model.js";

type RegisterArgs = { email: string; password: string };
type LoginArgs = { email: string; password: string };

function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function getJwtSecret() {
  return mustGetEnv("JWT_SECRET");
}

function getJwtExpiresIn() {
  return process.env.JWT_EXPIRES_IN || "1h";
}

function getSaltRounds() {
  const raw = process.env.BCRYPT_SALT_ROUNDS || "10";
  const n = Number(raw);
  return Number.isFinite(n) && n >= 8 && n <= 15 ? n : 10;
}

export const AuthService = {
  async register(args: RegisterArgs) {
    const existing = await UserStore.findByEmail(args.email);
    if (existing) {
      const err: any = new Error("User exists");
      err.code = "USER_EXISTS";
      throw err;
    }

    const passwordHash = await bcrypt.hash(args.password, getSaltRounds());
    const user = await UserStore.create({ email: args.email, passwordHash });

    const token = jwt.sign({ sub: user.id }, getJwtSecret(), { expiresIn: getJwtExpiresIn() });
    return { token, user: { id: user.id, email: user.email } };
  },

  async login(args: LoginArgs) {
    const user = await UserStore.findByEmail(args.email);
    if (!user) {
      const err: any = new Error("Invalid credentials");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }

    const ok = await bcrypt.compare(args.password, user.passwordHash);
    if (!ok) {
      const err: any = new Error("Invalid credentials");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }

    const token = jwt.sign({ sub: user.id }, getJwtSecret(), { expiresIn: getJwtExpiresIn() });
    return { token, user: { id: user.id, email: user.email } };
  }
};

