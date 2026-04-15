import crypto from "node:crypto";

export const UserStore = (() => {
  /** @type {Map<string, any>} */
  const usersByEmail = new Map();

  return {
    async findByEmail(email) {
      return usersByEmail.get(email);
    },

    async create({ email, passwordHash }) {
      const now = new Date().toISOString();
      const user = {
        id: crypto.randomUUID(),
        email,
        passwordHash,
        createdAt: now,
        updatedAt: now
      };
      usersByEmail.set(user.email, user);
      return user;
    }
  };
})();

