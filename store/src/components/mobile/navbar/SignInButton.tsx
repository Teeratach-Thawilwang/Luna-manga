import { styled } from "styled-components";

import SignInIcon from "@components/iconSvg/SignInIcon";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import { color, font } from "@utils/Themes";

interface SignInButtonInterface {
  isActive: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function SignInButton({ isActive, setActive }: SignInButtonInterface) {
  function onClick() {
    if (isActive) {
      setActive(NavigationModelEnum.NONE);
    } else {
      setActive(NavigationModelEnum.SIGNIN);
    }
  }
  return (
    <Box $isActive={isActive} onClick={onClick}>
      <SignInIcon />
      <Text $isActive={isActive}>เข้าสู่ระบบ</Text>
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

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};
    transform: scale(1.2);

    path {
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};

      &:last-child {
        fill: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
        stroke-width: 0;
      }
    }
  }
`;

const Text = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
  font-size: ${(props) => font(props).size.xs};
`;
