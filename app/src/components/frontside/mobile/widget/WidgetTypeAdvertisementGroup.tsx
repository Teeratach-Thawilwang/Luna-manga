import React from "react";

import styled from "styled-components";

import BannerTypeAdvertisementGroup from "@components/frontside/mobile/banner/BannerTypeAdvertisementGroup";
import { BannerInterface } from "@interfaces/frontside/BannerInterface";
import { WidgetInterface } from "@interfaces/frontside/WidgetInterface";

export default React.memo(function WidgetTypeAdvertisementGroup(widget: WidgetInterface) {
  const images = widget.banners?.map((banner: BannerInterface) => {
    return <BannerTypeAdvertisementGroup {...banner} key={banner.id} />;
  });

  return (
    <Box>
      <Container>{images}</Container>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: fit-content;
`;
