import React from "react";
import Box from "@mui/material/Box";
//import localImage from './assets/my-image.jpg';

interface ImageComponentProps {
  imageUrl: string;
  altText?: string;
  width?: string | number;
  height?: string | number;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  imageUrl,
  altText = "Image",
  width = "100%",
  height = "auto",
}) => {
  return (
    <Box
      component="img"
      src={imageUrl}
      alt={altText}
      sx={{
        width: width,
        height: height,
        background: 'transparent',
        boxShadow: "none"
      }}
    />
  );
};

export default ImageComponent;