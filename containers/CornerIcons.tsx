import React, { useState, useMemo } from "react";
import styled from "styled-components";
import HiddenContentContainer, { IconCorner } from "../components/HiddenContentContainer";
import { IoMdMenu, IoIosSearch } from "react-icons/io";
import AboutSection from "../containers/AboutSection";
import SearchSection from "../containers/SearchSection";
import HamburgerIcon from "../components/HamburgerIcon";

interface CornerIconsProps {}

const CornerIconsDefaultProps: CornerIconsProps = {};

const CornerIcons: React.FC<CornerIconsProps> = props => {
   const {} = { ...CornerIconsDefaultProps, ...props };
   const [activeCorner, setActiveCorner] = useState(null);

   return (
      <>
         <HiddenContentContainer
            showBehind={activeCorner !== null && activeCorner !== IconCorner.TOP_LEFT}
            onVisibleStateChange={(show: boolean) =>
               setActiveCorner(show ? IconCorner.TOP_LEFT : null)
            }
            corner={IconCorner.TOP_LEFT}
            closedIcon={<HamburgerIcon active={activeCorner == IconCorner.TOP_LEFT} />}
            openIcon={<HamburgerIcon active={activeCorner == IconCorner.TOP_LEFT} />}
            content={<AboutSection />}
         />
         {/* <HiddenContentContainer
            showBehind={activeCorner !== IconCorner.TOP_RIGHT && activeCorner !== null}
            onVisibleStateChange={(show: boolean) =>
               setActiveCorner(!show ? null : IconCorner.TOP_RIGHT)
            }
            corner={IconCorner.TOP_RIGHT}
            closedIcon={IoIosSearch}
            openIcon={IoIosSearch}
            content={<SearchSection />}
         /> */}
      </>
   );
};

export default CornerIcons;
