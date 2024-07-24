import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";

import { useState } from "react";

import styled from "styled-components";

import TrashIcon from "@components/iconSvg/TrashIcon";
import { TextEditorElement } from "@interfaces/EditorInterface";

export default function RenderImage(props: RenderElementProps) {
  const editor = useSlateStatic() as ReactEditor;
  const element = props.element as TextEditorElement;
  const imageUrl = URL.createObjectURL(element.file!);
  const [isHover, setIsHover] = useState(false);

  function onDeleteImage() {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  }

  return (
    <Box {...props.attributes} contentEditable={false}>
      {props.children}
      <ImageBox onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <Image src={imageUrl} />
        <IconBox $isShow={isHover} onClick={onDeleteImage}>
          <TrashIcon />
        </IconBox>
      </ImageBox>
    </Box>
  );
}

const Box = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  width: 20%;

  display: flex;
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  z-index: 98;

  pointer-events: none;
`;

const IconBox = styled.div<{ $isShow: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  display: ${(props) => (props.$isShow ? "block" : "none")};
  width: 35px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;

  svg {
    display: ${(props) => (props.$isShow ? "block" : "none")};
    width: 25px;
    height: 25px;
    fill: #ffffff;
  }

  path {
    display: ${(props) => (props.$isShow ? "block" : "none")};
    fill: #ffffff;
    stroke-width: 1px;
    stroke: #ffffff;
  }

  &:hover {
    cursor: pointer;
  }
`;
