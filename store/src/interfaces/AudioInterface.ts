import { CollectionEnum } from "@enums/CollectionEnum";

export interface AudioInterface {
  id: number;
  url: string;
  collection_name: CollectionEnum.CHAPTER_AUDIO;
}
