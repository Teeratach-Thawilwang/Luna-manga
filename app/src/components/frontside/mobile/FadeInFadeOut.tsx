import React, { useEffect, useState } from "react";

import styled, { keyframes } from "styled-components";

import { box } from "@utils/Themes";

interface FadeInterface {
  isShow: boolean;
  delay: number;
  children?: any;
}

interface BoxInterFace {
  $isShow: boolean;
  $delay: number;
  $isFirstTime: boolean;
}

export default React.memo(function FadeInFadeOut({ isShow, delay, children }: FadeInterface) {
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (isShow) {
      setIsFirstTime(false);
    }
  }, [isShow]);

  return (
    <Box $isShow={isShow} $delay={delay} $isFirstTime={isFirstTime}>
      {children}
    </Box>
  );
});

const Box = styled.div<BoxInterFace>`
  position: relative;
  z-index: ${(props) => box(props).zIndex.modalBackdrop};
  visibility: ${(props) => (props.$isShow ? "visible" : "hidden")};
  animation: ${(props) => getAnimation(props)} ${(props) => props.$delay}ms linear;
  transition: visibility ${(props) => props.$delay}ms linear;
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`;

const FadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

function getAnimation(props: BoxInterFace) {
  if (props.$isShow) {
    return FadeIn;
  }

  if (props.$isFirstTime) {
    return null;
  }
  return FadeOut;
}
