import useQueryAmount from "./useQueryAmount";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { APARTMENTS_OVERVIEW } from "../gql/queries";
import useCurrentTheme from "./useCurrentTheme";
import useWindowDimensions from "./useWindowDimensions";

const useStoriesQuery = () => {
   const currentTheme = useCurrentTheme();
   /*
		Apollo has an issuing involving using onCompleted with refetch so this hook contains a hack work around.
	*/
   // Window sizing
   const windowDimensions = useWindowDimensions();
   const [loading, setLoading] = useState(true);

   // Stores the current shown stories
   const [stories, setStories] = useState([]);

   // Query
   const queryAmount = useQueryAmount(windowDimensions, currentTheme);
   // const queryParams = useMemo(
   //    () => ({
   //       variables: {
   //          query: "",
   //          first: queryAmount,
   //          orderBy: "apt_DESC",
   //          skip: stories.length,
   //          published: true
   //       }
   //    }),
   //    [queryAmount, stories]
   // );
   // const [queryStories, { client, loading }] = useLazyQuery(APARTMENTS_OVERVIEW, {
   //    onCompleted(data) {
   //       if (data && data.apartments) {
   //          setStories(prevApartments => [...prevApartments, ...data.apartments]);
   //       }
   //    }
   // });

   useEffect(() => {
      const fetchData = async () => {
         const res = await fetch("/apartments.json");
         const data = await res.json();
         setStories(data);
         setLoading(false);
      };
      fetchData();
      // Initial query (hacky)
      // if (stories.length == 0) {
      //    queryStories(queryParams);
      // }
   }, []);

   // Replacement refetch
   // const refetch = useCallback(() => queryStories(queryParams), [queryAmount, stories]);

   return { stories, loading };
};

export default useStoriesQuery;
