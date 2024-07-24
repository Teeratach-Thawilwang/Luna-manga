import React, { useState } from "react";

import styled from "styled-components";

import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

interface InputTextInterface {
  type: string;
  name: string;
  placeholder: string;
}

export default function InputText({ type, name, placeholder }: InputTextInterface) {
  const [isFocus, setIsFocus] = useState(false);
  const value = SignInSignUpService.getter<string>(name);

  return (
    <Box>
      <Input
        type={type}
        name={name}
        value={value ?? undefined}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => SignInSignUpService.update({ [e.target.name]: e.target.value })}
      />
      <PlaceHolder $isFocus={isFocus || value.length != 0}>{placeholder}</PlaceHolder>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};
  height: ${(props) => `calc(${font(props).lineHeight.md} + 2*${box(props).space.sm})`};

  background-color: ${(props) => color(props).surfaceContainerHighest};
  border-radius: ${(props) => box(props).borderRadius.md};

  position: relative;
  z-index: ${(props) => box(props).zIndex.base};
`;

const PlaceHolder = styled.div<{ $isFocus: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin-left: ${(props) => (props.$isFocus ? 0 : box(props).space.sm)};

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

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: ${(props) => box(props).space.sm} ${(props) => box(props).space.sm};
  outline: none;

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius.md};
  box-shadow: inset 0px 0px 0px 1px ${(props) => color(props).outlineVariant};

  color: ${(props) => color(props).onSurface};
  background-color: transparent;

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};
  line-height: ${(props) => font(props).lineHeight.md};
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
