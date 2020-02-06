import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../themes/common";
import { useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW_EXTRAS } from "../gql/queries";
import { useRouter } from "next/router";
import ApartmentDetailsModal from "./modals/ApartmentDetailsModal";
import useDebouncedFunction from "../hooks/useDebouncedFunction";
import Spinner from "../components/Spinner";
import { createPushAction } from "../contexts/ModalSystem/actions/PushAction";
import useModalSystemHelper from "../hooks/useModalSystemHelper";

interface SearchSectionProps {}

const SearchSectionDefaultProps: SearchSectionProps = {};

const SearchSection: React.FC<SearchSectionProps> = props => {
   const {} = { ...SearchSectionDefaultProps, ...props };

   const router = useRouter();
   const { pushModal } = useModalSystemHelper();
   const [userQuery, setUserQuery] = useState("");
   const [apartments, setApartments] = useState([]);
   const [getApartments, { client }] = useLazyQuery(APARTMENTS_OVERVIEW_EXTRAS, {
      onCompleted(data) {
         if (data && data.apartments) {
            setApartments([...data.apartments]);
         }
      }
   });

   const [debouncedSetApartments, { loading }] = useDebouncedFunction(getApartments, 500);

   const onQueryChanged = useCallback(
      event => {
         setUserQuery(event.target.value);
         if (event.target.value) {
            const query = event.target.value.toLowerCase();
            debouncedSetApartments({
               variables: {
                  query: query,
                  first: 15,
                  orderBy: "apt_DESC",
                  skip: 0,
                  published: true
               }
            });
         } else {
            setApartments([]);
         }
      },
      [debouncedSetApartments]
   );

   const onResultClicked = useCallback(
      apt => {
         const href = `/?a=${apt}`;
         router.replace(href, href, {
            shallow: true
         });
         pushModal(
            <ApartmentDetailsModal
               apartmentsStart={apt}
               hideArrows={true}
               apt={apt}
               apolloClient={client}
            />,
            {
               onClose: () => {
                  const href = `/`;
                  router.replace(href, href, {
                     shallow: true
                  });
               }
            }
         );
      },
      [router, client]
   );

   const StyledSearchSection = useMemo(
      () => styled.div`
         position: fixed;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         overflow: auto;
         /* padding: 20px 10% 30px 7.8%; */
         /* padding-top: 15vh; */
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         z-index: ${({ theme }: ThemeContainer) => theme.VARIABLES.LAYERS.ON_TOP};
         background-color: rgba(0, 0, 0, 0.8);
         animation: ${({ theme }: ThemeContainer) => theme.ANIMATIONS.FadeIn} 0.6s ease-in both;
         display: flex;
         flex-direction: column;
      `,
      []
   );

   const StyledSearchInput = useMemo(
      () => styled.input`
         position: relative;
         background: transparent;
         outline: none;
         border: none;
         width: 100%;
         height: 20vh;
         font-size: 10vh;
         padding: 5vh 120px;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};
         border-bottom: 1px solid #fff;
      `,
      []
   );

   const StyledResult = useMemo(
      () => styled.div`
         position: relative;
         display: flex;
         justify-content: space-evenly;
         width: 100%;
         height: 10vh;
         font-size: 8vh;
         padding: 1vh 120px;
         color: ${({ theme }: ThemeContainer) => theme.VARIABLES.COLORS.Tan};

         &:hover {
            cursor: pointer;
            color: #fff;
         }
      `,
      []
   );

   return (
      <StyledSearchSection>
         <StyledSearchInput
            autoComplete="false"
            type="text"
            name="search"
            placeholder="Type a word here..."
            value={userQuery}
            onChange={onQueryChanged}
            autoFocus
         />
         {loading && <Spinner />}
         {apartments.length > 0 &&
            apartments.map(apartment => (
               <StyledResult onClick={() => onResultClicked(apartment.apt)} key={apartment.id}>
                  <span>APT: {apartment.apt}</span>
                  <span>{apartment.name}</span>
                  <span>AGE: {apartment.age}</span>
               </StyledResult>
            ))}
      </StyledSearchSection>
   );
};

export default SearchSection;
