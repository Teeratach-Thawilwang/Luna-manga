import { useRef, useState } from "react";

import styled from "styled-components";

import MiniProfileModal from "@components/tablet/navbar/miniProfile/MiniProfileModal";
import ProfileImage from "@components/tablet/navbar/miniProfile/ProfileImage";
import { addEventClick } from "@utils/Hooks";
import { box, font } from "@utils/Themes";

export default function MiniProfileButton() {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);

  addEventClick((event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsModalShow(false);
    }
  });

  return (
    <Box>
      <ProfileIcon onClick={() => setIsModalShow(!isModalShow)} ref={dropDownRef}>
        <ProfileImageBox>
          <ProfileImage />
        </ProfileImageBox>
      </ProfileIcon>
      <MiniProfileModal isShow={isModalShow} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  position: relative;
`;

const ProfileIcon = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: ${(props) => font(props).opacity.hover};
  }

  &:active {
    opacity: ${(props) => font(props).opacity.active};
    transform: scale(${(props) => font(props).opacity.active});
  }
`;

const ProfileImageBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  width: ${(props) => `calc(${font(props).size.xl} + 2*${box(props).space.sm})`};
  height: ${(props) => `calc(${font(props).size.xl} + 2*${box(props).space.sm})`};
`;
