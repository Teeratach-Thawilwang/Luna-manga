import React from "react";

import styled from "styled-components";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import BannerTypeStory from "@components/frontside/mobile/banner/BannerTypeStory";
import { WidgetInterface } from "@interfaces/frontside/WidgetInterface";
import { box, color, font } from "@utils/Themes";

export default React.memo(function WidgetTypeStoryList(widget: WidgetInterface) {
  const storyBanners = createSlideBanner(widget);

  return (
    <Box>
      <Header>{widget.title}</Header>
      <Container>
        <Swiper
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          slidesPerView={3.2}
          slidesPerGroupSkip={3.2}
          grabCursor={true}
          loop={true}
          speed={150}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {storyBanners}
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
`;

const Header = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: fit-content;
  padding: 5px 0 5px 3px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin-top: ${(props) => box(props).space.sm};

  /* This config need for parent element's Swiper*/
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
`;

const CustomSlide = styled(SwiperSlide)`
  /* border: 1px solid red; */
`;

function createSlideBanner(widget: WidgetInterface) {
  return widget.banners?.map((banner) => {
    return (
      <CustomSlide key={banner.id}>
        <BannerTypeStory {...banner} />
      </CustomSlide>
    );
  });
}
