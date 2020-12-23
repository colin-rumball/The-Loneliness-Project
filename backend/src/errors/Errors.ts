import { SevenBoom } from "graphql-apollo-errors";

export enum Error {
   USER_NOT_LOGGED_IN = "USER_NOT_LOGGED_IN",
   USER_NOT_FOUND = "USER_NOT_FOUND",
   INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
}

export const IncorrectPassword = () =>
   SevenBoom.create(401, "Incorrect password.", {
      code: Error.INCORRECT_PASSWORD,
   });

export const UserNotLoggedIn = () =>
   SevenBoom.forbidden("You must login to do that.", {
      code: Error.USER_NOT_LOGGED_IN,
   });

export const UserNotFound = (username) =>
   SevenBoom.notFound(`User with id: ${username} not found`, {
      username,
      code: Error.USER_NOT_FOUND,
   });
