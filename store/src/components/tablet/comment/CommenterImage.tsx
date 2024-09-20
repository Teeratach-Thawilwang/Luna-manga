import { Link } from "react-router-dom";

import styled from "styled-components";

import DefaultUserIcon from "@components/iconSvg/DefaultUserIcon";
import { CommenterInterface } from "@interfaces/CommentInterface";
import { box, font } from "@utils/Themes";

export default function CommenterImage({ commenter }: { commenter: CommenterInterface }) {
  if (commenter.images.length == 0) {
    return (
      <DefaultProfileImage to={`/profile/${commenter.id}`}>
        <DefaultUserIcon />
      </DefaultProfileImage>
    );
  }

  return (
    <Box to={`/profile/${commenter.id}`}>
      <Image src={commenter.images[0].desktop} />
    </Box>
  );
}

const Box = styled(Link)`
  /* border: 1px solid red; */
  width: 50px;
  height: 50px;
  text-decoration: none;

  &:hover {
    opacity: ${(props) => font(props).opacity.hover};
  }
`;

const Image = styled.img`
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  display: block;
  object-fit: cover;
`;

const DefaultProfileImage = styled(Box)`
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    text-align: center;

    circle:nth-child(2) {
      stroke: #fff;
    }

    path,
    circle:nth-child(1) {
      fill: #fff;
      stroke: #fff;
    }
  }
`;
