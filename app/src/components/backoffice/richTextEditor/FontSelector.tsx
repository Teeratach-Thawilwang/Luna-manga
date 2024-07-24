import { BaseEditor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import styled from "styled-components";

import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { TextEditorElement } from "@interfaces/EditorInterface";

export default function FontSelector() {
  const editor = useSlate();
  const fontFamily = getCurrentFont(editor);

  function onChangeHandle(event: any) {
    Transforms.setNodes(editor, { fontFamily: event.target.value } as Partial<Node>);
    ReactEditor.focus(editor as ReactEditor);
  }

  return (
    <Box>
      <Select $fontFamily={fontFamily} onChange={onChangeHandle} value={fontFamily}>
        {createOption()}
      </Select>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 30px;
  margin-left: 10px;
  padding: 0px;
`;

const Select = styled.select<{ $fontFamily: FontFamilyEnum }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  min-width: 200px;

  color: #000;
  background-color: #e8ecec;

  display: block;
  /* border: 1px solid #a0a0a0; */
  border-radius: 2px;
  outline: none;
  border-right: 10px solid transparent;
  border-top: transparent;
  border-left: transparent;
  border-bottom: transparent;

  margin: 0px;
  padding: 0 0 0 10px;

  font-size: 16px;
  font-family: ${(props) => props.$fontFamily};
  /* font-weight: lighter; */

  &:hover {
    cursor: pointer;
    background-color: #bfc5cc;

    option {
      background-color: #ffffff;
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #9c9c9c;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
`;

const Option = styled.option<{ $fontFamily: FontFamilyEnum }>`
  font-family: ${(props) => props.$fontFamily};

  color: #000;
  background-color: #fff;
`;

function createOption() {
  return Object.values(FontFamilyEnum).map((item, key) => {
    return (
      <Option $fontFamily={item} value={item} key={key}>
        {item}
      </Option>
    );
  });
}

function getCurrentFont(editor: BaseEditor): FontFamilyEnum {
  const selectedNodeIndex = editor.selection?.anchor.path[0];
  if (selectedNodeIndex != null) {
    const selectedNode = editor.children[selectedNodeIndex] as TextEditorElement;
    return selectedNode.fontFamily as FontFamilyEnum;
  }

  const lastIndex = editor.children.length - 1;
  const lastChild = editor.children[lastIndex] as any;
  return lastChild.fontFamily as FontFamilyEnum;
}
