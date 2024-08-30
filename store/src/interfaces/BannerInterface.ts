import { BannerTypeEnum } from "@enums/BannerTypeEnum";
import { ImageInterface } from "@interfaces/ImageInterface";

export interface BannerInterface {
  id: number;
  name: string;
  title: string;
  type: BannerTypeEnum;
  link: string;
  images: ImageInterface[];
}

export interface BannerIndexResponseInterface {
  data: BannerInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}
