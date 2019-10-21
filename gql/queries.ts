import { gql } from "apollo-boost";

export const USERS = gql`
   query Users {
      users {
         id
         username
      }
   }
`;

export const APARTMENT_DETAILED = gql`
   query Apartment($id: String) {
      apartment(id: $id) {
         id
         apt
         name
         age
         mostLonely
         lonelinessMeans
         firstTime
         lastTime
      }
   }
`;

export const APARTMENTS_OVERVIEW = gql`
   query Apartments(
      $query: String
      $first: Int
      $skip: Int
      $after: String
      $orderBy: ApartmentOrderByInput
   ) {
      apartments(query: $query, first: $first, skip: $skip, after: $after, orderBy: $orderBy) {
         id
         apt
      }
   }
`;

export const APARTMENT_COUNT = gql`
   query ApartmentCount {
      apartmentCount
   }
`;

export const ME = gql`
   query Me {
      me {
         id
         username
      }
   }
`;
