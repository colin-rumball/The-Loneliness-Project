import jwt from "jsonwebtoken";

const generateRefreshToken = userId => {
   const token = jwt.sign({ userId }, process.env.SECRET_PD_JWT_SECRET, {
      expiresIn: "7 days"
   });
   const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
   return [
      token,
      {
         secure: process.env.PD_STAGING_ENVIRONMENT == "production",
         httpOnly: true,
         expires: expiryDate
      }
   ];
};

export { generateRefreshToken as default };
