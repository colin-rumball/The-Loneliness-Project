import React from "react";
import styled from "styled-components";
import StyledApartmentRoof from "../../components/Styled/StyledApartmentRoof";
import LeftRoofImage from "../../public/roofs/roof_3.png";
import CenterRoofImage from "../../public/roofs/roof_2.png";
import RightRoofImage from "../../public/roofs/roof_1.png";

interface ApartmentRoofsProps {}

const ApartmentRoofsDefaultProps: ApartmentRoofsProps = {};

const ApartmentRoofs: React.FC<ApartmentRoofsProps> = (props) => {
   const {} = { ...ApartmentRoofsDefaultProps, ...props };
   return (
      <>
         <StyledApartmentRoof position="left" src={LeftRoofImage} alt="apartment-roof-3" />
         <StyledApartmentRoof position="center" src={CenterRoofImage} alt="apartment-roof-2" />
         <StyledApartmentRoof position="right" src={RightRoofImage} alt="apartment-roof-1" />
      </>
   );
};

export default ApartmentRoofs;
