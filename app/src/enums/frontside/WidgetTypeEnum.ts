export enum WidgetTypeEnum {
  STORY_LIST = "story_list",
  STORY_WINDOW = "story_window",
  STORY_GROUP = "story_group",
  CHAPTER_GROUP = "chapter_group",
  ADVERTISEMENT_SMALL = "advertisement_small",
  ADVERTISEMENT_MEDIUM = "advertisement_medium",
  ADVERTISEMENT_GROUP = "advertisement_group",
}

export type WidgetTypeAdvertisement = WidgetTypeEnum.ADVERTISEMENT_SMALL | WidgetTypeEnum.ADVERTISEMENT_MEDIUM | WidgetTypeEnum.ADVERTISEMENT_GROUP;

export type WidgetTypeStory = WidgetTypeEnum.STORY_LIST | WidgetTypeEnum.STORY_WINDOW | WidgetTypeEnum.STORY_GROUP;
