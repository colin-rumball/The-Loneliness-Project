import React from "react";
import StyledStoreFront from "../../components/Styled/StyledStoreFront";

interface StoreFrontsProps {}

const StoreFrontsDefaultProps: StoreFrontsProps = {};

const StoreFronts: React.FC<StoreFrontsProps> = props => {
   const {} = { ...StoreFrontsDefaultProps, ...props };
   return (
      <>
         <StyledStoreFront position="left" image="/stores/store_1.gif" alt="store 1" />
         <StyledStoreFront position="center" image="/stores/store_2.png" alt="store 2" />
         <StyledStoreFront position="right" image="/stores/store_3.gif" alt="store 3" />
      </>
   );
};

export default StoreFronts;
