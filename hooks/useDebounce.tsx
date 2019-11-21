import { useState, useEffect, useCallback } from "react";

export default function useDebounce(initialValue, delay) {
   // State and setters for debounced value
   const [value, setDebouncedValue] = useState(initialValue);
   const [internalNewValue, setNewValue] = useState();
   const [timeoutId, setTimeoutId] = useState();

   useEffect(() => {
      setTimeoutId(
         setTimeout(() => {
            setDebouncedValue(internalNewValue);
         }, delay)
      );

      return () => {
         clearTimeout(timeoutId);
      };
   }, [internalNewValue]);

   return [value, setNewValue];
}
