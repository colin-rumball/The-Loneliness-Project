import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import Arrows from "../../components/Arrows";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED, APARTMENT_BY_NUMBER } from "../../gql/queries";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import Spinner from "../../components/Spinner";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";

interface ApartmentDetailsModalProps extends ModalBaseProps {
   apartmentsStart: number;
   hideArrows?: boolean;
   apt: number;
}

const ApartmentDetailsModal: React.FC<ApartmentDetailsModalProps> = ({
   apt: originalApartmentNum,
   apartmentsStart,
   hideArrows,
   apolloClient
}) => {
   const { data, loading, refetch } = useQuery(APARTMENT_BY_NUMBER, {
      client: apolloClient,
      variables: { apt: originalApartmentNum }
   });

   const onArrowClicked = useCallback(apt => {
      refetch({ apt });
   }, []);

   const aparmentData = loading ? {} : data.apartmentByNumber;

   return (
      <ModalBase showSpinner={loading}>
         {loading ? (
            <></>
         ) : (
            <StyledApartmentDetails
               onLeftArrowClicked={onArrowClicked}
               onRightArrowClicked={onArrowClicked}
               showLeftArrow={!hideArrows && apartmentsStart != aparmentData.apt}
               showRightArrow={!hideArrows && aparmentData.apt > 1}
               {...aparmentData}
            />
         )}
      </ModalBase>
   );
};

export default ApartmentDetailsModal;
