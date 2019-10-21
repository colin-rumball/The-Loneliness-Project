const teardown = async () => {
   if (global.hasOwnProperty("testGQLServer")) {
      console.log("Closing test GQL server");
      (global as any).testGQLServer.close();
   }
};

export default teardown;
