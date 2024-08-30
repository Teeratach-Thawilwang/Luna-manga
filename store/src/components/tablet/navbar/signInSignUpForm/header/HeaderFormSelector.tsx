import { darken, lighten } from "polished";

import styled from "styled-components";

import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/SignInSignUpService";
import { color, font } from "@utils/Themes";

export default function HeaderFormSelector({ selector, children }: { selector: SignInSignUpFormStateEnum; children: string }) {
  const selectorState = SignInSignUpService.getter<SignInSignUpFormStateEnum>("selector");

  return (
    <Box onClick={() => SignInSignUpService.setSelector(selector)}>
      <Text $active={selectorState == selector}>{children}</Text>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 40%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div<{ $active: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  padding: 0;

  border-bottom: ${(props) => (props.$active ? `3px solid ${getTextColor(props)}` : "0px")};
  color: ${(props) => getTextColor(props)};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  font-family: Inter;
  line-height: ${(props) => font(props).lineHeight.lg};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${(props) => lighten(1 - font(props).opacity.hover, getTextColor(props))};
    border-bottom: ${(props) => (props.$active ? `3px solid ${lighten(1 - font(props).opacity.hover, getTextColor(props))}` : "0px")};
  }
`;

function getTextColor(props: { $active: boolean }) {
  if (props.$active) {
    return color(props).primary;
  }
  return darken(1 - font(props).opacity.inactive, color(props).primary);
}
