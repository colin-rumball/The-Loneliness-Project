import React, { useRef } from "react";
import useStoriesQuery from "../hooks/useStoriesQuery";
import ApartmentRoofs from "./apartments/ApartmentRoofs";
import RenderStories from "./apartments/RenderStories";
import StoreFronts from "./apartments/StoreFronts";
import StyledMainContent from "./apartments/StyledMainContent";
import StyledShowMore from "./apartments/StyledShowMore";

const ApartmentBuildings: React.FC = props => {
   const { stories, loading, client, refetch } = useStoriesQuery();
   const lastApartmentRef = useRef(null);
   return (
      <>
         {stories.length > 0 && !loading && (
            <StyledShowMore
               onClick={() => {
                  lastApartmentRef.current.scrollIntoView();
                  refetch();
               }}
            />
         )}
         <StyledMainContent loading={stories.length == 0}>
            {/* ROOFS */}
            <ApartmentRoofs />
            {/* APARTMENTS */}
            <RenderStories stories={stories} client={client} lastApartmentRef={lastApartmentRef} />
            {/* STORE FRONTS */}
            <StoreFronts />
         </StyledMainContent>
      </>
   );
};

export default ApartmentBuildings;
