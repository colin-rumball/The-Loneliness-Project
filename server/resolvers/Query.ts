import { ResolveContext } from "../serverUtils/constants";
import { ApartmentWhereInput, ApartmentOrderByInput } from "../generated/prisma-client";

const Query = {
   async users(parent, args, { user, request, prisma }: ResolveContext, info) {
      if (!user) {
         throw new Error("Authentication Required");
      }

      const opArgs: any = {
         first: args.first,
         skip: args.skip,
         after: args.after,
         orderBy: args.orderBy
      };

      return prisma.users(opArgs);
   },
   async apartment(parent, args, { prisma }: ResolveContext, info) {
      return prisma.apartment({
         id: args.id
      });
   },
   async apartmentByNumber(parent, args, { prisma }: ResolveContext, info) {
      return prisma.apartment({
         apt: args.apt
      });
   },
   async apartments(parent, args, { user, prisma }: ResolveContext, info) {
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
         where: !user
            ? {}
            : {
                 published: args.published
              }
      };

      if (args.query) {
         opArgs.where.OR = [
            {
               name_contains: args.query
            },
            {
               mostLonely_contains: args.query
            },
            {
               lonelinessMeans_contains: args.query
            },
            {
               firstTime_contains: args.query
            },
            {
               lastTime_contains: args.query
            }
         ];
      }

      return prisma.apartments(opArgs);
   },
   async apartmentsCount(parent, args, { prisma }: ResolveContext, info) {
      return prisma
         .apartmentsConnection()
         .aggregate()
         .count();
   },
   me(parent, args, { prisma, request, user }: ResolveContext, info) {
      if (!user) {
         return null;
      }

      return prisma.user({
         id: user.id
      });
   }
};

export { Query as default };
