import { objectType, stringArg } from "@nexus/schema";
import bcrypt from "bcryptjs";
import { IncorrectPassword, UserNotFound } from "../../errors/Errors";
import hashPassword from "../../utils/hashPassword";
import signToken from "../../utils/signToken";

const Mutation = objectType({
   name: "Mutation",
   definition(t) {
      t.crud.createOneTrade({ alias: "CreateNewTrade" });
      t.crud.updateOneTrade({ alias: "UpdateOneTrade" });
      t.crud.deleteOneTrade({ alias: "DeleteTrade" });
      t.field("CreateNewUser", {
         type: "User",
         args: {
            username: stringArg({
               required: true,
               description: "username of user",
            }),
            password: stringArg({
               required: true,
               description: "password of user",
            }),
         },
         resolve: async (root, { username, password }, { prisma, res }) => {
            const hashedPassword = await hashPassword(password);
            const newUser = await prisma.user.create({
               data: {
                  username,
                  password: hashedPassword,
               },
            });
            return newUser;
         },
      });
      t.field("Login", {
         type: "User",
         args: {
            username: stringArg({
               required: true,
               description: "username of user",
            }),
            password: stringArg({
               required: true,
               description: "password of user",
            }),
         },
         resolve: async (root, { username, password }, { prisma, res }) => {
            const user = await prisma.user.findOne({ where: { username } });

            if (!user) {
               throw UserNotFound(username);
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
               throw IncorrectPassword();
            }
            signToken(user.id, res);
            return user;
         },
      });
   },
});

export default Mutation;
