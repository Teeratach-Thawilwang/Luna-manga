import { styled } from "styled-components";

import Logo from "@components/mobile/Logo";
import LogoutButtonItem from "@components/mobile/navbar/menu/LogoutButtonItem";
import ProfileButtonItem from "@components/mobile/navbar/menu/ProfileButtonItem";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import { box, color } from "@utils/Themes";

interface MenuModalInterface {
  isShow: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function MenuModal({ isShow, setActive }: MenuModalInterface) {
  if (!isShow) {
    return <></>;
  }

  return (
    <Box>
      <LogoBox>
        <Logo />
      </LogoBox>
      <ProfileButtonItem setActive={setActive} />
      <LogoutButtonItem />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: calc(100dvh - 60px);
  padding: ${(props) => box(props).space.md};
  padding-top: 0;

  background-color: ${(props) => color(props).surface};

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  overflow-y: scroll;
  overflow-x: hidden;

  position: fixed;
  top: 0;

  z-index: ${(props) => box(props).zIndex.modal};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LogoBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;
