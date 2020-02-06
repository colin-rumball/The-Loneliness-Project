import React, { useCallback, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_BY_NUMBER } from "../../gql/queries";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";
import { ModalBaseProps } from "./ModalBase";
import OverlayedSpinner from "../OverlayedSpinner";
import { useRouter } from "next/router";
import withModalBase from "../../helpers/withModalBase";
import Arrows from "../../components/Arrows";
import { RandomColorContext } from "../../contexts/RandomColorContext";

interface ApartmentDetailsModalProps extends ModalBaseProps {
   highestApartmentNum?: number;
   apt: number;
   hideArrows?: boolean;
}

const ApartmentDetailsModalDefaultProps: ApartmentDetailsModalProps = {
   highestApartmentNum: 300,
   apt: 1,
   hideArrows: false
};

const ApartmentDetailsModal: React.FC<ApartmentDetailsModalProps> = props => {
   const { highestApartmentNum, apt: originalApartmentNum, apolloClient, hideArrows } = {
      ...ApartmentDetailsModalDefaultProps,
      ...props
   };
   const router = useRouter();
   const { rerandomizeColors } = useContext(RandomColorContext);
   const [apartmentData, setApartmentData] = useState(null);
   const { data, loading, refetch } = useQuery(APARTMENT_BY_NUMBER, {
      client: apolloClient,
      variables: { apt: originalApartmentNum }
   });

   const onArrowClicked = useCallback(
      (arrow: "left" | "right") => {
         rerandomizeColors();
         const newApt: number = arrow == "left" ? apartmentData.apt + 1 : apartmentData.apt - 1;
         const href = `/?a=${newApt}`;
         router.replace(href, href, {
            shallow: true
         });
         refetch({ apt: newApt });
      },
      [apartmentData, router]
   );

   useEffect(() => {
      if (data && data.apartmentByNumber) {
         setApartmentData(data.apartmentByNumber);
      }
   }, [data]);

   return (
      <OverlayedSpinner show={loading}>
         {!apartmentData ? (
            <></>
         ) : (
            <>
               <StyledApartmentDetails {...apartmentData} />
               <Arrows
                  currentApt={apartmentData.apt}
                  leftArrowEnabled={!hideArrows && apartmentData.apt !== highestApartmentNum}
                  rightArrowEnabled={!hideArrows && apartmentData.apt !== 1}
                  onArrowClicked={onArrowClicked}
               />
            </>
         )}
      </OverlayedSpinner>
   );
};

export default withModalBase<ApartmentDetailsModalProps>(ApartmentDetailsModal);
