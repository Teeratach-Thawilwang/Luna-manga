import { CollectionEnum } from "@enums/frontside/CollectionEnum";

export interface AudioInterface {
  id: number;
  url: string;
  collection_name: CollectionEnum.CHAPTER_AUDIO;
}
