import { UserNotLoggedIn } from "../errors/Errors";

const isLoggedIn = (request: any) => {
   if (!request.userId) {
      throw UserNotLoggedIn();
   }
};

export default isLoggedIn;
