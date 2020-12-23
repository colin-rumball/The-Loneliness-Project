import { createError } from "apollo-errors";

export enum Error {
   FATAL_ERROR = "FATAL_ERROR",
   USER_NOT_LOGGED_IN = "USER_NOT_LOGGED_IN",
   USER_NOT_FOUND = "USER_NOT_FOUND",
   APARTMENT_NOT_FOUND = "APARTMENT_NOT_FOUND",
   MISSING_INFO = "MISSING_INFO",
   INVALID_ACTION = "INVALID_ACTION",
   INCORRECT_PASSWORD = "INCORRECT_PASSWORD"
}

export const FatalError = createError(Error.FATAL_ERROR, {
   message: "An unexpected error has occurred."
});

export const UserNotLoggedIn = createError(Error.USER_NOT_LOGGED_IN, {
   message: "You must login to do that."
});

export const UserNotFound = createError(Error.USER_NOT_FOUND, {
   message: "A user could not be found for the information provided."
});

export const ApartmentNotFound = createError(Error.APARTMENT_NOT_FOUND, {
   message: "An apartment could not be found for the information provided."
});

export const MissingInfo = (message: string) =>
   createError(Error.MISSING_INFO, {
      message
   });

export const InvalidAction = (message: string) =>
   createError(Error.INVALID_ACTION, {
      message
   });

export const IncorrectPassword = createError(Error.INCORRECT_PASSWORD, {
   message: "Incorrect password."
});
