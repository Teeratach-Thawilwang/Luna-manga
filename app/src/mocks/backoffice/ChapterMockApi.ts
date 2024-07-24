import { faker } from "@faker-js/faker";

import { FontFamilyEnum } from "@enums/FontFamilyEnum";
import { MarkTextAlign } from "@enums/MarkFormat";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { ChapterStatusEnum, StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { AudioInterface } from "@interfaces/backoffice/AudioInterface";
import {
  ChapterListInterface,
  CreateChapterParams,
  CreateChapterResponse,
  DeleteChapterParams,
  DeleteChapterResponse,
  GetChapterListParams,
  GetChapterListResponse,
  GetChapterParams,
  GetChapterResponse,
  UpdateChapterParams,
  UpdateChapterResponse,
} from "@interfaces/backoffice/ChapterInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";
import { randomArray, randomEnum } from "@utils/Helpers";
import { returnPromise } from "@utils/MockService";

type ReturnType<T> = Promise<T>;

class ChapterMockApi {
  public index(params: GetChapterListParams, shouldSuccess: boolean = true): ReturnType<GetChapterListResponse> {
    return new Promise((resolve, reject) => {
      faker.seed(10);
      const categoriesReponse: GetChapterListResponse = indexResponse(params);
      returnPromise<GetChapterListResponse>(categoriesReponse, shouldSuccess, resolve, reject);
    });
  }

  public create(params: CreateChapterParams, shouldSuccess: boolean = true): ReturnType<CreateChapterResponse> {
    return new Promise((resolve, reject) => {
      const response: CreateChapterResponse = createResponse(params);
      returnPromise<CreateChapterResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public show(params: GetChapterParams, shouldSuccess: boolean = true): ReturnType<GetChapterResponse> {
    return new Promise((resolve, reject) => {
      const response: GetChapterResponse = showUpdateResponse(params);
      returnPromise<GetChapterResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public update(params: UpdateChapterParams, shouldSuccess: boolean = true): ReturnType<UpdateChapterResponse> {
    return new Promise((resolve, reject) => {
      const response: UpdateChapterResponse = showUpdateResponse(params);
      returnPromise<UpdateChapterResponse>(response, shouldSuccess, resolve, reject);
    });
  }

  public delete(_params: DeleteChapterParams, shouldSuccess: boolean = true): ReturnType<DeleteChapterResponse> {
    return new Promise((resolve, reject) => {
      const response: DeleteChapterResponse = {};
      returnPromise<DeleteChapterResponse>(response, shouldSuccess, resolve, reject);
    });
  }
}

function indexResponse(params: GetChapterListParams): GetChapterListResponse {
  const page = params.page;
  const data: ChapterListInterface[] = [];

  const staterIndex = 1000 - (page - 1) * params.per_page;
  const endIndex = 1000 - page * params.per_page;

  for (let i = staterIndex; i > endIndex; i--) {
    const chapter = createChapterIndex(i, params.type);
    data.push(chapter);
  }

  return {
    data: data,
    current: page,
    next: page + 1,
    previous: page - 1 > 0 ? page - 1 : null,
    last: null,
    total: null,
  };
}

function createChapterIndex(i: number, type: CategoryTypeEnum): ChapterListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    story_id: faker.number.int({ min: 1, max: 1000 }),
    name: name,
    chapter_number: i,
    score: faker.number.int({ min: 1, max: 50 }) / 10,
    view_count: faker.number.int({ min: 1, max: 1000 }),
    type: type,
    status: randomEnum<ChapterStatusEnum>(ChapterStatusEnum),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function createResponse(params: CreateChapterParams): CreateChapterResponse {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    story: createStory(params.story_id, params.type),
    name: params.name,
    chapter_number: params.chapter_number,
    type: params.type,
    status: params.status,
    text: params.text,
    cover_image: createImages([params.cover_image_id]),
    images: createImages([100, 101, 102]),
    audio: createAudio([100, 101, 102]),
    score: faker.number.int({ min: 10, max: 100 }),
    view_count: faker.number.int({ min: 0, max: 1000 }),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
}

function showUpdateResponse(params: GetChapterParams | UpdateChapterParams): GetChapterResponse | UpdateChapterResponse {
  const type = randomArray([CategoryTypeEnum.MANGA, CategoryTypeEnum.NOVEL]);
  return {
    id: params.id,
    story: createStory(faker.number.int({ min: 1, max: 1000 }), type),
    name: faker.word.words({ count: 5 }),
    chapter_number: faker.number.float({ min: 1, max: 100, precision: 0.01 }),
    type: type,
    status: randomArray([ChapterStatusEnum.ACTIVE, ChapterStatusEnum.INACTIVE]),
    text: JSON.stringify(createEditorNode(type)),
    cover_image: createImages([95]),
    images: createImages([100, 101, 102]),
    audio: createAudio([110, 111, 112]),
    score: faker.number.int({ min: 10, max: 100 }),
    view_count: faker.number.int({ min: 0, max: 1000 }),
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
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

function createAudio(ids: number[]): AudioInterface[] {
  const data: AudioInterface[] = [];
  for (let i = 0; i < ids.length; i++) {
    data.push({
      id: ids[i],
      url: "/example_audio.mp3",
      collection_name: CollectionEnum.CHAPTER_AUDIO,
    });
  }

  return data;
}

function createStory(i: number, type: CategoryTypeEnum): StoryListInterface {
  let name = faker.word.words({ count: { min: 1, max: 10 } });
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    id: i,
    name: name,
    type: type,
    status: randomEnum<StoryStatusEnum>(StoryStatusEnum),
    author_name: faker.person.fullName(),
    total_chapter: faker.number.int({ min: 1, max: 1000 }),
    rating_score: faker.number.int({ min: 1, max: 50 }) / 10,
    created_at: String(faker.date.past()),
    updated_at: String(faker.date.past()),
  };
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
        text: "simple text line 1",
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
        text: "simple text line 2",
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
        text: "simple text line 3",
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
];

export default new ChapterMockApi();
