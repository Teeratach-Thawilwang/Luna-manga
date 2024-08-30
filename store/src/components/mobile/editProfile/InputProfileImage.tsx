import { useState } from "react";

import styled from "styled-components";

import CameraIcon from "@components/iconSvg/CameraIcon";
import ProfileImageCropper from "@components/mobile/editProfile/ProfileImageCropper";
import { ImageInterface } from "@interfaces/ImageInterface";
import CustomerProfileService from "@services/CustomerProfileService";
import ValidationService from "@services/ValidationService";
import { box, color, font } from "@utils/Themes";

interface InputProfileImageInterface {
  fileRef: React.MutableRefObject<File | null>;
  setBlob: (blob: Blob) => void;
  setFile: (file: File) => void;
}

export default function InputProfileImage({ fileRef, setBlob, setFile }: InputProfileImageInterface) {
  const profileImage = CustomerProfileService.getter<ImageInterface[]>("profile_image");
  const defaultImageUrl = getProfileImageUrl(profileImage);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(defaultImageUrl);

  function onChangeHandle(event: any) {
    event.preventDefault();
    const files = event.target.files;
    if (files.length <= 0) {
      return;
    }

    if (!ValidationService.validateFileSize(files[0], 2)) {
      alert("ไฟล์ต้องมีขนาดไม่เกิน 2MB");
      return;
    }

    const imageFile = event.target.files[0];
    const selectedImageUrl = URL.createObjectURL(imageFile);
    setFile(imageFile);
    setProfileImageUrl(selectedImageUrl);
  }

  return (
    <Box>
      <ProfileImageCropper setBlob={setBlob} imageUrl={profileImageUrl} ImageType={fileRef.current?.type ?? "image/png"} />
      <CameraIconBox htmlFor="input-profile-image">
        <CameraIcon />
      </CameraIconBox>
      <Input type="file" accept="image/*" id="input-profile-image" onChange={onChangeHandle} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  width: 300px;
  margin: ${(props) => font(props).size.xl} auto;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const CameraIconBox = styled.label`
  box-sizing: border-box;
  width: ${(props) => font(props).size["5xl"]};
  height: ${(props) => font(props).size["5xl"]};

  border-radius: ${(props) => box(props).borderRadius.full};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  position: absolute;
  bottom: 0px;
  right: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.xl};
    height: ${(props) => font(props).size.xl};
    fill: #ffffff;

    path,
    circle {
      stroke: ${(props) => color(props).surfaceContainerHigh};
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHighest};

    path,
    circle {
      stroke: ${(props) => color(props).surfaceContainerHighest};
    }
  }
`;

const Input = styled.input`
  border: 1px solid red;
  width: 100%;

  margin: 0 auto;
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

function getProfileImageUrl(profileImage: ImageInterface[] | null): string {
  if (profileImage != null && profileImage.length != 0) {
    return profileImage[0].mobile;
  }
  return "/default_user_circle_icon.svg";
}
