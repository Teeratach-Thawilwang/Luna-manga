import { styled } from "styled-components";

import { box, color, font } from "@utils/Themes";

interface BaseButtonInterface {
  children: string | number;
  isActive: boolean;
  isDisable: boolean;
  onClick?: () => void;
}

export default function BaseButton({ children, isActive, isDisable, onClick }: BaseButtonInterface) {
  return (
    <Box $isDisable={isDisable} onClick={onClick}>
      <Text $isActive={isActive} $isDisable={isDisable}>
        {children}
      </Text>
    </Box>
  );
}

const Box = styled.div<{ $isDisable: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: ${(props) => font(props).size["4xl"]};
  height: ${(props) => font(props).size["4xl"]};
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${(props) => (props.$isDisable ? "default" : "pointer")};
`;

const Text = styled.div<{ $isActive: boolean; $isDisable: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;

  border-radius: ${(props) => box(props).borderRadius.full};
  box-shadow: inset 0 0 0 1px ${(props) => (props.$isDisable ? "none" : color(props).primary)};

  color: ${(props) => getActiveColor(props)};
  background-color: ${(props) => getActiveBackgroundColor(props)};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${(props) => (props.$isDisable ? getActiveColor(props) : color(props).onPrimary)};
    background-color: ${(props) => (props.$isDisable ? getActiveBackgroundColor(props) : color(props).primary)};
  }
`;

function getActiveColor(props: { $isActive: boolean }) {
  return props.$isActive ? color(props).onPrimary : color(props).primary;
}

function getActiveBackgroundColor(props: { $isActive: boolean }) {
  return props.$isActive ? color(props).primary : color(props).surface;
}
