import { BaseEditor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import styled from "styled-components";

import { TextEditorElement } from "@interfaces/EditorInterface";

export default function FontSizeSelector() {
  const editor = useSlate();

  function onChangeHandle(event: any) {
    Transforms.setNodes(editor, { fontSize: event.target.value } as Partial<Node>);
    ReactEditor.focus(editor as ReactEditor);
  }

  return (
    <Box>
      <Select onChange={onChangeHandle} value={getCurrentFontSize(editor)}>
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

const Select = styled.select`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  min-width: 55px;

  color: #000;
  background-color: #e8ecec;

  display: block;
  /* border: 1px solid #a0a0a0; */
  border-radius: 2px;
  outline: none;
  border-right: 5px solid transparent;
  border-top: transparent;
  border-left: transparent;
  border-bottom: transparent;

  margin: 0px;
  padding: 0 0 0 5px;

  font-size: 16px;
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

const Option = styled.option`
  &:hover {
    cursor: pointer;
  }
`;

function createOption(): JSX.Element[] {
  const fontSize: JSX.Element[] = [];
  for (let i = 14; i <= 40; i++) {
    fontSize.push(
      <Option value={i} key={i}>
        {i}
      </Option>,
    );
  }
  return fontSize;
}

function getCurrentFontSize(editor: BaseEditor): number {
  const selectedNodeIndex = editor.selection?.anchor.path[0];
  if (selectedNodeIndex != null) {
    const selectedNode = editor.children[selectedNodeIndex] as TextEditorElement;
    return selectedNode.fontSize as number;
  }

  const lastIndex = editor.children.length - 1;
  const lastChild = editor.children[lastIndex] as any;
  return lastChild.fontSize as number;
}
