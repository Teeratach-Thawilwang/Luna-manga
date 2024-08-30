import React from "react";

import styled from "styled-components";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import BannerTypeAdvertisementMedium from "@components/tablet/banner/BannerTypeAdvertisementMedium";
import { WidgetInterface } from "@interfaces/WidgetInterface";
import { box } from "@utils/Themes";

export default React.memo(function WidgetTypeAdvertisementMedium(widget: WidgetInterface) {
  const banners = createSlideBanner(widget);

  return (
    <Box>
      <Container>
        <Swiper
          autoplay={{
            delay: 1200,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1.00001}
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
  max-width: 720px;
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
        <BannerTypeAdvertisementMedium {...banner} />
      </SwiperSlide>
    );
  });
}
