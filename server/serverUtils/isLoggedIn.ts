import { UserNotLoggedIn } from "../resolvers/errors";
import { RequestWrapper } from "../resolvers/common";

const isLoggedIn = (request: RequestWrapper) => {
   if (!request.userId) {
      throw new UserNotLoggedIn();
   }
};

export default isLoggedIn;
