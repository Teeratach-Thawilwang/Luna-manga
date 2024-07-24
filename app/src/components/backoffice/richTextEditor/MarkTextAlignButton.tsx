import { BaseEditor, Editor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import styled from "styled-components";

import { MarkTextAlign } from "@enums/MarkFormat";
import { TextEditorElement } from "@interfaces/EditorInterface";

export default function MarkTextAlignButton({ format, icon }: { format: string; icon: any }) {
  const editor = useSlate();

  function onClickHandle(event: any) {
    event.preventDefault();
    toggleMark(editor, format);
    removeMarkTextAlign(editor, format);
    ReactEditor.focus(editor as ReactEditor);
  }
  return (
    <IconBox $active={isMarkActive(editor, format)} onMouseDown={onClickHandle}>
      {icon}
    </IconBox>
  );
}

const IconBox = styled.div<{ $active: boolean }>`
  /* border: 1px solid green; */
  width: 35px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;
  }

  path {
    fill: ${(props) => (props.$active ? "#000" : "#9a9a9a")};
  }

  &:hover {
    cursor: pointer;
  }
`;

function isMarkActive(editor: BaseEditor, format: string): boolean {
  const selectedNodeIndex = editor.selection?.anchor.path[0];
  if (selectedNodeIndex != null) {
    const selectedNode = editor.children[selectedNodeIndex] as TextEditorElement;
    return selectedNode.align == format;
  }

  const marks = Editor.marks(editor) as any;
  return marks?.[format] === true;
}

function toggleMark(editor: BaseEditor, format: string) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function removeMarkTextAlign(editor: BaseEditor, format: string) {
  switch (format) {
    case MarkTextAlign.ALIGN_LEFT:
      Editor.removeMark(editor, MarkTextAlign.ALIGN_CENTER);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_RIGHT);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_JUSTIFY);
      Transforms.setNodes(editor, { align: format } as Partial<Node>);
      break;
    case MarkTextAlign.ALIGN_CENTER:
      Editor.removeMark(editor, MarkTextAlign.ALIGN_LEFT);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_RIGHT);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_JUSTIFY);
      Transforms.setNodes(editor, { align: format } as Partial<Node>);
      break;
    case MarkTextAlign.ALIGN_RIGHT:
      Editor.removeMark(editor, MarkTextAlign.ALIGN_LEFT);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_CENTER);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_JUSTIFY);
      Transforms.setNodes(editor, { align: format } as Partial<Node>);
      break;
    case MarkTextAlign.ALIGN_JUSTIFY:
      Editor.removeMark(editor, MarkTextAlign.ALIGN_LEFT);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_CENTER);
      Editor.removeMark(editor, MarkTextAlign.ALIGN_RIGHT);
      Transforms.setNodes(editor, { align: format } as Partial<Node>);
      break;
  }
}
