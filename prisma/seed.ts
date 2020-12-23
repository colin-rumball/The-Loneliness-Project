import { readFileSync } from "fs";
import hashPassword from "../server/serverUtils/hashPassword";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
   await prisma.story.deleteMany();
   // console.log("Deleting all users from database");
   // await prisma.deleteManyUsers();
   console.log("Checking if admin user exists");
   let adminUser = await prisma.user.findFirst({ where: { username: "admin" } });
   if (!adminUser) {
      console.log("Creating admin user");
      const password = await hashPassword(process.env.PD_ADMIN_PASSWORD);
      adminUser = await prisma.user.create({
         data: {
            username: "admin",
            password: password
         }
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
		console.log(`Creating apartment ${Number.parseInt(apartment.apt.$numberInt)}`)
      await prisma.story.create({
         data: {
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
         }
      });
	}
	console.log("Seeding complete");
};

seed();
