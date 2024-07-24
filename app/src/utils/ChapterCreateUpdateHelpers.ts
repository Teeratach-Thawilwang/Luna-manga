import { Dispatch, SetStateAction } from "react";

import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { ChapterCreateEditSliceInterface } from "@interfaces/backoffice/ChapterInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";
import FileService from "@services/backoffice/FileService";
import { countCharacterFromEditor } from "@utils/SlateService";

export function validateStory(story: StoryListInterface | null) {
  if (story == null) {
    return "จำเป็นต้องเลือกเรื่องในการสร้างตอน";
  }
  return "";
}

export function validateCoverImage(coverImage: File | ImageInterface | null) {
  if (coverImage == null) {
    return "จำเป็นต้องมีรูปหน้าปกตอนขนาดเล็ก";
  }
  return "";
}

export function validateName(name: string | null) {
  if (name != null && name.length == 0) {
    return "จำเป็นต้องกำหนดชื่อตอน";
  }
  return "";
}

export function validateChapterNumber(chapterNumber: number | null) {
  if (chapterNumber == null) {
    return "จำเป็นต้องกำหนดเลขที่ตอน";
  }
  return "";
}

export function validateCharacterCount(
  textEditor: TextEditorElement[],
  minimumCharacterCount: number = 2000,
  maximumCharacterCount: number = 10000,
): string {
  const characterCount = countCharacterFromEditor(textEditor);
  if (characterCount < minimumCharacterCount) {
    return "ต้องมีตัวอักษรอย่างน้อย 2000 ตัวอักษร";
  }

  if (characterCount > maximumCharacterCount) {
    return "จำกัดตัวอักษรไม่เกิน 10000 ตัวอักษร";
  }

  return "";
}

export function isAudioNearAudio(mangaEditor: MangaEditorElement[]) {
  return (
    mangaEditor.reduce((prev, curr) => {
      if (curr.type == ElementTypeEnum.AUDIO) {
        return prev + 1;
      }

      if (prev >= 2) {
        return prev;
      }

      return 0;
    }, 0) < 2
  );
}

export function validateImageEditor(mangaEditor: MangaEditorElement[], minimumImage: number = 1): string {
  if (mangaEditor.length == 0) {
    return `ต้องมีไฟล์รูปอย่างน้อย ${minimumImage} รูป`;
  }

  const isAudioValid = isAudioNearAudio(mangaEditor);
  if (!isAudioValid) {
    return "ไม่สามารถวางไฟล์เสียงติดกันได้";
  }

  return "";
}

export function createValidateParams(state: ChapterCreateEditSliceInterface) {
  let validateParams: any = {};
  validateParams.story_error_message = validateStory(state.story);
  validateParams.name_error_message = validateName(state.name);
  validateParams.chapter_number_error_message = validateChapterNumber(state.chapter_number);
  validateParams.cover_image_error_message = validateCoverImage(state.cover_image);

  if (state.type == CategoryTypeEnum.NOVEL) {
    validateParams.text_editor_error_message = validateCharacterCount(state.text_editor);
  }
  if (state.type == CategoryTypeEnum.MANGA) {
    validateParams.manga_editor_error_message = validateImageEditor(state.manga_editor);
  }
  return validateParams;
}

export function isValid(validateParams: any) {
  return Object.values(validateParams).every((value) => typeof value === "string" && value.length == 0);
}

export async function uploadFileAndMapNodeByType(node: TextEditorElement | MangaEditorElement) {
  if (node.type == ElementTypeEnum.AUDIO && node.file) {
    const uploadedFile = await FileService.uploadFile(node.file, CollectionEnum.CHAPTER_AUDIO);
    return {
      type: ElementTypeEnum.AUDIO,
      file_id: uploadedFile.id,
      children: (node as TextEditorElement).children,
    };
  }

  if (node.type == ElementTypeEnum.IMAGE && node.file) {
    const uploadedFile = await FileService.uploadFile(node.file, CollectionEnum.STORY_IMAGE);
    return {
      type: ElementTypeEnum.IMAGE,
      file_id: uploadedFile.id,
    };
  }
  return node;
}

export async function createTextForUpload(state: ChapterCreateEditSliceInterface, setPercentBar: Dispatch<SetStateAction<number>>) {
  let nodeCount = 0;
  let textNode: TextEditorElement[] | MangaEditorElement[] = [];
  let editor: TextEditorElement[] | MangaEditorElement[] = [];
  if (state.type == CategoryTypeEnum.NOVEL) {
    editor = state.text_editor;
    nodeCount = state.text_editor.length;
  }

  if (state.type == CategoryTypeEnum.MANGA) {
    editor = state.manga_editor;
    nodeCount = state.manga_editor.length;
  }

  for (let i = 0; i < nodeCount; i++) {
    const percent = Number((((i + 1) / nodeCount) * 100).toFixed(0));
    const mapNode = await uploadFileAndMapNodeByType(editor[i]);
    setPercentBar(percent);
    textNode = [...textNode, mapNode];
  }
  return JSON.stringify(textNode);
}

export async function getCoverImageId(state: ChapterCreateEditSliceInterface): Promise<number> {
  if (state.cover_image instanceof File) {
    const coverImageUploaded = await FileService.uploadFile(state.cover_image as File, CollectionEnum.CHAPTER_COVER_IMAGE);
    return coverImageUploaded.id;
  }
  return state.cover_image!.id;
}
