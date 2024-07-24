import { darken } from "polished";

import styled from "styled-components";

import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import ValidationService from "@services/ValidationService";
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
  const { id: customerId, firstName, lastName, nickName, email, editProfileError } = EditCustomerProfileService.getState();

  async function onSubmit() {
    if (customerId == null || blobRef == null) {
      return;
    }

    const validateFirstName = ValidationService.validateName(firstName, "ชื่อจริง");
    if (!validateFirstName.isSuccess) {
      EditCustomerProfileService.update({ editProfileError: validateFirstName.errorMessage });
      return;
    }

    const validateLastName = ValidationService.validateName(lastName, "นามสกุล");
    if (!validateLastName.isSuccess) {
      EditCustomerProfileService.update({ editProfileError: validateLastName.errorMessage });
      return;
    }

    const validateNickName = ValidationService.validateName(nickName, "ชื่อเล่น");
    if (!validateNickName.isSuccess) {
      EditCustomerProfileService.update({ editProfileError: validateNickName.errorMessage });
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

  return (
    <Box $isShortMargin={editProfileError.length != 0} onClick={onSubmit}>
      บันทึก
    </Box>
  );
}

const Box = styled.div<{ $isShortMargin: boolean }>`
  width: 100%;
  margin-top: ${(props) => (props.$isShortMargin ? box(props).space.sm : box(props).space.lg)};
  padding: ${(props) => box(props).space.md} 0;
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.sm};
  font-family: Inter;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
