import { FatalError } from "../resolvers/errors";

const ResolverErrorBoundary = async (resolve, root, args, context, info) => {
   try {
      const result = await resolve(root, args, context, info);
      return result;
   } catch (err) {
      // Due to the fact that we are using Prisma, we can assume
      // that each error from this layer has a `path` attribute.
      if (err.path) {
         throw new FatalError({ data: { reason: err.message } });
      } else {
         throw err;
      }
   }
};

export default ResolverErrorBoundary;
