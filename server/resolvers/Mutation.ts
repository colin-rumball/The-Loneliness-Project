import bcrypt from "bcryptjs";
import hashPassword from "../serverUtils/hashPassword";
import { ApartmentCreateInput, ApartmentUpdateInput } from "../generated/prisma-client";
import ResolverContainer from "./common";
import {
   UserNotFound,
   IncorrectPassword,
   MissingInfo,
   InvalidAction,
   ApartmentNotFound
} from "./errors";
import signToken from "../serverUtils/signToken";
import isLoggedIn from "../serverUtils/isLoggedIn";

const Mutation: ResolverContainer = {
   async login(parent, { data }, { response, prisma }, info) {
      // Check if there is a user with that email
      const user = await prisma.user({ username: data.username });
      if (!user) {
         throw new UserNotFound();
      }
      // Check if their password is correct
      const valid = await bcrypt.compare(data.password, user.password);
      if (!valid) {
         throw new IncorrectPassword();
      }
      signToken(user.id, response);
      return user;
   },
   async logout(parent, args, { response }, info) {
      response.clearCookie("token");
      return { message: "Goodbye!" };
   },
   async createUser(parent, args, { request, response, prisma }, info) {
      isLoggedIn(request);

      if (!args.data.username || !args.data.password) {
         throw new (MissingInfo("A username and password must be provided."))();
      }

      const password = await hashPassword(args.data.password);
      return await prisma.createUser({
         username: args.data.username,
         password
      });
   },
   async deleteUser(parent, args, { request, prisma, response }, info) {
      isLoggedIn(request);

      const deletedUser = await prisma.user({
         id: args.userId
      });

      if (!deletedUser) {
         throw new UserNotFound();
      }

      if (deletedUser.username === "admin") {
         throw new (InvalidAction("Can't delete admin user."))();
      }

      return prisma.deleteUser({
         id: args.userId
      });
   },
   async updateUser(parent, args, { prisma, request }, info) {
      isLoggedIn(request);

      args.data.username =
         typeof args.data.username === "string" ? args.data.username : request.user.username;

      args.data.password =
         typeof args.data.password === "string"
            ? (args.data.password = await hashPassword(args.data.password))
            : request.user.password;

      return prisma.updateUser({
         where: {
            id: request.user.id
         },
         data: {
            username: args.data.username,
            password: args.data.password
         }
      });
   },
   createApartment(parent, { data }: { data: ApartmentCreateInput }, { prisma, request }, info) {
      isLoggedIn(request);

      return prisma.createApartment({
         apt: data.apt,
         name: data.name,
         age: data.age,
         mostLonely: data.mostLonely,
         lonelinessMeans: data.lonelinessMeans,
         firstTime: data.firstTime,
         lastTime: data.lastTime,
         published: data.published,
         author: { connect: { id: request.user.id } }
      });
   },
   async deleteApartment(parent, args, { request, prisma, response }, info) {
      isLoggedIn(request);

      const apartmentExists = await prisma.$exists.apartment({
         id: args.id
      });

      if (!apartmentExists) {
         throw new ApartmentNotFound();
      }

      return prisma.deleteApartment({
         id: args.id
      });
   },
   async updateApartment(
      parent,
      args: { id: string; data: ApartmentUpdateInput },
      { prisma, request },
      info
   ) {
      isLoggedIn(request);

      const apartmentExists = await prisma.$exists.apartment({
         id: args.id
      });

      if (!apartmentExists) {
         throw new ApartmentNotFound();
      }

      return prisma.updateApartment({
         where: {
            id: args.id
         },
         data: args.data
      });
   }
};

export { Mutation as default };
