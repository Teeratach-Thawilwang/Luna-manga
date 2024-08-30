import { useRef } from "react";
import React from "react";

import styled from "styled-components";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import SwiperButton from "@components/tablet/SwiperButton";
import BannerTypeStory from "@components/tablet/banner/BannerTypeStory";
import { WidgetInterface } from "@interfaces/WidgetInterface";
import { box, color, font } from "@utils/Themes";

export default React.memo(function WidgetTypeStoryList(widget: WidgetInterface) {
  const storyBanners = createSlideBanner(widget);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <Box>
      <Header>{widget.title}</Header>
      <Container>
        <SwiperButton swiperRef={swiperRef} direction="Previous" />
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={5}
          slidesPerGroupSkip={5}
          grabCursor={true}
          loop={true}
          speed={150}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        >
          {storyBanners}
        </Swiper>
        <SwiperButton swiperRef={swiperRef} direction="Next" />
      </Container>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  margin-top: ${(props) => box(props).space.xxl};
`;

const Header = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: fit-content;
  padding: 5px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.xl};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  margin-top: ${(props) => box(props).space.sm};

  /* This config need for parent element's Swiper*/
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

function createSlideBanner(widget: WidgetInterface) {
  return widget.banners?.map((banner) => {
    return (
      <SwiperSlide key={banner.id}>
        <BannerTypeStory {...banner} />
      </SwiperSlide>
    );
  });
}
