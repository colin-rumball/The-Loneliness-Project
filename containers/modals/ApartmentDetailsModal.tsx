import React, { useMemo, useCallback, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED, APARTMENT_BY_NUMBER } from "../../gql/queries";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import OverlayedSpinner from "../OverlayedSpinner";
import { useRouter } from "next/router";
import withModalBase from "../../helpers/withModalBase";

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
   const [apartmentData, setApartmentData] = useState(null);
   const { data, loading, refetch } = useQuery(APARTMENT_BY_NUMBER, {
      client: apolloClient,
      variables: { apt: originalApartmentNum }
   });
   const router = useRouter();

   useEffect(() => {
      if (data && data.apartmentByNumber) {
         setApartmentData(data.apartmentByNumber);
      }
   }, [data]);

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

   return (
      <OverlayedSpinner show={loading}>
         {!apartmentData ? (
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
      </OverlayedSpinner>
   );
};

export default withModalBase<ApartmentDetailsModalProps>(ApartmentDetailsModal);
