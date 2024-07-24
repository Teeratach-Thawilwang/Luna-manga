import React, { useEffect, useState } from "react";

import styled, { keyframes } from "styled-components";

interface FadeInterface {
  children?: any;
  timeout: number;
  in: boolean;
}

interface BoxInterFace {
  $in: boolean;
  $timeout: number;
  $isFirstTime: boolean;
}

export default React.memo(function CustomFade(props: FadeInterface) {
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (props.in) {
      setIsFirstTime(false);
    }
  }, [props.in]);

  const boxProps: BoxInterFace = {
    $in: props.in,
    $timeout: props.timeout,
    $isFirstTime: isFirstTime,
  };
  return <Box {...boxProps}>{props.children}</Box>;
});

const Box = styled.div<BoxInterFace>`
  position: relative;
  z-index: 100;
  visibility: ${(props) => (props.$in ? "visible" : "hidden")};
  animation: ${(props) => getAnimation(props)} ${(props) => props.$timeout}ms linear;
  transition: visibility ${(props) => props.$timeout}ms linear;
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
  if (props.$in) {
    return FadeIn;
  }

  if (props.$isFirstTime) {
    return null;
  }
  return FadeOut;
}
