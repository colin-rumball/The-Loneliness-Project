import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW } from "../gql/queries";
import useModal from "../hooks/useModal";
import ApartmentDetailsModal from "./modals/ApartmentDetailsModal";
import StyledApartmentsContainer from "./StyledApartments/StyledApartmentsContainer";
import StyledStoreFront from "./StyledApartments/StyledStoreFront";
import StyledShowMore from "./StyledApartments/StyledShowMore";
import StyledApartmentRoof from "./StyledApartments/StyledApartmentRoof";
import StyledApartment from "./StyledApartments/StyledApartment";
import { useRouter } from "next/router";

const ApartmentBuildings: React.FC = () => {
   const router = useRouter();
   const { pushModal } = useModal();

   // Window sizing
   const [windowDimensions, setWindowDimensions] = useState({
      width: typeof window == "undefined" ? 900 : window.innerWidth,
      height: typeof window == "undefined" ? 1600 : window.innerHeight
   });
   const onWindowResized = useCallback(() => {
      if (typeof window == "undefined") return;
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
   }, []);

   const getQueryAmount = useCallback(() => {
      if (windowDimensions.width > 1286) {
         return 15;
      } else if (windowDimensions.width > 768) {
         return 12;
      }
      return 9;
   }, [windowDimensions]);

   // Apartments
   const [apartments, setApartments] = useState([]);
   const [getApartments, { client, loading }] = useLazyQuery(APARTMENTS_OVERVIEW, {
      onCompleted(data) {
         if (data && data.apartments) {
            setApartments([...apartments, ...data.apartments]);
         }
      }
   });
   useEffect(() => {
      getApartments({
         variables: {
            query: "",
            first: getQueryAmount(),
            orderBy: "apt_DESC",
            skip: 0,
            published: true
         }
      });

      if (typeof window == "undefined") return;
      window.addEventListener("resize", onWindowResized);
      return () => {
         window.removeEventListener("resize", onWindowResized);
      };
   }, []);

   const lastApartmentRef = useRef(null);

   return (
      <>
         {apartments.length > 0 && !loading && (
            <StyledShowMore
               onClick={() => {
                  lastApartmentRef.current.scrollIntoView();
                  getApartments({
                     variables: {
                        query: "",
                        first: getQueryAmount(),
                        orderBy: "apt_DESC",
                        skip: apartments.length,
                        published: true
                     }
                  });
               }}
            />
         )}
         <StyledApartmentsContainer loading={apartments.length == 0}>
            <StyledApartmentRoof
               position="left"
               image="/static/roofs/roof_3.png"
               alt="apartment-roof-3"
            />
            <StyledApartmentRoof
               position="center"
               image="/static/roofs/roof_2.png"
               alt="apartment-roof-2"
            />
            <StyledApartmentRoof
               position="right"
               image="/static/roofs/roof_1.png"
               alt="apartment-roof-1"
            />
            {apartments.length > 0 &&
               apartments.map((apartment, index) => {
                  return (
                     <StyledApartment
                        ref={index == apartments.length - 1 ? lastApartmentRef : null}
                        key={apartment.id}
                        image={`/static/apartments/storey_${apartment.apt}.png`}
                        onClick={() => {
                           const href = `/?a=${apartment.apt}`;
                           router.replace(href, href, {
                              shallow: true
                           });
                           pushModal({
                              html: (
                                 <ApartmentDetailsModal
                                    router={router}
                                    apartmentsStart={apartments[0].apt}
                                    apt={apartment.apt}
                                    apolloClient={client}
                                 />
                              ),
                              onAfterClose: () => {
                                 const href = `/`;
                                 router.replace(href, href, {
                                    shallow: true
                                 });
                              }
                           });
                        }}
                     />
                  );
               })}
            <StyledStoreFront position="left" image="/static/stores/store_1.png" alt="store 1" />
            <StyledStoreFront position="center" image="/static/stores/store_2.png" alt="store 2" />
            <StyledStoreFront position="right" image="/static/stores/store_3.png" alt="store 3" />
         </StyledApartmentsContainer>
      </>
   );
};

export default ApartmentBuildings;
