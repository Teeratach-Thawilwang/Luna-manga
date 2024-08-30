import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import styled from "styled-components";

import { cropImage } from "@utils/ImageService";

interface ProfileImageCropperInterface {
  imageUrl: string;
  ImageType: string;
  setBlob: (blob: Blob) => void;
}

export default React.memo(function ProfileImageCropper({ imageUrl, ImageType, setBlob }: ProfileImageCropperInterface) {
  // console.log("In ProfileImageCropper");
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  async function onCropComplete(_croppedArea: Area, croppedAreaPixels: Area) {
    const croppedImage = await cropImage(imageUrl, croppedAreaPixels, ImageType);
    setBlob(croppedImage);
  }

  return (
    <CropperBox>
      <CropperWrapper>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={1}
          aspect={1}
          showGrid={false}
          cropShape="round"
          objectFit="cover"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
      </CropperWrapper>
    </CropperBox>
  );
});

const CropperBox = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 100%;
`;

const CropperWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .reactEasyCrop_Container {
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    position: static;
  }

  .reactEasyCrop_CropArea {
    border: 0 transparent;

    opacity: 1;
    color: #262626;
  }
`;
