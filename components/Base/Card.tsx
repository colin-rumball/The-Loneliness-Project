import React, { CSSProperties, useMemo } from "react";
import styled from "styled-components";
import { string } from "prop-types";

const StyledCard = styled.div<any>`
   position: relative;
   display: inline-block;
   margin: 20px;
   max-width: 100%;
   background-color: #fff;
   flex-grow: ${(props) => props.grow};

   .pd-card-content {
      width: 100%;
      height: 100%;

      padding: 10px;
      border-radius: 4px;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);

      .pd-card-body {
      }

      .pd-card-footer {
         width: 100%;
         /* border-radius: 0 0 $card-border-radius $card-border-radius; */
      }
   }
`;

export enum CardBackground {
   DEFAULT = "",
}

interface CardHeaderProps {
   text?: string;
   actions?: Array<Object | string>;
}

export interface CardProps {
   header?: CardHeaderProps;
   children?: Object;
   footer?: Object;
   background?: CardBackground;
   key?: any;
   className?: string;
   grow?: number;
   style?: CSSProperties;
}

const defaultCardProps: CardProps = {
   header: undefined,
   children: undefined,
   footer: undefined,
   background: CardBackground.DEFAULT,
   key: undefined,
   className: undefined,
   grow: 0,
   style: {},
};

const Card: React.FC<CardProps> = (props) => {
   const { header, children, key, footer, grow }: CardProps = { ...defaultCardProps, ...props };

   return (
      <StyledCard grow={grow}>
         <div className="pd-card-content">
            {header && <CardHeader {...header} />}
            <CardBody>{children}</CardBody>
            <CardFooter>{footer}</CardFooter>
         </div>
      </StyledCard>
   );
};

export const CardDivider = () => {
   return <div className="divider" />;
};

const StyledCardHeader = styled.div<any>`
   & > * {
      /* border-radius: $card-border-radius $card-border-radius 0 0; */
   }

   display: flex;
   padding-bottom: 20px;

   .text {
      flex-grow: 1;
      font-family: "lato" sans-serif;
      font-size: 26px;
      font-weight: 600;
   }
`;

const CardHeader: React.FC<CardHeaderProps> = ({ text, actions }) => {
   return (
      <StyledCardHeader>
         <span className="text">{text}</span>
         {actions && actions.map((action, key) => <span key={key}>{action}</span>)}
      </StyledCardHeader>
   );
};

const CardBody: React.FC = ({ children }) => {
   return <div className="pd-card-body">{children}</div>;
};

const CardFooter: React.FC = ({ children }) => {
   return <div className="pd-card-footer">{children}</div>;
};

export default Card;
