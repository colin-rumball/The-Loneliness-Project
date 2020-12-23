interface CustomError extends Error {
   errorType: number;
   message: string;
}

const createError = (message: string, errorType: number): CustomError => {
   return {
      name: "name",
      message,
      errorType
   };
};

export default createError;
