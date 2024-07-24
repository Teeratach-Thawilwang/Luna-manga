import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { SignInSignUpFormStateEnum } from "@enums/frontside/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function ForgotPasswordHeaderForm() {
  return (
    <Box>
      <ImageIcon onClick={() => SignInSignUpService.setSelector(SignInSignUpFormStateEnum.LOGIN)}>
        <ExpandLeftIcon />
      </ImageIcon>
      <Text>Change Password</Text>
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

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 0;

  color: ${(props) => color(props).primary};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  font-family: Inter;
  line-height: ${(props) => font(props).lineHeight.lg};
  text-align: center;
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
  top: -${(props) => box(props).space.sm};
  left: 10px;

  svg {
    width: ${(props) => font(props).lineHeight.lg};
    height: ${(props) => font(props).lineHeight.lg};

    path {
      stroke: ${(props) => color(props).primary};
      stroke-width: 5px;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }
`;
