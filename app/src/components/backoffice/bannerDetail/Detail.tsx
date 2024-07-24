import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/bannerDetail/FooterControl";
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
import { BannerInterface } from "@interfaces/backoffice/BannerInterface";
import BannerService from "@services/backoffice/BannerService";

export default function Detail() {
  const banner = BannerService.getBanner();
  const elememnt = banner ? createElementByType(banner.type, banner) : null;

  if (banner == null) {
    return (
      <Box>
        <Header headerTitle="Banner Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Banner Detail" />
      <Content>
        <InputName initial={banner.name} />
        <InputTitle initial={banner.title} />
        <InputType initial={banner.type} />
        <InputLink initial={banner.link} />
        <InputStatus initial={banner.status} />
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

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  flex-grow: 1;
  /* min-height: calc(100vh - 60px - 150px); */

  display: flex;
  justify-content: center;
  align-items: center;
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
