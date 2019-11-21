import { createError } from "apollo-errors";

export enum ErrorNames {
   AUTHENTICATION_REQUIRED = "AUTHENTICATION_REQUIRED"
}

export const AuthenticationError = createError(ErrorNames.AUTHENTICATION_REQUIRED, {
   message: "Authentication is required for the action requested."
});
