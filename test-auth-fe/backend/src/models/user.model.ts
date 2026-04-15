import crypto from "node:crypto";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

const usersByEmail = new Map<string, User>();

export const UserStore = {
  async findByEmail(email: string): Promise<User | undefined> {
    return usersByEmail.get(email);
  },

  async create(args: { email: string; passwordHash: string }): Promise<User> {
    const now = new Date().toISOString();
    const user: User = {
      id: crypto.randomUUID(),
      email: args.email,
      passwordHash: args.passwordHash,
      createdAt: now,
      updatedAt: now
    };
    usersByEmail.set(user.email, user);
    return user;
  }
};

