import { Descendant } from "slate";

import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { TextEditorElement } from "@interfaces/EditorInterface";

export function countCharacterFromChildren(children: Descendant[]) {
  return children.reduce((prev, curr) => {
    const text = (curr as { text: string }).text;
    return prev + text.length;
  }, 0);
}

export function countCharacterFromEditor(textEditor: TextEditorElement[]) {
  const textNodes = textEditor.filter((node) => node.type == ElementTypeEnum.TEXT);
  return textNodes.reduce((prev, curr) => {
    const count = countCharacterFromChildren(curr.children);
    return prev + count;
  }, 0);
}
