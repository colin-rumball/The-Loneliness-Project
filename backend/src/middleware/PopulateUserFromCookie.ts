import jwt from "jsonwebtoken";
import signToken from "../utils/signToken";

const PopulateUserFromCookie = async (resolve, parent, args, ctx, info) => {
   // Grab token from cookie
   const { token } = ctx.req.cookies;
   if (!token) return resolve();

   // Decode user id from token
   const { userId } = jwt.verify(token, process.env.JWT_SECRET);
   if (!userId) return resolve();

   // if their id isn't a number then forget it
   if (typeof userId != "number") {
      return resolve();
   }

   // Store user object in context
   ctx.user = await ctx.prisma.user.findOne({ where: { id: userId } });
   return resolve();
};

export default PopulateUserFromCookie;
