import React from "react";

import styled from "styled-components";

import BannerTypeAdvertisementGroup from "@components/tablet/banner/BannerTypeAdvertisementGroup";
import { BannerInterface } from "@interfaces/BannerInterface";
import { WidgetInterface } from "@interfaces/WidgetInterface";

export default React.memo(function WidgetTypeAdvertisementGroup(widget: WidgetInterface) {
  const images = widget.banners?.map((banner: BannerInterface) => {
    return <BannerTypeAdvertisementGroup {...banner} key={banner.id} />;
  });

  return <Box>{images}</Box>;
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: fit-content;
`;
