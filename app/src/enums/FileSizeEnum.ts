export enum FileSizeEnum {
  SIZE_1_MB = 1048576,
}

export enum LimitFileSizeEnum {
  COVER_IMAGE_SIZE = FileSizeEnum.SIZE_1_MB * 2,
  STORY_IMAGE_SIZE = FileSizeEnum.SIZE_1_MB * 2,
  CATEGORY_IMAGE_SIZE = FileSizeEnum.SIZE_1_MB * 2,
  CHAPTER_AUDIO_SIZE = FileSizeEnum.SIZE_1_MB * 2,
  BANNER_IMAGE_SIZE = FileSizeEnum.SIZE_1_MB * 2,
}
