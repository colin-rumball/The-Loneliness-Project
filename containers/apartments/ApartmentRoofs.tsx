import React from "react";
import styled from "styled-components";
import StyledApartmentRoof from "../../components/Styled/StyledApartmentRoof";

interface ApartmentRoofsProps {}

const ApartmentRoofsDefaultProps: ApartmentRoofsProps = {};

const ApartmentRoofs: React.FC<ApartmentRoofsProps> = props => {
   const {} = { ...ApartmentRoofsDefaultProps, ...props };
   return (
      <>
         <StyledApartmentRoof
            position="left"
            image="/static/roofs/roof_3.png"
            alt="apartment-roof-3"
         />
         <StyledApartmentRoof
            position="center"
            image="/static/roofs/roof_2.png"
            alt="apartment-roof-2"
         />
         <StyledApartmentRoof
            position="right"
            image="/static/roofs/roof_1.png"
            alt="apartment-roof-1"
         />
      </>
   );
};

export default ApartmentRoofs;
