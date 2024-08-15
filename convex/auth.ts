import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { GenericMutationCtx } from "convex/server";
import { DataModel } from "./_generated/dataModel";
import { ResendOTPPasswordReset } from "./services/passwordReset";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password({ reset: ResendOTPPasswordReset })],
  callbacks: {
   async createOrUpdateUser(ctx: GenericMutationCtx<DataModel>, args) {
     if (args.existingUserId) {
       return args.existingUserId;
     }
     const existingUser = await ctx.db
       .query("users")
       .withIndex("email", (q) => q.eq("email", args.profile.email))
       .first();

     if (existingUser) {
       return existingUser._id;
     }
     return ctx.db.insert("users", {
       email: args.profile.email,
     });
   },
 },
});
