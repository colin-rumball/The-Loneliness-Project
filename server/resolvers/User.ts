import isLoggedIn from "../serverUtils/isLoggedIn";

const User = {
   posts: {
      fragment: "fragment userId on User { id }",
      resolve(parent, args, { prisma }, info) {
         return prisma.query.posts({
            where: {
               published: true,
               author: {
                  id: parent.id
               }
            }
         });
      }
   },
   email: {
      fragment: "fragment userId on User { id }",
      resolve(parent, args, { request, user }, info) {
         if (isLoggedIn(user, false)) {
            if (user.id && user.id === parent.id) {
               return parent.email;
            } else {
               return null;
            }
         }
      }
   }
};

export default User;
