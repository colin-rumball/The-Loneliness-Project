import "cross-fetch/polyfill";
import { CREATE_USER, LOGIN, UPDATE_USER, DELETE_USER } from "../../gql/mutations";
import { prisma } from "../generated/prisma-client";
import getClient from "./getClient";
import { ME } from "../../gql/queries";

const admin = {
   username: "admin",
   password: process.env.PD_ADMIN_PASSWORD,
   token: undefined
};

const testUser = {
   username: "Test Creation User",
   newUsername: "Test Update User",
   password: "password",
   id: undefined,
   token: undefined
};

beforeAll(async () => {
   jest.setTimeout(20000);
   await prisma.deleteManyUsers({ NOT: { username: "admin" } });
});

describe("login as admin and create a test user", () => {
   test("Should login as admin", async () => {
      const client = getClient();
      const response = await client.mutate({
         mutation: LOGIN,
         variables: { data: { username: admin.username, password: admin.password } }
      });
      expect(response.data.login.token).toBeTruthy();
      admin.token = response.data.login.token;
   });
   test("Should create a new user as admin", async () => {
      const client = getClient(admin.token);
      const response = await client.mutate({
         mutation: CREATE_USER,
         variables: { data: { username: "Test User", password: "password" } }
      });
      const exists = await prisma.$exists.user({
         id: response.data.createUser.user.id
      });
      expect(exists).toBe(true);
      expect(response.data.createUser.token).toBeTruthy();
      testUser.id = response.data.createUser.user.id;
      testUser.token = response.data.createUser.token;
   });
});

describe("update username and password of test user, and get user object", () => {
   test("Should change the users name and password", async () => {
      const client = getClient(testUser.token);
      const response = await client.mutate({
         mutation: UPDATE_USER,
         variables: { data: { username: testUser.newUsername, password: "password2" } }
      });
      expect(response.data.updateUser.id).toBe(testUser.id);
      expect(response.data.updateUser.username).toBe(testUser.newUsername);
   });

   test("Should get the user object of the test user", async () => {
      const client = getClient(testUser.token);
      const response = await client.query({
         query: ME
      });
      expect(response.data.me.id).toBe(testUser.id);
      expect(response.data.me.username).toBe(testUser.newUsername);
   });
});

describe("delete the test user as the admin", () => {
   test("Should delete the test user", async () => {
      const client = getClient(admin.token);
      const response = await client.mutate({
         mutation: DELETE_USER,
         variables: { userId: testUser.id }
      });
      expect(response.data.deleteUser.id).toBe(testUser.id);
      expect(response.data.deleteUser.username).toBe(testUser.newUsername);
   });
});
