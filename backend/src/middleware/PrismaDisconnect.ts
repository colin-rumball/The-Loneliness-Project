const PrismaDisconnect = async (resolve, parent, args, ctx, info) => {
   const ret = await resolve();
   ctx.prisma.disconnect();
   return ret;
};

export default PrismaDisconnect;
