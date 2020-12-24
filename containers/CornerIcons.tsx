import React from "react";
import CornerIconWithContent, { IconCorner } from "../components/CornerIcon/CornerIconWithContent";
// import { IoIosSearch, IoMdClose } from "react-icons/io";
import AboutSection from "../containers/AboutSection";
// import SearchSection from "../containers/SearchSection";
import HamburgerIcon from "../components/HamburgerIcon";
import { CornerIconsContextProvider } from "../contexts/CornerIconsContext";

interface CornerIconsProps {}

const CornerIconsDefaultProps: CornerIconsProps = {};

const CornerIcons: React.FC<CornerIconsProps> = props => {
   const {} = { ...CornerIconsDefaultProps, ...props };

   return (
      <CornerIconsContextProvider>
         <CornerIconWithContent
            corner={IconCorner.TOP_LEFT}
            closedIcon={<HamburgerIcon />}
            openIcon={<HamburgerIcon />}
            content={<AboutSection />}
         />
         {/* <CornerIconWithContent
            corner={IconCorner.TOP_RIGHT}
            closedIcon={<IoIosSearch />}
            openIcon={<IoMdClose />}
            content={<SearchSection />}
         /> */}
      </CornerIconsContextProvider>
   );
};

export default CornerIcons;
