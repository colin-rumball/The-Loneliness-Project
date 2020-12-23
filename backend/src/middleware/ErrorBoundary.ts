const ErrorBoundary = async (resolve, parent, args, ctx, info) => {
   try {
      const result = await resolve(parent, args, ctx, info);
      return result;
   } catch (err) {
      return err;
   }
};

export default ErrorBoundary;
