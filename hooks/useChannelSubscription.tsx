import { useEffect, useState, useCallback } from "react";
import { usePusher } from "../lib/pusher/PusherProvider";

const useChannelSubscription = (
   eventName: string,
   channelName: string,
   callback: (...args: any[]) => any,
   inputs: Array<any>
) => {
   const pusher = usePusher();

   // Track data
   const [data, setData] = useState();

   // Create callback
   const onNewData = useCallback(callback, inputs);

   // Handle Messages
   useEffect(() => {
      if (channelName) {
         if (!pusher) {
            console.log("pusher was undefined");
            return;
         }

         const channel = pusher.channel(channelName) || pusher.subscribe(channelName);

         channel.bind(eventName, data => {
            setData(data);
            onNewData(data);
         });
      }
   }, [pusher, channelName, onNewData]);

   return data;
};

export default useChannelSubscription;
