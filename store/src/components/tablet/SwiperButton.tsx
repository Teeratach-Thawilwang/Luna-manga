import React, { RefObject } from "react";

import styled from "styled-components";

import { SwiperClass } from "swiper/react";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import ExpandRightIcon from "@components/iconSvg/ExpandRightIcon";
import { box, color } from "@utils/Themes";

interface SwiperButton {
  swiperRef: RefObject<SwiperClass | null>;
  direction: "Previous" | "Next";
}

export default React.memo(function SwiperButton(props: SwiperButton) {
  let element;
  if (props.direction == "Previous") {
    element = (
      <Box $left="0px" $right="auto" onClick={() => props.swiperRef?.current?.slidePrev()}>
        <ExpandLeftIcon />
      </Box>
    );
  }

  if (props.direction == "Next") {
    element = (
      <Box $left="auto" $right="0px" onClick={() => props.swiperRef?.current?.slideNext()}>
        <ExpandRightIcon />
      </Box>
    );
  }

  return <>{element}</>;
});

const Box = styled.div<{ $left: string; $right: string }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 35px;
  height: 60px;

  background-color: ${(props) => color(props).surface};

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 45%;
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  transform: translateY(-50%);

  opacity: 0.6;
  z-index: ${(props) => box(props).zIndex.fixed};

  cursor: pointer;

  svg {
    path {
      stroke: ${(props) => color(props).primary};
    }
  }

  &:hover {
    opacity: 1;
  }
`;
