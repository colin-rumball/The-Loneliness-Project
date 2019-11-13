import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import Arrows from "../../components/Arrows";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED, APARTMENT_BY_NUMBER } from "../../gql/queries";
import { ModalBaseProps } from "./ModalBase";
import Spinner from "../../components/Spinner";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";

interface ApartmentDetailsModalProps extends ModalBaseProps {
   apt: number;
}

const ApartmentDetailsModal: React.FC<ApartmentDetailsModalProps> = ({
   apt: originalApartmentNum,
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
   const currentApartmentNumber = !loading && aparmentData.apt;

   return (
      <StyledApartmentDetails loading={loading} {...aparmentData}>
         <Arrows
            currentApt={currentApartmentNumber}
            onLeftArrowClicked={onArrowClicked}
            onRightArrowClicked={onArrowClicked}
         />
      </StyledApartmentDetails>
   );
};

export default ApartmentDetailsModal;
