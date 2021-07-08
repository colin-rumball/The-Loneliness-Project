import React from "react";
import StyledStoreFront from "../../components/Styled/StyledStoreFront";
import LeftStoreImage from "../../public/stores/store_1.gif";
import CenterStoreImage from "../../public/stores/store_2.gif";
import RightStoreImage from "../../public/stores/store_3.gif";

interface StoreFrontsProps {}

const StoreFrontsDefaultProps: StoreFrontsProps = {};

const StoreFronts: React.FC<StoreFrontsProps> = (props) => {
   const {} = { ...StoreFrontsDefaultProps, ...props };
   return (
      <>
         <StyledStoreFront position="left" image={LeftStoreImage} alt="store 1" />
         <StyledStoreFront position="center" image={CenterStoreImage} alt="store 2" />
         <StyledStoreFront position="right" image={RightStoreImage} alt="store 3" />
      </>
   );
};

export default StoreFronts;
