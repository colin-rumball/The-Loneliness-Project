import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW, APARTMENT_DETAILED } from "../gql/queries";
import useModal from "../hooks/useModal";
import ApartmentDetailsModal from "./modals/ApartmentDetailsModal";
import Spinner from "../components/Spinner";
import StyledApartmentsContainer from "./StyledApartments/StyledApartmentsContainer";
import StyledStoreFront from "./StyledApartments/StyledStoreFront";
import StyledShowMore from "./StyledApartments/StyledShowMore";
import StyledApartmentRoof from "./StyledApartments/StyledApartmentRoof";
import StyledApartment from "./StyledApartments/StyledApartment";
import { useRouter } from "next/router";

const ApartmentBuildings: React.FC = () => {
   const router = useRouter();
   const { pushModal } = useModal();
   const [apartments, setApartments] = useState([]);
   const [getApartments, { client }] = useLazyQuery(APARTMENTS_OVERVIEW, {
      onCompleted(data) {
         if (data && data.apartments) {
            setApartments([...apartments, ...data.apartments]);
         }
      }
   });

   useEffect(() => {
      getApartments({
         variables: { query: "", first: 15, orderBy: "apt_DESC", skip: 0, published: true }
      });
   }, []);

   return (
      <>
         <StyledApartmentsContainer loading={apartments.length == 0}>
            <StyledApartmentRoof
               position="left"
               image="/static/apartments/roof_3.png"
               alt="apartment-roof-3"
            />
            <StyledApartmentRoof
               position="center"
               image="/static/apartments/roof_2.png"
               alt="apartment-roof-2"
            />
            <StyledApartmentRoof
               position="right"
               image="/static/apartments/roof_1.png"
               alt="apartment-roof-1"
            />
            {apartments.length > 0 &&
               apartments.map((apartment, index) => {
                  return (
                     <StyledApartment
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
                                    apartmentsStart={apartments[0].apt}
                                    apt={apartment.apt}
                                    apolloClient={client}
                                 />
                              )
                           });
                        }}
                     />
                  );
               })}
            <StyledStoreFront
               position="left"
               image="/static/apartments/store_1.png"
               alt="store 1"
            />
            <StyledStoreFront
               position="center"
               image="/static/apartments/store_2.png"
               alt="store 2"
            />
            <StyledStoreFront
               position="right"
               image="/static/apartments/store_3.png"
               alt="store 3"
            />
         </StyledApartmentsContainer>
         {apartments.length > 0 && (
            <StyledShowMore
               onClick={() =>
                  getApartments({
                     variables: {
                        query: "",
                        first: 15,
                        orderBy: "apt_DESC",
                        skip: apartments.length,
                        published: true
                     }
                  })
               }
            />
         )}
      </>
   );
};

export default ApartmentBuildings;
