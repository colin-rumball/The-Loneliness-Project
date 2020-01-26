import { prisma } from "./../server/generated/prisma-client";
import { readFileSync } from "fs";
import hashPassword from "../server/serverUtils/hashPassword";

interface ApartmentNumber {
   $numberInt: string;
}

interface ApartmentData {
   apt: ApartmentNumber;
   name: string;
   age: string;
   most_lonely: string;
   loneliness_means: string;
   first_time: string;
   last_time: string;
   published?: boolean;
}

const seed = async () => {
   console.log("Removing old apartments from database");
   await prisma.deleteManyApartments();
   // console.log("Deleting all users from database");
   // await prisma.deleteManyUsers();
   console.log("Checking if admin user exists");
   const exists = await prisma.$exists.user({ username: "admin" });
   let adminUser;
   if (!exists) {
      console.log("Creating admin user");
      const password = await hashPassword(process.env.PD_ADMIN_PASSWORD);
      adminUser = await prisma.createUser({
         username: "admin",
         password: password
      });
   } else {
      console.log("Getting admin user for seeding");
      adminUser = await prisma.user({
         username: "admin"
      });
   }
   console.log("Reading json");
   const file = readFileSync(`${__dirname}/db.json`, { encoding: "utf8" });
   console.log("Seeding database");
   const apartments: [ApartmentData] = JSON.parse(file);
   for (const apartment of apartments) {
      const searchField: string =
         apartment.name +
         " " +
         apartment.last_time +
         " " +
         apartment.loneliness_means +
         " " +
         apartment.most_lonely +
         " " +
         apartment.most_lonely;
      await prisma.createApartment({
         author: { connect: { id: adminUser.id } },
         apt: Number.parseInt(apartment.apt.$numberInt),
         age: apartment.age,
         name: apartment.name,
         lastTime: apartment.last_time,
         lonelinessMeans: apartment.loneliness_means,
         mostLonely: apartment.most_lonely,
         firstTime: apartment.first_time,
         published: apartment.published ? apartment.published : false,
         searchField: searchField.toLowerCase()
      });
   }
};

seed();
