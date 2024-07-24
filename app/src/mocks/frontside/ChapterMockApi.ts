import { faker } from "@faker-js/faker";

import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { MarkTextAlign } from "@enums/MarkFormat";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { AudioInterface } from "@interfaces/frontside/AudioInterface";
import {
  ChapterListInterface,
  ChapterReactionParams,
  ChapterReactionResponse,
  ChapterShowParams,
  ChapterShowResponse,
} from "@interfaces/frontside/ChapterInterface";
import { ImageInterface } from "@interfaces/frontside/ImageInterface";
import { randomArray } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class ChapterMockApi {
  public show(params: ChapterShowParams, shouldSuccess: boolean = true): ReturnType<ChapterShowResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const response: ChapterShowResponse = showResponse(params);
      returnPromise<ChapterShowResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public reaction(params: ChapterReactionParams, shouldSuccess: boolean = true): ReturnType<ChapterReactionResponse> {
    return new Promise((resolve, reject) => {
      const response: ChapterReactionResponse = reactionResponse(params);
      returnPromise<ChapterReactionResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function showResponse(params: ChapterShowParams): ChapterShowResponse {
  const type = randomArray([CategoryTypeEnum.MANGA, CategoryTypeEnum.NOVEL]);
  let name = params.slug.replaceAll("-", " ");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: faker.number.int({ min: 10, max: 100 }),
    story_name: name,
    type: type,
    text: JSON.stringify(createEditorNode(type)),
    images: createImages([100, 101, 102]),
    audio: createAudio([110, 111, 112]),
    reaction: reactionResponse(),
    chapter_list: createChapterList(1000),
  };
}

function reactionResponse(params?: ChapterReactionParams): ChapterReactionResponse {
  let isLike = randomArray([true, false]);
  let isDislike = randomArray([true, false]);
  if (params) {
    isLike = params?.like ?? params.like == 1 ? true : false;
    isDislike = params?.dislike ?? params.dislike == 1 ? true : false;
  }
  return {
    like: faker.number.int({ min: 10, max: 100 }),
    dislike: faker.number.int({ min: 10, max: 100 }),
    is_liked: isLike,
    is_disliked: isDislike,
  };
}

function createImages(ids: number[]): ImageInterface[] {
  const data: ImageInterface[] = [];
  for (let i = 0; i < ids.length; i++) {
    const image = faker.image.url({ width: 400, height: 620 });
    data.push({
      id: ids[i],
      original: image,
      desktop: image,
      mobile: image,
      thumbnail: image,
      collection_name: CollectionEnum.STORY_IMAGE,
    });
  }

  return data;
}

function createChapterList(total: number): ChapterListInterface[] {
  const data = [];
  for (let i = total; i >= 1; i--) {
    data.push({
      id: i,
      chapter_number: i,
      name: `ตอนที่ ${i} ${faker.word.words({ count: { min: 2, max: 10 } })}`,
    });
  }
  return data;
}

function createAudio(ids: number[]): AudioInterface[] {
  const data: AudioInterface[] = [];
  for (let i = 0; i < ids.length; i++) {
    data.push({
      id: ids[i],
      url: randomArray(["/example_audio.mp3", "/ti9_run_away.mp3"]),
      collection_name: CollectionEnum.CHAPTER_AUDIO,
    });
  }

  return data;
}

function createEditorNode(type: CategoryTypeEnum): TextEditorElement[] | MangaEditorElement[] {
  if (type == CategoryTypeEnum.MANGA) {
    return mangaEditorElementMock;
  }

  return textEditorElementMock;
}

const mangaEditorElementMock: MangaEditorElement[] = [
  {
    type: ElementTypeEnum.IMAGE,
    file_id: 100,
  },
  {
    type: ElementTypeEnum.AUDIO,
    file_id: 110,
  },
  {
    type: ElementTypeEnum.IMAGE,
    file_id: 101,
  },
  {
    type: ElementTypeEnum.AUDIO,
    file_id: 111,
  },
  {
    type: ElementTypeEnum.IMAGE,
    file_id: 102,
  },
  {
    type: ElementTypeEnum.AUDIO,
    file_id: 112,
  },
];

const textEditorElementMock: TextEditorElement[] = [
  {
    type: ElementTypeEnum.TEXT,
    fontSize: 18,
    fontFamily: FontFamilyEnum.MALI,
    align: MarkTextAlign.ALIGN_LEFT,
    children: [
      {
        text: "   simple ",
      },
      {
        text: "text",
        bold: true,
      },
      {
        text: " line 1",
      },
    ],
  },
  {
    type: ElementTypeEnum.AUDIO,
    children: [
      {
        text: "",
      },
    ],
    file_id: 110,
  },
  {
    type: ElementTypeEnum.TEXT,
    fontSize: 20,
    fontFamily: FontFamilyEnum.MALI,
    align: MarkTextAlign.ALIGN_CENTER,
    children: [
      {
        text: "simple ",
      },
      {
        text: "text",
        italic: true,
      },
      {
        text: " line 2",
      },
    ],
  },
  {
    type: ElementTypeEnum.AUDIO,
    children: [
      {
        text: "",
      },
    ],
    file_id: 111,
  },
  {
    type: ElementTypeEnum.TEXT,
    fontSize: 20,
    fontFamily: FontFamilyEnum.MALI,
    align: MarkTextAlign.ALIGN_RIGHT,
    children: [
      {
        text: "simple ",
      },
      {
        text: "text",
        underline: true,
      },
      {
        text: " line 3",
      },
    ],
  },
  {
    type: ElementTypeEnum.AUDIO,
    children: [
      {
        text: "",
      },
    ],
    file_id: 112,
  },
  {
    type: ElementTypeEnum.TEXT,
    fontSize: 20,
    fontFamily: FontFamilyEnum.MALI,
    align: MarkTextAlign.ALIGN_JUSTIFY,
    children: [
      {
        text: "simple ",
      },
      {
        text: "text",
        bold: true,
        italic: true,
        underline: true,
      },
      {
        text: " line 4",
      },
    ],
  },
];

export default new ChapterMockApi();
