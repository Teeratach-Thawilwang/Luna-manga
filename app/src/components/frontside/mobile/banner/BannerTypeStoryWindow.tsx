import { Link } from "react-router-dom";

import styled from "styled-components";

import ImageAdvertisement from "@components/frontside/mobile/ImageAdvertisement";
import { CollectionEnum } from "@enums/frontside/CollectionEnum";
import { BannerInterface } from "@interfaces/frontside/BannerInterface";

export default function BannerTypeStoryWindow(banner: BannerInterface) {
  const imageWindow1 = banner.images.filter((image) => image.collection_name == CollectionEnum.BANNER_STORY_WINDOW_1)[0];
  const imageWindow2 = banner.images.filter((image) => image.collection_name == CollectionEnum.BANNER_STORY_WINDOW_2)[0];
  const imageWindow3 = banner.images.filter((image) => image.collection_name == CollectionEnum.BANNER_STORY_WINDOW_3)[0];

  return (
    <Box to={banner.link.replace("https://", "").replace("http://", "")}>
      <Left>
        <ImageAdvertisement src={imageWindow1.mobile} aspectRatio={1} borderRadius="10px" />
      </Left>
      <Right>
        <ImageAdvertisement src={imageWindow2.mobile} aspectRatio={490 / 235} borderRadius="10px" />
        <ImageAdvertisement src={imageWindow3.mobile} aspectRatio={490 / 235} borderRadius="10px" />
      </Right>
    </Box>
  );
}

const Box = styled(Link)`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 100%;
  text-decoration: none;

  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Left = styled.div`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 50%;
  height: 100%;

  cursor: pointer;
`;

const Right = styled.div`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  gap: 10px;

  cursor: pointer;
`;
