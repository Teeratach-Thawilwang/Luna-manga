import { Descendant } from "slate";

import styled from "styled-components";

import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { MarkTextAlign } from "@enums/MarkFormat";
import { TextEditorElement } from "@interfaces/EditorInterface";
import { color } from "@utils/Themes";

export default function RenderText({ node }: { node: TextEditorElement }) {
  const children = createChildren(node);
  return (
    <Box $textalign={getTextAlign(node?.align)} $fontFamily={node?.fontFamily ?? FontFamilyEnum.SARABUN} $fontSize={node?.fontSize ?? 16}>
      {children}
    </Box>
  );
}

const Box = styled.p<{ $textalign: string; $fontFamily: string; $fontSize: number }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 0px;

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => `${props.$fontSize}px`} !important;
  font-family: ${(props) => props.$fontFamily} !important;

  text-align: ${(props) => props.$textalign} !important;
  word-wrap: break-word;
`;

const Span = styled.span`
  /* border: 1px solid red; */

  user-select: none;
`;

function createChildren(node: TextEditorElement) {
  return node.children.map((item, key) => {
    return (
      <Span style={getFontStyle(item)} key={key}>
        {(item as { text: string }).text.replace(/ /g, "\u00A0")}
      </Span>
    );
  });
}

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

function getFontStyle(leaf: Descendant) {
  return {
    fontWeight: "bold" in leaf ? "bold" : "normal",
    fontStyle: "italic" in leaf ? "italic" : "normal",
    textDecoration: "underline" in leaf ? "underline" : "none",
  };
}
