import jwt from "jsonwebtoken";

const generateToken = userId => {
   const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 30);
   return [
      jwt.sign({ userId }, process.env.SECRET_PD_JWT_SECRET, { expiresIn: "30d" }),
      {
         secure: process.env.PD_STAGING_ENVIRONMENT == "production",
         httpOnly: true,
         expires: expiryDate
      }
   ];
};

export { generateToken as default };
