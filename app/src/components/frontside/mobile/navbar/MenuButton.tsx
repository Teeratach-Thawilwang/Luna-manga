import { styled } from "styled-components";

import ProfileImage from "@components/frontside/mobile/navbar/miniProfile/ProfileImage";
import { NavigationModelEnum } from "@enums/frontside/NavigationModelEnum";
import { color, font } from "@utils/Themes";

interface MenuButtonInterface {
  isActive: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function MenuButton({ isActive, setActive }: MenuButtonInterface) {
  function onClick() {
    if (isActive) {
      setActive(NavigationModelEnum.NONE);
    } else {
      setActive(NavigationModelEnum.MENU);
    }
  }
  return (
    <Box $isActive={isActive} onClick={onClick}>
      <ProfileImageBox>
        <ProfileImage isActive={isActive} />
      </ProfileImageBox>
      <Text $isActive={isActive}>เมนู</Text>
    </Box>
  );
}

const Box = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px 0;

  cursor: pointer;
`;

const ProfileImageBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  width: ${(props) => font(props).size.md};
  height: ${(props) => font(props).size.md};
`;

const Text = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
  font-size: ${(props) => font(props).size.xs};
`;
