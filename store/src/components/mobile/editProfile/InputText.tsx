import { useState } from "react";

import styled from "styled-components";

import EditCustomerProfileService from "@services/EditCustomerProfileService";
import { box, color, font } from "@utils/Themes";

interface InputTextInterface {
  name: string;
  type: string;
  palceHolder: string;
  isDisable?: boolean;
}

export default function InputText({ name, type, palceHolder, isDisable = false }: InputTextInterface) {
  const [isFocus, setIsFocus] = useState(false);
  const value = EditCustomerProfileService.getter<string>(name);

  return (
    <Box $isDisable={isDisable}>
      <Input
        type={type}
        name={name}
        value={value ?? undefined}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => EditCustomerProfileService.update({ [e.target.name]: e.target.value })}
        disabled={isDisable}
        $isDisable={isDisable}
      />
      <PlaceHolder $isFocus={isFocus || value.length != 0}>{palceHolder}</PlaceHolder>
    </Box>
  );
}

const Box = styled.div<{ $isDisable: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};
  height: ${(props) => `calc(${font(props).lineHeight.sm} + 2*${box(props).space.md})`};

  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  background-color: ${(props) => (props.$isDisable ? color(props).surfaceContainer : color(props).surfaceContainerHighest)};

  position: relative;
  z-index: ${(props) => box(props).zIndex.base};
`;

const PlaceHolder = styled.div<{ $isFocus: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin-left: ${(props) => (props.$isFocus ? box(props).space.md : box(props).space.md)};

  color: ${(props) => (props.$isFocus ? color(props).primary : color(props).onSurface)};
  background-color: transparent;
  font-size: ${(props) => font(props).size.md};

  position: absolute;
  top: ${(props) => (props.$isFocus ? 0 : "50%")};
  left: 0;
  transform: ${(props) => (props.$isFocus ? `translate(-10%, -90%) scale(0.8)` : `translateY(-50%)`)};
  transition-duration: 100ms;

  z-index: ${(props) => box(props).zIndex.base};
`;

const Input = styled.input<{ $isDisable: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: ${(props) => box(props).space.md};
  outline: none;

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  box-shadow: inset 0px 0px 0px 1px ${(props) => color(props).outlineVariant};

  color: ${(props) => (props.$isDisable ? color(props).onSurfaceVariant : color(props).onSurface)};
  background-color: transparent;

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};
  line-height: ${(props) => font(props).lineHeight.sm};
  background-clip: text;

  position: absolute;
  top: 0;
  left: 0;

  z-index: ${(props) => box(props).zIndex.modal};

  &:focus {
    box-shadow: inset 0px 0px 0px 1px ${(props) => color(props).primary};
    background-color: transparent;
  }
`;
