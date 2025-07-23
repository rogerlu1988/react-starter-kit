import { query } from "./_generated/server";

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserCount = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return { count: users.length, users };
  },
});