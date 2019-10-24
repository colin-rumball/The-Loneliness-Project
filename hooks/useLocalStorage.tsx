const useLocalStorage = (key: string, fallbackValue = null) => {
   if (typeof localStorage === "undefined") return fallbackValue;

   return localStorage.getItem(key);
};

export default useLocalStorage;
