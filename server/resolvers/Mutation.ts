import bcrypt from "bcryptjs";
import { ResolveContext } from "../serverUtils/constants";
import hashPassword from "../serverUtils/hashPassword";
import generateToken from "../serverUtils/generateToken";
import { ApartmentCreateInput, ApartmentUpdateInput } from "../generated/prisma-client";
import generateRefreshToken from "../serverUtils/generateRefreshToken";

const Mutation = {
   async login(parent, { data }, { response, prisma }: ResolveContext, info) {
      const user = await prisma.user({
         username: data.username
      });

      if (!user) {
         throw new Error("Unable to login");
      }

      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch) {
         throw new Error("Unable to login");
      }

      const [token, options] = generateToken(user.id);
      response.cookie("token", token, options);

      return user;
   },
   async logout(parent, args, { user, response }: ResolveContext, info) {
      const [token, options] = generateToken(user.id);
      response.cookie("token", "", options);

      return user;
   },
   async createUser(parent, args, { user, response, prisma }: ResolveContext, info) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      if (!args.data.password || !args.data.username) {
         throw new Error("'username' and 'password' Required.");
      }

      const password = await hashPassword(args.data.password);
      const newUser = await prisma.createUser({
         username: args.data.username,
         password
      });

      const [token, options] = generateToken(user.id);
      response.cookie("token", token, options);

      return newUser;
   },
   async deleteUser(parent, args, { prisma, response, user }: ResolveContext, info) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      const userExists = await prisma.$exists.user({
         id: args.userId
      });

      if (!userExists) {
         throw new Error("User doesn't exist.");
      }

      return prisma.deleteUser({
         id: args.userId
      });
   },
   async updateUser(parent, args, { prisma, request, user }: ResolveContext, info) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      args.data.username =
         typeof args.data.username === "string" ? args.data.username : user.username;

      args.data.password =
         typeof args.data.password === "string"
            ? (args.data.password = await hashPassword(args.data.password))
            : user.password;

      return prisma.updateUser({
         where: {
            id: user.id
         },
         data: {
            username: args.data.username,
            password: args.data.password
         }
      });
   },
   createApartment(
      parent,
      { data }: { data: ApartmentCreateInput },
      { prisma, request, user }: ResolveContext,
      info
   ) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      return prisma.createApartment({
         apt: data.apt,
         name: data.name,
         age: data.age,
         mostLonely: data.mostLonely,
         lonelinessMeans: data.lonelinessMeans,
         firstTime: data.firstTime,
         lastTime: data.lastTime,
         published: data.published,
         author: { connect: { id: user.id } }
      });
   },
   async deleteApartment(parent, args, { prisma, response, user }: ResolveContext, info) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      const apartmentExists = await prisma.$exists.apartment({
         id: args.id
      });

      if (!apartmentExists) {
         throw new Error("Unable to delete apartment");
      }

      return prisma.deleteApartment({
         id: args.id
      });
   },
   async updateApartment(
      parent,
      args: { id: string; data: ApartmentUpdateInput },
      { prisma, request, user }: ResolveContext,
      info
   ) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      const apartmentExists = await prisma.$exists.apartment({
         id: args.id
      });

      if (!apartmentExists) {
         throw new Error("Unable to update apartment");
      }

      return prisma.updateApartment({
         where: {
            id: args.id
         },
         data: args.data
      });
   }
   // async createComment(parent, args, { prisma, request, user }: ResolveContext, info) {
   //    if (isLoggedIn(user)) {
   //       const postExists = await prisma.$exists.post({
   //          id: args.data.post,
   //          published: true
   //       });

   //       if (!postExists) {
   //          throw new Error("Unable to find post");
   //       }

   //       return prisma.createComment({
   //          text: args.data.text,
   //          author: {
   //             connect: {
   //                id: user.id
   //             }
   //          },
   //          post: {
   //             connect: {
   //                id: args.data.post
   //             }
   //          }
   //       });
   //    }
   // },
   // async deleteComment(parent, args, { prisma, request, user }: ResolveContext, info) {
   //    if (isLoggedIn(user)) {
   //       const commentExists = await prisma.$exists.comment({
   //          id: args.id,
   //          author: {
   //             id: user.id
   //          }
   //       });

   //       if (!commentExists) {
   //          throw new Error("Unable to delete comment");
   //       }

   //       return prisma.deleteComment({
   //          id: args.id
   //       });
   //    }
   // },
   // async updateComment(parent, args, { prisma, request, user }: ResolveContext, info) {
   //    if (isLoggedIn(user)) {
   //       const commentExists = await prisma.$exists.comment({
   //          id: args.id,
   //          author: {
   //             id: user.id
   //          }
   //       });

   //       if (!commentExists) {
   //          throw new Error("Unable to update comment");
   //       }

   //       return prisma.updateComment({
   //          where: {
   //             id: args.id
   //          },
   //          data: args.data
   //       });
   //    }
   // }
};

export { Mutation as default };
