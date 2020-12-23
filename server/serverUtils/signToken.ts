import jwt from "jsonwebtoken";
import { Response } from "express-serve-static-core";

const signToken = async (userId: string, response?: Response) => {
   // create the JWT token
   const token = jwt.sign({ userId }, process.env.JWT_SECRET);

   if (response !== undefined) {
      // Set the jwt as a cookie on the response
      response.cookie("token", token, {
         httpOnly: true,
         domain: "http://localhost:3000",
         maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
      });
   }

   return token;
};

export default signToken;
