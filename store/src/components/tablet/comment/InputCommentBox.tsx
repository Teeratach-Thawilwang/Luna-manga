import { darken } from "polished";

import { useRef, useState } from "react";

import styled from "styled-components";

import SendMessageIcon from "@components/iconSvg/SendMessageIcon";
import { box, color, font } from "@utils/Themes";

interface InputCommentBoxInterface {
  onSubmit: (text: string) => void;
  maxCharecter?: number;
}

export default function InputCommentBox({ onSubmit, maxCharecter = 200 }: InputCommentBoxInterface) {
  const inputRef = useRef<HTMLSpanElement>(null);
  const countCharacterRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowPlaceHolder, setIsShowPlaceHolder] = useState(true);

  function setCursorToEnd() {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputRef.current!);
    range.collapse(false);
    selection!.removeAllRanges();
    selection!.addRange(range);
  }

  function onInputChange() {
    const text = inputRef.current!.innerText;
    if (text != "" && isShowPlaceHolder) {
      setIsShowPlaceHolder(false);
    }

    if (text == "" && !isShowPlaceHolder) {
      setIsShowPlaceHolder(true);
    }

    if (text.length >= maxCharecter) {
      inputRef.current!.innerText = text.slice(0, maxCharecter);
      setCursorToEnd();
    }

    countCharacterRef.current!.innerText = `${inputRef.current!.innerText.length}/${maxCharecter}`;
  }

  function onSubmitHandle() {
    const text = inputRef.current!.innerText.replace(/\n\s*\n/g, "\n");
    if (text.length > 0 && text != "\n") {
      onSubmit(text);
      inputRef.current!.innerText = "";
      countCharacterRef.current!.innerText = `0/${maxCharecter}`;
      setIsShowPlaceHolder(true);
    } else if (text == "\n") {
      inputRef.current!.innerText = "";
      countCharacterRef.current!.innerText = `0/${maxCharecter}`;
      setIsShowPlaceHolder(true);
    } else {
      inputRef.current!.innerText = text;
      countCharacterRef.current!.innerText = `${text.length}/${maxCharecter}`;
    }
  }

  function InputFocus(event: any) {
    event.preventDefault();
    if (inputRef) {
      inputRef.current!.focus();
    }
  }

  return (
    <Box $isFocus={isFocus}>
      <Input
        ref={inputRef}
        role="textbox"
        onInput={onInputChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        contentEditable
        data-gramm="false"
      />
      {isShowPlaceHolder && !isFocus && <PlaceHolder onMouseDown={(e) => InputFocus(e)}>เขียนความคิดเห็น</PlaceHolder>}
      <IconBox onClick={onSubmitHandle}>
        <SendMessageIcon />
      </IconBox>
      <CharacterCount ref={countCharacterRef} />
    </Box>
  );
}

const Box = styled.div<{ $isFocus: boolean }>`
  /* border: 1px solid red; */
  width: 100%;

  border-radius: ${(props) => box(props).borderRadius.md};
  box-shadow: inset 0px 0px 0px 1px ${(props) => (props.$isFocus ? color(props).primary : color(props).outlineVariant)};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  overflow-y: auto;

  z-index: ${(props) => box(props).zIndex.base};
`;

const Input = styled.span`
  border: 0 transparent;
  min-height: 80px;
  height: 100%;
  padding: 10px;

  color: ${(props) => color(props).onSurface};
  background-color: transparent;

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};

  outline: none;
  overflow: hidden;
  flex: 1;
`;

const PlaceHolder = styled.span`
  border: 0 transparent;
  background: transparent;

  color: ${(props) => darken(1 - font(props).opacity.hover, color(props).onSurface)};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.light};

  position: absolute;
  top: 10px;
  left: 10px;

  z-index: -1;

  &:hover {
    cursor: text;
  }
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 70px;
  height: 100px;
  margin-top: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 50px;
    height: 50px;

    fill: ${(props) => color(props).onSurface};
    path {
      stroke: ${(props) => color(props).onSurface};
      stroke-width: 2;
    }
  }

  &:hover {
    cursor: pointer;
    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    opacity: 0.7;
    svg {
      transform: scale(1);
    }
  }
`;

const CharacterCount = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 70px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
  text-align: center;

  position: absolute;
  bottom: 0;
  right: 0;
`;
