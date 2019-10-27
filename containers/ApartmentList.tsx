import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW } from "../gql/queries";
import useGQLErrorHandler from "../hooks/useGQLErrorHandler";
import { FaEdit } from "react-icons/fa";

const ApartmentList: React.FC = () => {
   const { data, loading } = useQuery(APARTMENTS_OVERVIEW, {
      onCompleted(data) {
         console.log("TCL: {} -> data", data);
      },
      onError: useGQLErrorHandler
   });

   const StyledApartmentList = useMemo(
      () => styled.table`
         width: 100%;
         text-align: center;
      `,
      []
   );

   const StyledEditIcon = useMemo(
      () => styled(FaEdit)`
         color: ${({ theme }) => theme.Grey};
         &:hover {
            cursor: pointer;
            color: ${({ theme }) => theme.DarkGrey};
            transition: color 0.3s;
         }
      `,
      []
   );

   if (loading) return <>Loading</>;

   return (
      <StyledApartmentList>
         <tbody>
            <tr>
               <th>Apt Number</th>
               <th>ID</th>
               <th>Edit</th>
            </tr>

            {data &&
               data.apartments &&
               data.apartments.map(apartment => (
                  <tr key={apartment.id}>
                     <td>{apartment.apt}</td>
                     <td>{apartment.id}</td>
                     <td>
                        <StyledEditIcon />
                     </td>
                  </tr>
               ))}
         </tbody>
      </StyledApartmentList>
   );
};

export default ApartmentList;
