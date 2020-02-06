import React, { useMemo, useCallback, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { APARTMENT_DETAILED, APARTMENT_BY_NUMBER } from "../../gql/queries";
import StyledApartmentDetails from "./styled/StyledApartmentDetails";
import ModalBase, { ModalBaseProps } from "./ModalBase";
import OverlayedSpinner from "../OverlayedSpinner";
import { useRouter } from "next/router";
import withModalBase from "../../helpers/withModalBase";
import Arrows from "../../components/Arrows";

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
   const [apartmentData, setApartmentData] = useState(null);
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
                  showLeftArrow={!hideArrows && apartmentData.apt !== highestApartmentNum}
                  showRightArrow={!hideArrows && apartmentData.apt !== 1}
                  onLeftArrowClicked={onArrowClicked}
                  onRightArrowClicked={onArrowClicked}
               />
            </>
         )}
      </OverlayedSpinner>
   );
};

export default withModalBase<ApartmentDetailsModalProps>(ApartmentDetailsModal);
