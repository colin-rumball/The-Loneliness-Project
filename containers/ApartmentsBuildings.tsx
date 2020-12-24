import React, { useContext, useRef, useState } from "react";
import { StoriesContext } from "../contexts/StoriesContext";
import useCurrentTheme from "../hooks/useCurrentTheme";
import useQueryAmount from "../hooks/useQueryAmount";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ApartmentRoofs from "./apartments/ApartmentRoofs";
import RenderStories from "./apartments/RenderStories";
import StoreFronts from "./apartments/StoreFronts";
import StyledMainContent from "./apartments/StyledMainContent";
import StyledShowMore from "./apartments/StyledShowMore";

const ApartmentBuildings: React.FC = (props) => {
   const currentTheme = useCurrentTheme();
   const windowDimensions = useWindowDimensions();
   const queryAmount = useQueryAmount(windowDimensions, currentTheme);
   const [shownAmount, setShownAmount] = useState(1);
   const stories: any[] = Object.values(useContext(StoriesContext));
   const lastApartmentRef = useRef(null);
   return (
      <>
         {stories.length > 0 && (
            <StyledShowMore
               onClick={() => {
                  lastApartmentRef.current.scrollIntoView();
                  setShownAmount((amt) => amt + 1);
                  // refetch();
               }}
            />
         )}
         <StyledMainContent loading={stories.length == 0}>
            {/* ROOFS */}
            <ApartmentRoofs />
            {/* APARTMENTS */}
            <RenderStories
               shownAmount={queryAmount * shownAmount}
               lastApartmentRef={lastApartmentRef}
            />
            {/* STORE FRONTS */}
            <StoreFronts />
         </StyledMainContent>
      </>
   );
};

export default ApartmentBuildings;
