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
   "#dec2c4",
   "#dbbeb3",
   "#e7c9b1",
   "#eddbb4",
   "#e7e2b8",
   "#dde2c7",
   "#dbe9d0",
   "#d0e9d7",
   "#d0e9e9",
   "#cadeee",
   "#c6d0e7",
   "#d7d0e9"
];

const RandomDarkenedColors = [
   "#b2a1a3",
   "#b09a92",
   "#c3a288",
   "#cdb787",
   "#c3bd90",
   "#b4b8a5",
   "#b5c2aa",
   "#aac2b1",
   "#aac2c2",
   "#9fb8cd",
   "#a0aac1",
   "#b1aac2"
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
