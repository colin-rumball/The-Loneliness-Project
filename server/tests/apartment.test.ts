import "cross-fetch/polyfill";
import { prisma } from "../generated/prisma-client";
import getClient from "./getClient";
import { LOGIN, CREATE_APARTMENT, UPDATE_APARTMENT, DELETE_APARTMENT } from "../../gql/mutations";
import { APARTMENTS_OVERVIEW, APARTMENT_DETAILED } from "../../gql/queries";

const admin = {
   username: "admin",
   password: process.env.PD_ADMIN_PASSWORD,
   token: undefined
};

const publishedApartmentInfo = {
   id: undefined,
   apt: 1,
   age: "23",
   name: "Bob",
   firstTime: "First Time Public",
   lastTime: "Last Time Public",
   lonelinessMeans: "Loneliness Means Public",
   mostLonely: "Most Lonely Public",
   published: true
};

const hiddenApartmentInfo = {
   id: undefined,
   apt: 2,
   age: "27",
   name: "James",
   firstTime: "First Time Hidden",
   lastTime: "Last Time Hidden",
   lonelinessMeans: "Loneliness Means Hidden",
   mostLonely: "Most Lonely Hidden",
   published: false
};

beforeAll(async () => {
   jest.setTimeout(20000);
   await prisma.deleteManyApartments();
});

describe("login as admin and create a new apartment", () => {
   test("Should login as admin", async () => {
      const client = getClient();
      const response = await client.mutate({
         mutation: LOGIN,
         variables: { data: { username: admin.username, password: admin.password } }
      });
      expect(response.data.login.token).toBeTruthy();
      admin.token = response.data.login.token;
   });

   test("Should create a new published apartment", async () => {
      const client = getClient(admin.token);
      const response = await client.mutate({
         mutation: CREATE_APARTMENT,
         variables: { data: { ...publishedApartmentInfo } }
      });
      const exists = await prisma.$exists.apartment({
         id: response.data.createApartment.id
      });
      expect(exists).toBe(true);
      publishedApartmentInfo.id = response.data.createApartment.id;
   });

   test("Should create a new hidden apartment", async () => {
      const client = getClient(admin.token);
      const response = await client.mutate({
         mutation: CREATE_APARTMENT,
         variables: { data: { ...hiddenApartmentInfo } }
      });
      const exists = await prisma.$exists.apartment({
         id: response.data.createApartment.id
      });
      expect(exists).toBe(true);
      hiddenApartmentInfo.id = response.data.createApartment.id;
   });
});

describe("get published and/or unpublished apartments", () => {
   test("Should get only the published apartment", async () => {
      const client = getClient();
      const response = await client.query({
         query: APARTMENTS_OVERVIEW
      });
      const apartmentMapping = response.data.apartments.map(a => a.id);
      expect(apartmentMapping).toEqual(expect.arrayContaining([publishedApartmentInfo.id]));
      expect(apartmentMapping).toEqual(expect.not.arrayContaining([hiddenApartmentInfo.id]));
   });

   test("Should get all published and unpublished apartments as admin", async () => {
      const client = getClient(admin.token);
      const response = await client.query({
         query: APARTMENTS_OVERVIEW
      });
      const apartmentMapping = response.data.apartments.map(a => a.id);
      expect(apartmentMapping).toEqual(
         expect.arrayContaining([publishedApartmentInfo.id, hiddenApartmentInfo.id])
      );
   });
});

describe("get a specific unpublished apartment and then publish it", () => {
   test("Should get the apartment details of an unpublished apartment as admin", async () => {
      const client = getClient(admin.token);
      const response = await client.query({
         query: APARTMENT_DETAILED,
         variables: { id: hiddenApartmentInfo.id }
      });
      expect(response.data.apartment.apt).toBe(hiddenApartmentInfo.apt);
      expect(response.data.apartment.name).toBe(hiddenApartmentInfo.name);
      expect(response.data.apartment.mostLonely).toBe(hiddenApartmentInfo.mostLonely);
      expect(response.data.apartment.lonelinessMeans).toBe(hiddenApartmentInfo.lonelinessMeans);
      expect(response.data.apartment.firstTime).toBe(hiddenApartmentInfo.firstTime);
      expect(response.data.apartment.lastTime).toBe(hiddenApartmentInfo.lastTime);
   });

   test("Should update the unpublished apartment to be published as admin", async () => {
      const client = getClient(admin.token);
      const response = await client.mutate({
         mutation: UPDATE_APARTMENT,
         variables: { id: hiddenApartmentInfo.id, data: { published: true } }
      });
      expect(response.data.updateApartment.published).toBeTruthy();
   });
});

describe("delete an apartment then fail to retrieve it", () => {
   test("Should delete an apartment as admin", async () => {
      const client = getClient(admin.token);
      const response = await client.mutate({
         mutation: DELETE_APARTMENT,
         variables: { id: publishedApartmentInfo.id }
      });
      expect(response.data.deleteApartment.id).toBe(publishedApartmentInfo.id);
   });

   test("Should be unable to retrieve a deleted apartment as admin", async () => {
      const client = getClient(admin.token);
      const response = await client.query({
         query: APARTMENT_DETAILED,
         variables: { id: publishedApartmentInfo.id }
      });
      expect(response.data.apartment).toBe(null);
      const exists = await prisma.$exists.apartment({ id: publishedApartmentInfo.id });
      expect(exists).toBe(false);
   });
});
