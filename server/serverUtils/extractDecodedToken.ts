import jwt from "jsonwebtoken";

const extractDecodedToken = request => {
   if (request && request.cookies) {
      const authorizationCookie = request.cookies.token;

      if (
         typeof authorizationCookie == "string" &&
         authorizationCookie != null &&
         authorizationCookie != "null"
      ) {
         const token = authorizationCookie.replace("Bearer ", "");
         if (token != "") {
            try {
               const decoded = jwt.verify(token, process.env.SECRET_PD_JWT_SECRET);
               return decoded;
            } catch (err) {
               throw err;
            }
         }
      }
   }

   return null;
};

export { extractDecodedToken as default };
