import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW, APARTMENT_DETAILED } from "../gql/queries";
import useGQLErrorHandler from "../hooks/useGQLErrorHandler";
import { FaEdit, FaPlusSquare, FaTimes, FaCheck } from "react-icons/fa";
import useModal from "../hooks/useModal";
import Card from "../components/Base/Card";
import EditApartmentModal from "./modals/EditApartmentModal";
import MainTheme from "../styles/themes/MainTheme";

const ApartmentList: React.FC = () => {
   const { pushModal } = useModal();
   const { data, loading } = useQuery(APARTMENTS_OVERVIEW, {
      onError: useGQLErrorHandler
   });

   const [getApartmentDetails, {}] = useLazyQuery(APARTMENT_DETAILED, {
      onCompleted(data) {
         if (data) {
            pushModal({
               html: (
                  <EditApartmentModal
                     modalTitle="Edit Apartment Details"
                     buttonText="Submit"
                     {...data.apartment}
                  />
               )
            });
         }
      },
      onError: useGQLErrorHandler
   });

   const onApartmentClicked = useCallback(async id => {
      try {
         getApartmentDetails({ variables: { id } });
      } catch (err) {
         console.log("TCL: err", err);
      }
   }, []);

   const StyledApartmentList = useMemo(
      () => styled.table`
         width: 100%;
         border-collapse: collapse;
         text-align: center;
         tr {
            &:nth-child(1n + 2) {
               border-bottom: ${({ theme }) => `${theme.LightGrey} 1px solid`};
               color: ${({ theme }) => theme.LightGrey};
               opacity: 0.95;
               transition: all 0.3s;
               &:hover {
                  cursor: pointer;
                  background-color: ${({ theme }) => theme.LightBlue};
                  opacity: 1;
                  color: ${({ theme }) => theme.DarkGrey};
                  td {
                     color: ${({ theme }) => theme.Tan};
                  }
               }
            }
            td {
               padding: 10px;
            }
         }
      `,
      []
   );

   const StyledPublishedIcon = useMemo(
      () => styled(FaCheck)`
         color: ${({ theme }) => theme.Green};
      `,
      []
   );

   const StyledUnpublishedIcon = useMemo(
      () => styled(FaTimes)`
         color: ${({ theme }) => theme.Red};
      `,
      []
   );

   const StyledAddIcon = useMemo(
      () => styled(FaPlusSquare)`
         color: ${({ theme }) => theme.Grey};
         transition: all 0.2s ease;
         &:hover {
            cursor: pointer;
            color: ${({ theme }) => theme.LightBlue};
            transition: color 0.3s;
         }
      `,
      []
   );

   if (loading) return <>Loading</>;

   return (
      <Card
         header={{
            text: "Apartments",
            actions: [
               <StyledAddIcon
                  onClick={() =>
                     pushModal({
                        html: (
                           <EditApartmentModal modalTitle="Create Apartment" buttonText="Create" />
                        )
                     })
                  }
               />
            ]
         }}
      >
         <StyledApartmentList>
            <tbody>
               <tr>
                  <th>Published</th>
                  <th>Apt Number</th>
                  <th>ID</th>
               </tr>

               {data &&
                  data.apartments &&
                  data.apartments.map(apartment => (
                     <tr key={apartment.id} onClick={() => onApartmentClicked(apartment.id)}>
                        <td>
                           {apartment.published ? (
                              <StyledPublishedIcon />
                           ) : (
                              <StyledUnpublishedIcon />
                           )}
                        </td>
                        <td>{apartment.apt}</td>
                        <td>{apartment.id}</td>
                     </tr>
                  ))}
            </tbody>
         </StyledApartmentList>
      </Card>
   );
};

export default ApartmentList;
