interface CustomError extends Error {
   errorType: number;
   message: string;
}

const CreateError = (message: string, errorType: number): CustomError => {
   return {
      name: "name",
      message,
      errorType,
   };
};

export default CreateError;
