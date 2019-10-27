import React, { useMemo } from "react";
import styled from "styled-components";

interface FlexTablerHeaderProps {
   columnHeaders: Array<Object | string>;
}

interface FlexTablerBodyProps {
   columns: Array<Object | string>;
}

interface FlexTableProps {
   header?: FlexTablerHeaderProps;
   body?: FlexTablerBodyProps;
}

const FlexTable: React.FC<FlexTableProps> = ({ header, body }) => {
   const StyledFlexTable = useMemo(
      () => styled.div`
         display: flex;
         flex-direction: column;
         max-width: 100%;
      `,
      []
   );

   const StyledTableHeader = useMemo(
      () => styled.div`
         display: flex;
         justify-content: space-evenly;

         span {
            flex-grow: 1;
            text-align: center;
         }
      `,
      []
   );

   const StyledTableBody = useMemo(
      () => styled.div`
         display: flex;
         justify-content: space-evenly;

         span {
            flex-grow: 1;
            text-align: center;
         }
      `,
      []
   );

   return (
      <StyledFlexTable>
         {header && (
            <StyledTableHeader>
               {header.columnHeaders.map((h, i) => {
                  return <span key={i}>{h}</span>;
               })}
            </StyledTableHeader>
         )}
         {body && (
            <StyledTableBody>
               {body.columns.map((c, i) => {
                  return <span key={i}>{c}</span>;
               })}
            </StyledTableBody>
         )}
      </StyledFlexTable>
   );
};

export default FlexTable;
