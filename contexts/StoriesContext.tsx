import React, { useCallback, useEffect, useState } from "react";

const StoriesContext = React.createContext([]);

const StoriesContextProvider: React.FC = ({ children }) => {
   const [stories, setStories] = useState([]);
   const fetchData = useCallback(async () => {
      const res = await fetch("/stories.json");
      const data = await res.json();
      setStories(data);
   }, []);
   useEffect(() => {
      fetchData();
   }, []);
   return <StoriesContext.Provider value={stories}>{children}</StoriesContext.Provider>;
};

export { StoriesContext, StoriesContextProvider };
