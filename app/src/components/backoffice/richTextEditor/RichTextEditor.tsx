import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";

import React, { useCallback, useState } from "react";

import styled from "styled-components";

import Leaf from "@components/backoffice/richTextEditor/Leaf";
import RenderAudio from "@components/backoffice/richTextEditor/RenderAudio";
import RenderImage from "@components/backoffice/richTextEditor/RenderImage";
import RenderText from "@components/backoffice/richTextEditor/RenderText";
import Toolbar from "@components/backoffice/richTextEditor/Toolbar";
import ToolbarBottom from "@components/backoffice/richTextEditor/ToolbarBottom";
import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { MarkTextAlign } from "@enums/MarkFormat";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { EditorInterface, TextEditorElement } from "@interfaces/EditorInterface";

const initialValue: TextEditorElement[] = [
  {
    type: ElementTypeEnum.TEXT,
    children: [{ text: "" }],
    fontSize: 16,
    fontFamily: FontFamilyEnum.MALI,
    align: MarkTextAlign.ALIGN_LEFT,
  },
];

interface RichTextEditorInterface {
  initialData?: TextEditorElement[];
  setData: (data: TextEditorElement[]) => void;
}

export default React.memo(function RichTextEditor({ initialData, setData }: RichTextEditorInterface) {
  const [editor] = useState<EditorInterface>(() => withReact(withHistory(createEditor())));
  const [placeHolderFontSize, setPlaceHolderFontSize] = useState<number>(16);
  const renderElement = useCallback(getRenderElement, []);
  const renderLeaf = useCallback(getRenderLeaf, []);
  const initial = (initialData && initialData.length > 0 ? initialData : null) ?? initialValue;

  function onChangeHandle(value: Descendant[]) {
    setData(value as TextEditorElement[]);
    const currentFontSize = getCurrentFontSize(editor);
    if (currentFontSize != placeHolderFontSize) {
      setPlaceHolderFontSize(currentFontSize);
    }
  }

  return (
    <Box>
      <Slate editor={editor} initialValue={initial} onChange={onChangeHandle}>
        <Toolbar />
        <CustomEditable
          // autoFocus
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={getRenderPlaceHolder(editor)}
          spellCheck={false}
          data-grammarly-part={false}
        />
        <ToolbarBottom />
      </Slate>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* width: 100%; */
  min-height: 200px;
  overflow-wrap: break-word;

  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);

  border-radius: 5px;

  display: flex;
  flex-direction: column;

  &:focus-within {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
`;

const CustomEditable = styled(Editable)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  flex-grow: 1;
  outline: none;
  border: 0 transparent;
  padding: 20px;

  /* width: 100%; */
  /* max-width: calc(100% - 250px - 40px - 40px); */
  max-width: calc(100vw - 250px - 40px - 10px);
  min-width: 750px;
`;

const PlaceHolderForEditor = styled.span<{ $fontSize: number }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  color: #000000;
  background-color: #fff;

  font-size: ${(props) => props.$fontSize.toString() + "px"};
  width: calc(100% - 40px);
  display: block;

  position: absolute;
  top: 20px;
`;

function getCurrentFontSize(editor: EditorInterface) {
  const lastIndex = editor.children.length - 1;
  const lastChild = editor.children[lastIndex] as any;
  return (lastChild?.fontSize as number) ?? 16;
}

function getRenderElement(props: RenderElementProps) {
  const element = props.element as TextEditorElement;
  const type = element.type;
  switch (type) {
    case ElementTypeEnum.TEXT:
      return <RenderText {...props} />;
    case ElementTypeEnum.IMAGE:
      return <RenderImage {...props} />;
    case ElementTypeEnum.AUDIO:
      return <RenderAudio {...props} />;
    default:
      return <RenderText {...props} />;
  }
}

function getRenderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />;
}

function getRenderPlaceHolder(editor: EditorInterface) {
  return (
    <PlaceHolderForEditor $fontSize={getCurrentFontSize(editor)}>เขียนเรื่องราวพร้อมแทรกเสียงประกอบได้เลย !</PlaceHolderForEditor>
  ) as unknown as string;
}
