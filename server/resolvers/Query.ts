import { ResolveContext } from "../serverUtils/constants";
import { ApartmentWhereInput, ApartmentOrderByInput } from "../generated/prisma-client";
import { AuthenticationError } from "../../gql/errors";
import extractDecodedToken from "../serverUtils/extractDecodedToken";

const Query = {
   async users(parent, args, { user, request, prisma }: ResolveContext, info) {
      if (!user) {
         throw new AuthenticationError();
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
   async apartmentsCount(parent, args, { prisma }: ResolveContext, info) {
      return prisma
         .apartmentsConnection()
         .aggregate()
         .count();
   },
   async me(parent, args, { prisma, request, response, user }: ResolveContext, info) {
      if (!user) {
         return null;
      }

      const token = extractDecodedToken(request);

      return {
         expiryDate: token.expiryDate,
         user
      };
   }
};

export { Query as default };
