import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import Logo from "@components/mobile/Logo";
import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function LogoWithBackButton() {
  return (
    <Box>
      <ImageIcon onClick={() => SignInSignUpService.setSelector(SignInSignUpFormStateEnum.LOGIN)}>
        <ExpandLeftIcon />
      </ImageIcon>
      <LogoBox>
        <Logo />
      </LogoBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;

  position: relative;
`;

const LogoBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;

const ImageIcon = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: ${(props) => box(props).borderRadius.full};
  padding: ${(props) => box(props).space.sm};

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: -${(props) => box(props).space.md};
  transform: translateY(-50%);

  svg {
    width: ${(props) => font(props).size["4xl"]};
    height: ${(props) => font(props).size["4xl"]};

    path {
      stroke: ${(props) => color(props).primary};
      stroke-width: 2px;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }
`;
