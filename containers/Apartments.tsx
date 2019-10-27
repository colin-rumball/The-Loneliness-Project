import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW, APARTMENT_DETAILED } from "../gql/queries";
import useModal from "../hooks/useModal";
import ApartmentDetailsModal from "./modals/ApartmentDetailsModal";

const Apartments: React.FC = () => {
   const { pushModal } = useModal();
   const { data, loading, called } = useQuery(APARTMENTS_OVERVIEW, {
      variables: { query: "", first: 15 }
   });

   const [getDetails, {}] = useLazyQuery(APARTMENT_DETAILED, {
      onCompleted(data) {
         if (data) {
            pushModal({ html: <ApartmentDetailsModal {...data.apartment} /> });
         }
      }
   });

   const StyledApartments = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: row;
         justify-content: center;
         flex-wrap: wrap;
         width: 100%;
         padding-top: 400px;
         min-height: 100vh;

         .apartment-container {
            flex-basis: 33%;
            padding: 0 40px;
            z-index: 99;

            .apartment {
               color: #fff;
               text-align: center;
               padding: 100px 0;
               background: #0b1928;
               user-select: none;

               &:hover {
                  cursor: pointer;
                  color: #000;
                  background: #f5d297;
               }
            }
         }
      `,
      []
   );

   return (
      <StyledApartments>
         {called &&
            !loading &&
            data &&
            data.apartments.map(apartment => {
               return (
                  <div className="apartment-container" key={apartment.id}>
                     <div
                        onClick={() => getDetails({ variables: { id: apartment.id } })}
                        className="apartment"
                     >
                        {apartment.apt}
                     </div>
                  </div>
               );
            })}
      </StyledApartments>
   );
};
// query: $query, first: $first, skip: $skip, after: $after, orderBy: $orderBy
export default Apartments;
