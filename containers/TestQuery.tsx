import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql, NetworkStatus } from "apollo-boost";

const TEST_QUERY = gql`
   {
      testQuery
   }
`;

const TestQuery: React.FC = () => {
   const { loading, called, networkStatus, error, data } = useQuery(TEST_QUERY);
   const status = networkStatus as NetworkStatus;
   return (
      <>
         <div>
            Called: <strong>{called ? "Called" : "Not Called Yet"}</strong>
         </div>
         <div>
            Loading: <strong>{loading ? "Loading" : "Not Loading"}</strong>
         </div>
         <div>
            Network Status: <strong>{NetworkStatus[status]}</strong>
         </div>
         <div>
            Error: <strong>{!!error ? error.message : "No Errors"}</strong>
         </div>
         <div>
            Data: <strong>{data && data.testQuery}</strong>
         </div>
      </>
   );
};

export default TestQuery;
