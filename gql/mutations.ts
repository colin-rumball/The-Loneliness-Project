import { gql } from "apollo-boost";

export const LOGIN = gql`
   mutation Login($data: LoginUserInput!) {
      login(data: $data) {
         token
         user {
            id
            username
         }
      }
   }
`;

export const CREATE_USER = gql`
   mutation CreateUser($data: CreateUserInput!) {
      createUser(data: $data) {
         token
         user {
            id
            username
         }
      }
   }
`;

export const DELETE_USER = gql`
   mutation DeleteUser($userId: String!) {
      deleteUser(userId: $userId) {
         id
         username
      }
   }
`;

export const UPDATE_USER = gql`
   mutation UpdateUser($data: UpdateUserInput!) {
      updateUser(data: $data) {
         id
         username
      }
   }
`;

export const CREATE_APARTMENT = gql`
   mutation CreateApartment($data: ApartmentCreateInput!) {
      createApartment(data: $data) {
         id
      }
   }
`;

export const DELETE_APARTMENT = gql`
   mutation DeleteApartment($id: ID!) {
      deleteApartment(id: $id) {
         id
      }
   }
`;

export const UPDATE_APARTMENT = gql`
   mutation UpdateApartment($id: ID!, $data: ApartmentUpdateInput!) {
      updateApartment(id: $id, data: $data) {
         id
         published
      }
   }
`;
