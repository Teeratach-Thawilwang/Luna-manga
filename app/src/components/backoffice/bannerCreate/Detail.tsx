import { useParams } from "react-router-dom";

import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/bannerCreate/FooterControl";
import InputChapter from "@components/backoffice/bannerForm/InputChapter";
import InputImageTypeAdvertisementGroup from "@components/backoffice/bannerForm/InputImageTypeAdvertisementGroup";
import InputImageTypeAdvertisementMedium from "@components/backoffice/bannerForm/InputImageTypeAdvertisementMedium";
import InputImageTypeAdvertisementSmall from "@components/backoffice/bannerForm/InputImageTypeAdvertisementSmall";
import InputImageTypeStoryWindow from "@components/backoffice/bannerForm/InputImageTypeStoryWindow";
import InputLink from "@components/backoffice/bannerForm/InputLink";
import InputName from "@components/backoffice/bannerForm/InputName";
import InputStatus from "@components/backoffice/bannerForm/InputStatus";
import InputStory from "@components/backoffice/bannerForm/InputStory";
import InputTitle from "@components/backoffice/bannerForm/InputTitle";
import InputType from "@components/backoffice/bannerForm/InputType";
import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { BannerInterface } from "@interfaces/backoffice/BannerInterface";
import { navigateTo } from "@utils/Helpers";

export default function Detail() {
  const { type } = useParams();
  const bannerType = getBannerType(type);
  const elememnt = createElementByType(bannerType);

  return (
    <Box>
      <Header headerTitle="Banner Create" />
      <Content>
        <InputName />
        <InputTitle />
        <InputType initial={type as BannerTypeEnum} />
        <InputLink />
        <InputStatus />
        {elememnt}
      </Content>
      <Space />
      <FooterControl />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;

  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

function createElementByType(type: BannerTypeEnum, initial?: BannerInterface) {
  switch (type) {
    case BannerTypeEnum.STORY:
      return <InputStory initial={initial ? initial.story! : undefined} />;
    case BannerTypeEnum.CHAPTER:
      return <InputChapter initial={initial ? initial.chapter! : undefined} />;
    case BannerTypeEnum.STORY_WINDOW:
      return <InputImageTypeStoryWindow initial={initial ? initial.images! : undefined} />;
    case BannerTypeEnum.ADVERTISEMENT_SMALL:
      return <InputImageTypeAdvertisementSmall initial={initial ? initial.images! : undefined} />;
    case BannerTypeEnum.ADVERTISEMENT_MEDIUM:
      return <InputImageTypeAdvertisementMedium initial={initial ? initial.images! : undefined} />;
    case BannerTypeEnum.ADVERTISEMENT_GROUP:
      return <InputImageTypeAdvertisementGroup initial={initial ? initial.images! : undefined} />;
    default:
      return null;
  }
}

function getBannerType(type: string | undefined): BannerTypeEnum {
  if (type == undefined) {
    navigateTo(GroupSettingUrlEnum.BANNER);
  }

  const isTypeValid = Object.values(BannerTypeEnum).some((bannerType) => bannerType == type);
  if (!isTypeValid) {
    navigateTo(GroupSettingUrlEnum.BANNER);
  }

  return type as BannerTypeEnum;
}
