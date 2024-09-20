import { styled } from "styled-components";

import DefaultUserIcon from "@components/iconSvg/DefaultUserIcon";
import CustomerProfileService from "@services/CustomerProfileService";
import { box, color } from "@utils/Themes";

export default function ProfileImage({ isActive }: { isActive: boolean }) {
  const customerProfile = CustomerProfileService.getProfile()!;

  if (customerProfile.profile_image.length > 0) {
    return <Image src={customerProfile.profile_image[0].desktop} $isActive={isActive} />;
  }

  return (
    <DefaultProfileImage $isActive={isActive}>
      <DefaultUserIcon />
    </DefaultProfileImage>
  );
}

const Image = styled.img<{ $isActive: boolean }>`
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  border-radius: ${(props) => box(props).borderRadius.full};
  border: ${(props) => (props.$isActive ? `1px solid ${color(props).primary}` : "0")};

  object-fit: cover;

  transform: scale(1.4);
`;

const DefaultProfileImage = styled.div<{ $isActive: boolean }>`
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
    transform: scale(1.3);

    circle:nth-child(1) {
      fill: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
    }

    circle:nth-child(2) {
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
    }

    path {
      fill: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
    }
  }
`;
