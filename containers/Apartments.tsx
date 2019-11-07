import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW, APARTMENT_DETAILED } from "../gql/queries";
import useModal from "../hooks/useModal";
import ApartmentDetailsModal from "./modals/ApartmentDetailsModal";

const Apartments: React.FC = () => {
   const { pushModal } = useModal();
   const { data, loading, called } = useQuery(APARTMENTS_OVERVIEW, {
      variables: { query: "", first: 15, orderBy: "apt_DESC" }
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

         .roof {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            flex-basis: 33%;
            z-index: 40;

            &.left {
               transform: translateY(17%);
               padding: 0 20px 0 40px;
               img {
                  margin-left: -2%;
                  width: 104.9%;
               }
            }

            &.center {
               padding: 0 20px 0 20px;
               img {
                  margin-left: -2.1%;
                  width: 104.8%;
               }
            }

            &.right {
               padding: 0 40px 0 20px;
               transform: translateY(17%);
               img {
                  margin-left: -4%;
                  width: 108.2%;
               }
            }
         }

         .apartment-container {
            position: relative;
            flex-basis: 33%;
            padding: 0 20px;
            z-index: 40;

            &:nth-child(3n) {
               transform: translateY(10.5%);
               padding: 0 40px 0 20px;
            }

            &:nth-child(3n + 1) {
               transform: translateY(10.5%);
               padding: 0 20px 0 40px;
            }

            .apartment {
               position: relative;
               pointer-events: none;
               max-width: 100%;
               min-height: 100%;
            }

            .backer {
               position: absolute;
               top: 5px;
               left: 45px;
               right: 45px;
               bottom: 5px;
               background: #85c0d0;
               transition: background 0.4s ease;

               &:hover {
                  cursor: pointer;
                  background: #f5d297;
               }
            }
         }
      `,
      []
   );

   const StyledStoreFront = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         flex-basis: 33%;
         z-index: 40;

         .left {
            margin-left: -3px;
            width: 101.5%;
            transform: translateY(11%);
            padding: 0 20px 0 40px;
         }

         .center {
            margin-left: -5px;
            width: 104.5%;
            padding: 0 20px;
         }

         .right {
            margin-left: -3px;
            width: 101.5%;
            transform: translateY(11%);
            padding: 0 40px 0 20px;
         }
      `,
      []
   );

   return (
      <StyledApartments>
         <div className="roof left">
            <img src="/static/apartments/roof_3.png" alt="apartment-roof-3" />
         </div>
         <div className="roof center">
            <img src="/static/apartments/roof_2.png" alt="apartment-roof-2" />
         </div>
         <div className="roof right">
            <img src="/static/apartments/roof_1.png" alt="apartment-roof-1" />
         </div>
         {called &&
            !loading &&
            data &&
            data.apartments.map(apartment => {
               return (
                  <div className="apartment-container" key={apartment.id}>
                     <div className="backer"></div>
                     <img
                        src="/static/apartments/storey_284.png"
                        onClick={() => getDetails({ variables: { id: apartment.id } })}
                        className="apartment"
                     />

                     {/* {apartment.apt} */}
                     {/* </div> */}
                  </div>
               );
            })}
         <StyledStoreFront>
            <img className="left" src="/static/apartments/store_3.png" alt="store 3" />
         </StyledStoreFront>
         <StyledStoreFront>
            <img className="center" src="/static/apartments/store_2.png" alt="store 2" />
         </StyledStoreFront>
         <StyledStoreFront>
            <img className="right" src="/static/apartments/store_1.png" alt="store 1" />
         </StyledStoreFront>
      </StyledApartments>
   );
};
// query: $query, first: $first, skip: $skip, after: $after, orderBy: $orderBy
export default Apartments;
