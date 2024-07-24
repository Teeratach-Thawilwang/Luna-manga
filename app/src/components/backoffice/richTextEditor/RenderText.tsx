import { RenderElementProps } from "slate-react";

import styled from "styled-components";

import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { MarkTextAlign } from "@enums/MarkFormat";
import { TextEditorElement } from "@interfaces/EditorInterface";

export default function RenderText(props: RenderElementProps) {
  const element = props.element as TextEditorElement;
  return (
    <Box
      {...props.attributes}
      $textalign={getTextAlign(element?.align)}
      $fontFamily={element?.fontFamily ?? FontFamilyEnum.SARABUN}
      $fontSize={element?.fontSize ?? 18}
    >
      {props.children}
    </Box>
  );
}

const Box = styled.p<{ $textalign: string; $fontFamily: string; $fontSize: number }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  color: #000000;
  margin: 0px;

  text-align: ${(props) => props.$textalign} !important;
  font-size: ${(props) => `${props.$fontSize}px`} !important;
  font-family: ${(props) => props.$fontFamily} !important;
`;

function getTextAlign(align: MarkTextAlign | undefined) {
  switch (align) {
    case MarkTextAlign.ALIGN_LEFT:
      return MarkTextAlign.ALIGN_LEFT;
    case MarkTextAlign.ALIGN_CENTER:
      return MarkTextAlign.ALIGN_CENTER;
    case MarkTextAlign.ALIGN_RIGHT:
      return MarkTextAlign.ALIGN_RIGHT;
    case MarkTextAlign.ALIGN_JUSTIFY:
      return MarkTextAlign.ALIGN_JUSTIFY;
    default:
      return MarkTextAlign.ALIGN_LEFT;
  }
}
