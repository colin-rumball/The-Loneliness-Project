import { readFileSync, writeFileSync } from "fs";
import { nanoid } from "nanoid/async";

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

const remap = async () => {
   console.log("Reading json");
   const file = readFileSync(`${__dirname}/db.json`, { encoding: "utf8" });
   console.log("Seeding database");
   const apartments: [ApartmentData] = JSON.parse(file);
   const data = [];
   for (const apartment of apartments) {
      console.log(`Creating apartment ${Number.parseInt(apartment.apt.$numberInt)}`);
      const id = await nanoid();
      data.push({
         apt: Number.parseInt(apartment.apt.$numberInt),
         age: apartment.age,
         name: apartment.name,
         lastTime: apartment.last_time,
         lonelinessMeans: apartment.loneliness_means,
         mostLonely: apartment.most_lonely,
         firstTime: apartment.first_time,
         published: apartment.published ? apartment.published : false,
         id
      });
   }
   writeFileSync(`${__dirname}/../public/stories.json`, JSON.stringify(data));
};

remap();
