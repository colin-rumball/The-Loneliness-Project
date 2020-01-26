import useQueryAmount from "./useQueryAmount";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW } from "../gql/queries";
import useCurrentTheme from "./useCurrentTheme";

const useStoriesQuery = () => {
   const currentTheme = useCurrentTheme();
   /*
		Apollo has an issuing involving using onCompleted with refetch so this hook contains a hack work around.
	*/
   // Window sizing
   const [windowDimensions, setWindowDimensions] = useState({
      width: typeof window == "undefined" ? 900 : window.innerWidth,
      height: typeof window == "undefined" ? 1600 : window.innerHeight
   });
   const onWindowResized = useCallback(() => {
      if (typeof window == "undefined") return;
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
   }, []);

   // Stores the current shown stories
   const [stories, setStories] = useState([]);

   // Query
   const queryAmount = useQueryAmount(windowDimensions, currentTheme);
   const queryParams = useMemo(
      () => ({
         variables: {
            query: "",
            first: queryAmount,
            orderBy: "apt_DESC",
            skip: stories.length,
            published: true
         }
      }),
      [queryAmount, stories]
   );
   const [queryStories, { client, loading }] = useLazyQuery(APARTMENTS_OVERVIEW, {
      onCompleted(data) {
         if (data && data.apartments) {
            setStories(prevApartments => [...prevApartments, ...data.apartments]);
         }
      }
   });

   useEffect(() => {
      // Initial query (hacky)
      queryStories(queryParams);

      // Listen for window size changes
      if (typeof window == "undefined") return;
      window.addEventListener("resize", onWindowResized);
      return () => {
         window.removeEventListener("resize", onWindowResized);
      };
   }, [windowDimensions, currentTheme]);

   // Replacement refetch
   const refetch = useCallback(() => queryStories(queryParams), [queryAmount, stories]);

   return { stories, loading, client, refetch };
};

export default useStoriesQuery;
