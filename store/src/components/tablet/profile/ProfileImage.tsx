import styled from "styled-components";

import DefaultUserIcon from "@components/iconSvg/DefaultUserIcon";
import ProfileService from "@services/ProfileService";
import { box, color } from "@utils/Themes";

export default function ProfileImage() {
  const profileImages = ProfileService.getProfileImages();

  if (profileImages.length == 0) {
    return (
      <Box>
        <DefaultProfileImage>
          <DefaultUserIcon />
        </DefaultProfileImage>
      </Box>
    );
  }

  return (
    <Box>
      <Image src={profileImages[0].desktop} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  /* border: 1px solid red; */
  width: 200px;
  height: 200px;
  border-radius: ${(props) => box(props).borderRadius.full};
  border: 4px solid ${(props) => color(props).primary};

  object-fit: cover;
`;

const DefaultProfileImage = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  border-radius: ${(props) => box(props).borderRadius.full};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 200px;
    height: 200px;
    text-align: center;

    circle:nth-child(1) {
      fill: ${(props) => color(props).secondary};
      stroke: ${(props) => color(props).secondary};
    }

    circle:nth-child(2) {
      stroke: ${(props) => color(props).secondary};
    }

    path {
      fill: ${(props) => color(props).secondary};
      stroke: ${(props) => color(props).secondary};
    }
  }
`;
