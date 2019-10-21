import React, { useEffect, useCallback, useState } from "react";

const useTimer = time => {
   const [timeLeft, setTimeLeft] = useState(time / 1000);

   const onTimeout = useCallback(() => {
      setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
   }, [time]);

   useEffect(() => {
      if (timeLeft > -1) {
         const timeoutRef = setTimeout(onTimeout, 1000);
         return () => {
            clearTimeout(timeoutRef);
         };
      }
   }, [time, timeLeft]);

   return timeLeft;
};

export default useTimer;
