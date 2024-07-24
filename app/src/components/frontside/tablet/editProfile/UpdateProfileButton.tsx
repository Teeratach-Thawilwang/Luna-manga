import { darken } from "polished";

import styled from "styled-components";

import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import EditCustomerProfileService from "@services/frontside/EditCustomerProfileService";
import FileService from "@services/frontside/FileService";
import { createFileObjectFromBlob } from "@utils/ImageService";
import { box, color, font } from "@utils/Themes";

interface UpdateProfileButtonInterface {
  blobRef: React.MutableRefObject<Blob | null>;
  fileRef: React.MutableRefObject<File | null>;
  setIsLoading: (value: boolean) => void;
}

export default function UpdateProfileButton({ blobRef, fileRef, setIsLoading }: UpdateProfileButtonInterface) {
  const { id: customerId, firstName, lastName, nickName, email } = EditCustomerProfileService.getState();

  async function onSubmit() {
    if (customerId == null || blobRef == null) {
      return;
    }

    setIsLoading(true);
    try {
      if (fileRef.current == null) {
        CustomerProfileService.updateProfile(customerId, firstName, lastName, nickName, email);
        return;
      }

      const file = createFileObjectFromBlob(blobRef.current!, fileRef.current.name);
      const uploadedFile = await FileService.uploadImage(file, CollectionEnum.PROFILE_IMAGE);
      CustomerProfileService.updateProfile(customerId, firstName, lastName, nickName, email, uploadedFile.id);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return <Box onClick={onSubmit}>บันทึก</Box>;
}

const Box = styled.div`
  height: 40px;
  padding: 0 ${(props) => box(props).space.xxl};

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
