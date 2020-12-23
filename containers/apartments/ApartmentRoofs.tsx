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
            src="/roofs/medium/roof_3_medium.png"
            srcset={`/roofs/small/roof_3_small.png 360w, /roofs/medium/roof_3_medium.png 640w, /roofs/large/roof_3_large.png 920w`}
            alt="apartment-roof-3"
         />
         <StyledApartmentRoof
            position="center"
            src="/roofs/medium/roof_2_medium.png"
            srcset={`/roofs/small/roof_2_small.png 360w, /roofs/medium/roof_2_medium.png 640w, /roofs/large/roof_2_large.png 920w`}
            alt="apartment-roof-2"
         />
         <StyledApartmentRoof
            position="right"
            src="/roofs/medium/roof_1_medium.png"
            srcset={`/roofs/small/roof_1_small.png 360w, /roofs/medium/roof_1_medium.png 640w, /roofs/large/roof_1_large.png 920w`}
            alt="apartment-roof-1"
         />
      </>
   );
};

export default ApartmentRoofs;
