import { styled } from "styled-components";

import DefaultUserIcon from "@components/iconSvg/DefaultUserIcon";
import CustomerProfileService from "@services/CustomerProfileService";
import { box, color } from "@utils/Themes";

export default function ProfileImage() {
  const customerProfile = CustomerProfileService.getProfile()!;

  if (customerProfile.profile_image.length > 0) {
    return <Image src={customerProfile.profile_image[0].desktop} />;
  }

  return (
    <DefaultProfileImage>
      <DefaultUserIcon />
    </DefaultProfileImage>
  );
}

const Image = styled.img`
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  border-radius: ${(props) => box(props).borderRadius.full};
  border: 2px solid ${(props) => color(props).primary};

  object-fit: cover;
`;

const DefaultProfileImage = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    text-align: center;

    circle:nth-child(1) {
      fill: #fff;
      stroke: #fff;
    }

    circle:nth-child(2) {
      stroke: #fff;
    }

    path {
      fill: #fff;
      stroke: #fff;
    }
  }
`;
