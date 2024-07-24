import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import CameraIcon from "@components/iconSvg/CameraIcon";
import { LimitFileSizeEnum } from "@enums/FileSizeEnum";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import ValidationService from "@services/ValidationService";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";

export default function InputCoverImage({ initial }: { initial?: ImageInterface }) {
  const [url, setUrl] = useState<string>(initial ? initial.desktop : "");
  let image = createImageElement(url);

  const errorMessage = StoryCreateEditService.getter<string>("cover_image_error_message");
  const errorMessageElement = createErrorMessageElement(errorMessage);

  useEffect(() => {
    if (initial) {
      StoryCreateEditService.update({ cover_image: initial });
    }
  }, []);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const files = event.target.files;
    if (files == null || files.length <= 0) {
      return;
    }

    if (!ValidationService.validateFileSize(files[0], LimitFileSizeEnum.COVER_IMAGE_SIZE)) {
      alert(`ไฟล์ต้องมีขนาดไม่เกิน ${LimitFileSizeEnum.COVER_IMAGE_SIZE}MB`);
      return;
    }

    const imageFile = files[0];
    const selectedImageUrl = URL.createObjectURL(imageFile);
    setUrl(selectedImageUrl);
    StoryCreateEditService.update({ cover_image: imageFile });
    event.target.value = "";
  }

  return (
    <Box>
      <Title>Cover Image</Title>
      <Warp>
        <ImageBox htmlFor="input-cover-image" width={url == "" ? "80px" : "400px"}>
          {image}
        </ImageBox>
        <Input type="file" accept="image/*" id="input-cover-image" onChange={onChangeHandle} />
      </Warp>
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  /* margin-top: 20px; */
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-weight: 500;
  font-size: 20px;
  color: #505050;

  display: flex;
  align-items: center;
`;

const Warp = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  position: relative;
`;

const ImageBox = styled.label<{ width: string }>`
  /* border: 1px solid red; */
  /* width: 100px; */
  background-color: #5c5c5c;
  width: ${(props) => props.width};
  height: auto;
  display: block;
  position: relative;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const DefaultImage = styled.div`
  border: 1px solid #5c5c5c;
  width: 80px;
  height: 80px;
  background-color: #bfc5cc;

  display: flex;
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

const Input = styled.input`
  border: 1px solid red;
  width: 100%;

  margin: 0 auto 0 auto;
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const Image = styled.img`
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

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function createImageElement(url: string) {
  if (url != "") {
    return (
      <>
        <Image src={url} />
        <PlaceHolder>1000 x auto Pixels</PlaceHolder>
      </>
    );
  }

  return (
    <DefaultImage>
      <CameraIcon />
    </DefaultImage>
  );
}

function createErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}
