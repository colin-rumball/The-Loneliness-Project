import { rule, shield, and, or, not } from "graphql-shield";
import { UserNotLoggedIn } from "../errors/Errors";

const isAuthenticated = rule({ cache: "contextual" })(async (parent, args, ctx, info) => {
   if (ctx.user == undefined) {
      return UserNotLoggedIn() as any;
   }
   return true;
});

const Permissions = shield({
   Query: {
      // trades: isAuthenticated,
   },
});

export default Permissions;
