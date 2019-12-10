import { useState, useEffect, useCallback } from "react";

interface DebounceOptions {
   loading: boolean;
}

export default function useDebouncedFunction(func, delay): [Function, DebounceOptions] {
   // State and setters for debounced value
   const [loading, setLoading] = useState(false);
   const [timeoutId, setTimeoutId] = useState();

   const debouncedFunction = useCallback(
      vars => {
         setLoading(true);
         if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(undefined);
         }

         setTimeoutId(
            setTimeout(() => {
               func(vars);
               setTimeoutId(undefined);
               setLoading(false);
            }, delay)
         );
      },
      [timeoutId]
   );

   return [debouncedFunction, { loading: loading }];
}
