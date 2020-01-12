import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED, APARTMENT_BY_NUMBER } from "../../gql/queries";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";
import ApartmentModalBase from "./ApartmentModalBase";
import { random } from "lodash";

interface ApartmentDetailsModalProps extends ModalBaseProps {
   apartmentsStart: number;
   hideArrows?: boolean;
   apt: number;
}

const RandomColors = [
   "#dde2c7",
   "#eddbb4",
   "#dbbeb3",
   "#e7c9b1",
   "#e7e2b8",
   "#dec2c4",
   "#d7d0e9",
   "#c6d0e7",
   "#cadeee",
   "#d0e9e9",
   "#cdb787",
   "#c3a288"
];

const RandomDarkenedColors = [
   "#dde2c7",
   "#eddbb4",
   "#dbbeb3",
   "#e7c9b1",
   "#e7e2b8",
   "#dec2c4",
   "#d7d0e9",
   "#c6d0e7",
   "#cadeee",
   "#d0e9e9",
   "#cdb787",
   "#c3a288"
];

const ApartmentDetailsModal: React.FC<ApartmentDetailsModalProps> = ({
   apt: originalApartmentNum,
   apartmentsStart,
   hideArrows,
   router,
   apolloClient
}) => {
   const [apartmentData, setApartmentData] = useState(null);
   const { data, loading, refetch } = useQuery(APARTMENT_BY_NUMBER, {
      client: apolloClient,
      variables: { apt: originalApartmentNum }
   });

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

   const chosenColorIndex = useMemo(() => random(RandomColors.length - 1), []);

   return (
      <ApartmentModalBase showSpinner={loading} color={RandomDarkenedColors[chosenColorIndex]}>
         {!apartmentData ? (
            <></>
         ) : (
            <StyledApartmentDetails
               onLeftArrowClicked={onArrowClicked}
               onRightArrowClicked={onArrowClicked}
               showLeftArrow={!hideArrows && apartmentsStart != apartmentData.apt}
               showRightArrow={!hideArrows && apartmentData.apt > 1}
               color={RandomColors[chosenColorIndex]}
               {...apartmentData}
            />
         )}
      </ApartmentModalBase>
   );
};

export default ApartmentDetailsModal;
