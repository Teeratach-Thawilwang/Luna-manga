import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import CameraIcon from "@components/iconSvg/CameraIcon";
import { LimitFileSizeEnum } from "@enums/FileSizeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { BannerImageInterface } from "@interfaces/backoffice/BannerInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import ValidationService from "@services/ValidationService";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputImageAdvertisementSmall() {
  const imagesState = BannerCreateEditService.getter<BannerImageInterface[] | ImageInterface[]>("images");
  const initialImage = BannerCreateEditService.getImageByCollection(CollectionEnum.BANNER_ADVERTISEMENT_SMALL) as ImageInterface;
  const [url, setUrl] = useState<string>("");
  let image = createImageElement(url);

  useEffect(() => {
    if (initialImage && "desktop" in initialImage) {
      setUrl(initialImage.desktop);
    }
  }, [initialImage]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const files = event.target.files;
    if (files == null || files.length <= 0) {
      return;
    }

    if (!ValidationService.validateFileSize(files[0], LimitFileSizeEnum.BANNER_IMAGE_SIZE)) {
      alert(`ไฟล์ต้องมีขนาดไม่เกิน ${LimitFileSizeEnum.BANNER_IMAGE_SIZE}MB`);
      return;
    }

    const imageFile = files[0];
    const selectedImageUrl = URL.createObjectURL(imageFile);
    setUrl(selectedImageUrl);

    const newImages = transformImages(imagesState, imageFile);
    BannerCreateEditService.update({ images: newImages });
    event.target.value = "";
  }

  return (
    <Box>
      <ImageBox htmlFor="input-image-advertisement-small">{image}</ImageBox>
      <Input type="file" accept="image/*" id="input-image-advertisement-small" onChange={onChangeHandle} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 490px;
  height: 235px;
  /* margin-top: 20px; */
  position: relative;
`;

const ImageBox = styled.label`
  /* border: 1px solid red; */
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const DefaultImage = styled.div`
  border: 1px solid #5c5c5c;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: #bfc5cc;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
    fill: #fff;

    path {
      stroke: #5c5c5c;
    }

    circle {
      stroke: #5c5c5c;
    }
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  color: #5c5c5c;
`;

const Input = styled.input`
  border: 1px solid red;
  width: 100%;

  margin: 0 auto 0 auto;
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;

  object-fit: cover;
  display: block;
`;

const PlaceHolder = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  font-size: 40px;
  font-weight: bold;
  color: #000000;
  background-color: #ffffff;
  opacity: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  &:hover {
    opacity: 0.3;
    transition: 200ms ease-in-out;
  }
`;

function createImageElement(url: string) {
  if (url != "") {
    return (
      <>
        <Image src={url} />
        <PlaceHolder>490 x 235 Pixels</PlaceHolder>
      </>
    );
  }

  return (
    <>
      <DefaultImage>
        <CameraIcon />
        <Text>Select Image</Text>
        <Text>490 x 235 Pixels</Text>
      </DefaultImage>
    </>
  );
}

function transformImages(images: BannerImageInterface[] | ImageInterface[], file: File) {
  const isImageExist = images.some((image) => image.collection_name == CollectionEnum.BANNER_ADVERTISEMENT_SMALL);
  const uploadImage = {
    file: file,
    collection_name: CollectionEnum.BANNER_ADVERTISEMENT_SMALL,
  };

  if (!isImageExist) {
    return [...images, uploadImage];
  }

  return images.map((image) => {
    if (image.collection_name == CollectionEnum.BANNER_ADVERTISEMENT_SMALL) {
      return uploadImage;
    }
    return image;
  });
}
