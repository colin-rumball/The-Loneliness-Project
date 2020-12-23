import { formatErrorGenerator, FormatErrorOptions } from "graphql-apollo-errors";
import ServerLogger from "../utils/Logger";

const formatForLogger = (err) => {
   return `${err}`;
};

const formatErrorOptions: FormatErrorOptions = {
   publicDataPath: "public", // Only data under this path in the data object will be sent to the client (path parts should be separated by . - some.public.path)
   showLocations: false, // whether to add the graphql locations to the final error (default false)
   showPath: false, // whether to add the graphql path to the final error (default false)
   hideSensitiveData: true, // whether to remove the data object from internal server errors (default true)
   hooks: {
      // This run on the error you really throw from your code (not the graphql error - it means not with path and locations)
      //   onOriginalError: (originalError) => {logger.info(originalError.message)},
      // This will run on the processed error, which means after we convert it to boom error if needed
      // and after we added the path and location (if requested)
      // If the error is not a boom error, this error won't include the original message but general internal server error message
      // This will run before we take only the payload and the public path of data
      onProcessedError: (processedError) => {
         ServerLogger(formatForLogger(processedError));
      },
      // This will run on the final error, it will only contains the output.payload, and if you configured the publicDataPath
      // it will only contain this data under the data object
      // If the error is internal error this error will be a wrapped internal error which not contains the sensitive details
      // This is the error which will be sent to the client
      //   onFinalError: (finalError) => {logger.info(finalError.message)},
   },
   // nonBoomTransformer: (nonBoomError) => {error instanceof GraphQLError ? SevenBoom.badRequest(error.message) : SevenBoom.badImplementation(error)}
   // Optional function to transform non-Boom errors, such as those from Apollo & other 3rd-party libraries, into Boom errors
};

const FormatError = formatErrorGenerator(formatErrorOptions);
export default FormatError;
