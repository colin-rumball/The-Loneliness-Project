import React, { useMemo, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import StyledIcon from "./Styled/StyledIcon";
import { FaEdit } from "react-icons/fa";

interface ApartmentImageProps {
   originalImage: string;
   currentImage: string;
   setCurrentImage?(newImage: string);
}

const ApartmentImageDefaultProps: ApartmentImageProps = {
   originalImage: "",
   currentImage: "",
   setCurrentImage: (newImage: string) => {}
};

const ApartmentImage: React.FC<ApartmentImageProps> = props => {
   const { originalImage, currentImage, setCurrentImage } = {
      ...ApartmentImageDefaultProps,
      ...props
   };
   const uploadRef = useRef(null);

   const StyledApartmentImage = useMemo(
      () => styled.div`
         position: relative;
         height: auto;

         .apartment-image-uploader {
            display: none;
         }

         .apartment-image {
            max-width: 100%;
            min-height: 300px;
         }
      `,
      []
   );

   const StyledEditIcon = useMemo(
      () => styled.div`
         position: absolute;
         background: rgba(0, 0, 0, 0.6);
         border-radius: inherit;
         top: 0;
         left: 0;
         bottom: 0;
         right: 0;
         display: flex;
         justify-content: center;
         align-items: center;
         opacity: 0;
         transition: opacity 0.3s ease;

         &:hover {
            opacity: 1;
            cursor: pointer;
         }
      `,
      []
   );

   return (
      <StyledApartmentImage
         onClick={() => {
            uploadRef.current.click();
         }}
      >
         <input
            ref={uploadRef}
            type="file"
            className="apartment-image-uploader"
            name="file"
            title="Upload Image"
            accept="image/png, image/jpeg"
            onChange={e => {
               setCurrentImage(uploadRef.current.files[0]);
            }}
         />

         {currentImage ? (
            <img className="apartment-image" src={URL.createObjectURL(currentImage)} />
         ) : (
            <img className="apartment-image" src={originalImage} />
         )}
         <StyledEditIcon className="edit-icon">
            <StyledIcon color="#fff" icon={FaEdit} size={"40px"} />
         </StyledEditIcon>
      </StyledApartmentImage>
   );
};

export default ApartmentImage;
