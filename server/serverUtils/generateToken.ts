import jwt from "jsonwebtoken";

const generateToken = userId => {
   return jwt.sign({ userId }, process.env.SECRET_PD_JWT_SECRET, { expiresIn: "15 minutes" });
};

export { generateToken as default };
