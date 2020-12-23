import jwt from "jsonwebtoken";
import cookie from "cookie";
import { ServerResponse } from "http";

const signToken = async (userId: number, res?: ServerResponse) => {
   // create the JWT token
   const token = jwt.sign({ userId }, process.env.JWT_SECRET);

   if (res !== undefined) {
      const serializedCookie = cookie.serialize("token", token, {
         secure: process.env.STAGING_ENVIRONMENT == "production",
         httpOnly: process.env.STAGING_ENVIRONMENT == "production",
         path: "/",
         maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
      });
      // Set the jwt as a cookie on the response
      res.setHeader("Set-Cookie", serializedCookie);
   }

   return token;
};

export default signToken;
