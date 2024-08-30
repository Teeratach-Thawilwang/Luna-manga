import { BaseEditor, Descendant, Element } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { MarkTextAlign } from "@enums/MarkFormat";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";

export interface TextEditorElement extends Element {
  children: ChildrenElement[];
  type: ElementTypeEnum;
  fontSize?: number; // plan to move into children
  fontFamily?: FontFamilyEnum; // plan to move into children
  align?: MarkTextAlign;
  file?: File;
  file_id?: number;
  url?: string;
}

export type ChildrenElement = Descendant & {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export interface MangaEditorElement {
  type: ElementTypeEnum;
  file?: File;
  file_id?: number;
  url?: string;
}

export interface EditorInterface extends BaseEditor, HistoryEditor, ReactEditor {}
