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
         published
      }
   }
`;

export const APARTMENT_BY_NUMBER = gql`
   query ApartmentByNumber($apt: Int) {
      apartmentByNumber(apt: $apt) {
         id
         apt
         name
         age
         mostLonely
         lonelinessMeans
         firstTime
         lastTime
         published
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
      $published: Boolean
   ) {
      apartments(
         query: $query
         first: $first
         skip: $skip
         after: $after
         orderBy: $orderBy
         published: $published
      ) {
         id
         apt
         published
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
         user {
            id
            username
         }
         expiryDate
      }
   }
`;
