import React from "react";

import styled from "styled-components";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import BannerTypeStoryWindow from "@components/frontside/tablet/banner/BannerTypeStoryWindow";
import { WidgetInterface } from "@interfaces/frontside/WidgetInterface";
import { box } from "@utils/Themes";

export default React.memo(function WidgetTypeStoryWindow(widget: WidgetInterface) {
  const banners = createSlideBanner(widget);

  return (
    <Box>
      <Container>
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          slidesPerView={1}
          grabCursor={true}
          loop={true}
          speed={350}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {banners}
        </Swiper>
      </Container>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin-top: ${(props) => box(props).space.xxl};

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

  /* This config need for parent element's Swiper*/
  display: flex;
  justify-content: center;
  align-items: center;
`;

function createSlideBanner(widget: WidgetInterface) {
  return widget.banners?.map((banner) => {
    return (
      <SwiperSlide key={banner.id}>
        <BannerTypeStoryWindow {...banner} />
      </SwiperSlide>
    );
  });
}
