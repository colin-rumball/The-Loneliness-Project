import Pusher from "pusher-js";
import { createContext, useContext, useMemo } from "react";

export const PusherContext = createContext(undefined);

export const PusherProvider = ({ children }) => {
   const isBrowser = typeof window !== "undefined";
   const pusher = useMemo(
      () =>
         isBrowser
            ? new Pusher(process.env.PD_PUSHER_KEY, {
                 cluster: "us2",
                 forceTLS: true
              })
            : undefined,
      []
   );

   return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>;
};

export const usePusher = () => useContext(PusherContext);
