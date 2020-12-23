import { objectType } from "nexus";

const User = objectType({
   name: "User",
   definition(t) {
      t.int("id");
      t.string("username");
   }
});

export default User;
