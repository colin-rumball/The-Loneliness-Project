import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import Arrows from "../../components/Arrows";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED, APARTMENT_BY_NUMBER } from "../../gql/queries";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import Spinner from "../../components/Spinner";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";
import { useRouter } from "next/router";

interface ApartmentDetailsModalProps extends ModalBaseProps {
   apartmentsStart: number;
   hideArrows?: boolean;
   apt: number;
}

const ApartmentDetailsModal: React.FC<ApartmentDetailsModalProps> = ({
   apt: originalApartmentNum,
   apartmentsStart,
   hideArrows,
   router,
   apolloClient
}) => {
   const { data, loading, refetch } = useQuery(APARTMENT_BY_NUMBER, {
      client: apolloClient,
      variables: { apt: originalApartmentNum }
   });

   const onArrowClicked = useCallback(
      apt => {
         const href = `/?a=${apt}`;
         router.replace(href, href, {
            shallow: true
         });
         refetch({ apt });
      },
      [router]
   );

   const apartmentData = loading ? {} : data.apartmentByNumber;

   return (
      <ModalBase showSpinner={loading}>
         {loading ? (
            <></>
         ) : (
            <StyledApartmentDetails
               onLeftArrowClicked={onArrowClicked}
               onRightArrowClicked={onArrowClicked}
               showLeftArrow={!hideArrows && apartmentsStart != apartmentData.apt}
               showRightArrow={!hideArrows && apartmentData.apt > 1}
               {...apartmentData}
            />
         )}
      </ModalBase>
   );
};

export default ApartmentDetailsModal;
