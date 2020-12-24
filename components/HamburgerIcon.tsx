import React, { useMemo, useState } from "react";
import styled from "styled-components";

const StyledHamburgerIcon = styled.div`
   padding: 10px 15px;
   cursor: pointer;

   .line {
      display: block;
      width: 30px;
      height: 2px;

      position: relative;
      background: #e8d8b6;
      transform-origin: 50% 50%;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
         background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.35s ease;
   }
   .line:nth-last-child(3),
   .line:nth-last-child(2) {
      height: ${props => (props.active ? "2px" : "1px")};
      margin: 0;
   }
   .line:nth-last-child(3) {
      transform: ${props => (props.active ? "rotate(45deg) translate(2px, 0)" : "")};
   }
   .line:nth-last-child(2) {
      transform: ${props => (props.active ? "rotate(-45deg) translate(2px, 0)" : "")};
   }
   .line:nth-last-child(1),
   .line:nth-last-child(4) {
      opacity: ${props => (props.active ? 0 : 1)};
      margin: 6px 0;
   }
`;

interface HamburgerIconProps {}

const HamburgerIconDefaultProps: HamburgerIconProps = {};

const HamburgerIcon: React.FC<HamburgerIconProps> = props => {
   const {} = { ...HamburgerIconDefaultProps, ...props };
   const [active, setActive] = useState(false);

   return (
      <StyledHamburgerIcon
         active={active}
         onClick={() => {
            setActive(!active);
         }}
      >
         <span className={"line"} />
         <span className={"line"} />
         <span className={"line"} />
         <span className={"line"} />
      </StyledHamburgerIcon>
   );
};

export default HamburgerIcon;
