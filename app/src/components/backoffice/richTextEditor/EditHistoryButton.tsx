import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, useSlate } from "slate-react";

import { MouseEvent } from "react";

import styled from "styled-components";

import { MarkEditHistory } from "@enums/MarkFormat";

export default function EditHistoryButton({ format, icon }: { format: string; icon: any }) {
  const editor = useSlate() as BaseEditor & HistoryEditor & ReactEditor;

  function onClickHandle(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    switch (format) {
      case MarkEditHistory.REDO:
        redoHandle(editor);
        break;
      case MarkEditHistory.UNDO:
        undoHandle(editor);
        break;
    }
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

function isMarkActive(editor: BaseEditor & HistoryEditor & ReactEditor, format: string): boolean {
  if (format == MarkEditHistory.REDO) {
    return editor.history.redos.length > 0;
  }
  return editor.history.undos.length > 0;
}

function undoHandle(editor: BaseEditor & HistoryEditor & ReactEditor): void {
  if (editor.history.undos.length == 0) {
    return;
  }
  HistoryEditor.undo(editor);
}

function redoHandle(editor: BaseEditor & HistoryEditor & ReactEditor): void {
  if (editor.history.redos.length == 0) {
    return;
  }
  HistoryEditor.redo(editor);
}
