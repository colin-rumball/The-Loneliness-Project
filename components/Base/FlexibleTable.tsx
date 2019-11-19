import React, { useMemo } from "react";
import styled from "styled-components";
import Card from "./Card";
import StyledIcon from "../Styled/StyledIcon";
import { FaPlusSquare, FaPlus } from "react-icons/fa";
import { ThemeContainer } from "../../styles/themes/DefaultTheme";
import Spinner from "../Spinner";

interface FlexibleTableHeaderProps {
   title?: string;
   showAddButton?: boolean;
   onAddButtonClicked?();
}

interface FlexibleTableRow {
   id: string;
   onClick?();
   cells: [Object];
}

interface FlexibleTableBodyProps {
   TableHeaders?: Array<Object | string>;
   TableRows?: [FlexibleTableRow?];
}

interface FlexibleTableProps {
   loading?: boolean;
   header?: FlexibleTableHeaderProps;
   body?: FlexibleTableBodyProps;
}

const defaultFlexibleTableProps: FlexibleTableProps = {
   loading: false,
   header: {
      title: undefined,
      showAddButton: false,
      onAddButtonClicked: () => {}
   },
   body: {
      TableHeaders: [],
      TableRows: []
   }
};

const FlexibleTable: React.FC<FlexibleTableProps> = props => {
   const { loading, header, body } = { ...defaultFlexibleTableProps, ...props };

   const StyledFlexibleTable = useMemo(
      () => styled.table`
         border-collapse: collapse;
         width: 100%;
         text-align: center;
         tr {
            td {
               padding: 10px;
            }
         }
      `,
      []
   );

   const StyledFlexibleRow = useMemo(
      () => styled.tr`
         &:nth-child(1n + 2) {
            border-bottom: ${({ theme }: ThemeContainer) =>
               `${theme.VARIABLES.COLORS.LightGrey} 1px solid`};
            opacity: ${props => (props.onClick ? "0.95" : "1")};
            transition: all 0.3s;
            &:hover {
               cursor: ${({ onClick }) => (onClick ? "pointer" : "initial")};
               background-color: ${({ theme, onClick }: ThemeContainer) =>
                  onClick ? theme.VARIABLES.COLORS.LightBlue : "initial"};
               opacity: 1;
               color: ${({ theme, onClick }: ThemeContainer) =>
                  onClick ? theme.VARIABLES.COLORS.Tan : "inherit"};
            }
         }
         &:last-child {
            border: none;
         }
      `,
      []
   );

   return (
      <Card
         header={{
            text: header.title,
            actions: [<StyledIcon icon={FaPlus} onClick={header.onAddButtonClicked} />]
         }}
      >
         {loading ? (
            <Spinner inverted={true} />
         ) : (
            <StyledFlexibleTable>
               <tbody>
                  <tr>
                     {body.TableHeaders &&
                        body.TableHeaders.map(header => <th key={header as string}>{header}</th>)}
                  </tr>
                  {body.TableRows &&
                     body.TableRows.map((row: FlexibleTableRow) => (
                        <StyledFlexibleRow key={row.id} onClick={row.onClick}>
                           {row.cells.map(cell => (
                              <td key={cell as string}>{cell}</td>
                           ))}
                        </StyledFlexibleRow>
                     ))}
               </tbody>
            </StyledFlexibleTable>
         )}
      </Card>
   );
};

export default FlexibleTable;
