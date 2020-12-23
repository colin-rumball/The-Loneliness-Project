import { ApartmentWhereInput, ApartmentOrderByInput } from "../generated/prisma-client";
import ResolverContainer from "./common";
import isLoggedIn from "../serverUtils/isLoggedIn";

const Query: ResolverContainer = {
   async users(parent, args, { request, prisma }, info) {
      // Check if they are logged in
      isLoggedIn(request);

      const opArgs: any = {
         first: args.first,
         skip: args.skip,
         after: args.after,
         orderBy: args.orderBy
      };

      return prisma.users(opArgs);
   },
   async apartment(parent, args, { prisma }, info) {
      return prisma.apartment({
         id: args.id
      });
   },
   async apartmentByNumber(parent, args, { prisma }, info) {
      return prisma.apartment({
         apt: args.apt
      });
   },
   async apartments(parent, args, { request, prisma }, info) {
      const opArgs: {
         where?: ApartmentWhereInput;
         orderBy?: ApartmentOrderByInput;
         skip?: number;
         after?: string;
         before?: string;
         first?: number;
         last?: number;
      } = {
         first: args.first,
         skip: args.skip,
         after: args.after,
         orderBy: args.orderBy,
         where: !request.userId
            ? { published: true }
            : {
                 published: args.published
              }
      };

      if (args.query) {
         opArgs.where.OR = [
            {
               searchField_contains: args.query
            }
         ];
      }

      return prisma.apartments(opArgs);
   },
   async apartmentsCount(parent, args, { prisma }, info) {
      return prisma
         .apartmentsConnection()
         .aggregate()
         .count();
   },
   async me(parent, args, { prisma, request, response }, info) {
      // Check if there is a current user ID
      if (!request.userId) {
         return null;
      }
      return prisma.user({ id: request.userId });
   }
};

export { Query as default };
