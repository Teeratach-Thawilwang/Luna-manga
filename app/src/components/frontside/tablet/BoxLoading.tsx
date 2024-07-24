import styled from "styled-components";

import Loading from "@components/frontside/tablet/Loading";

interface BoxLoadingInterface {
  left?: string;
  top?: string;
  xTranslate?: string;
  yTranslate?: string;
  zIndex?: string;
  opacity?: string;
}

interface StyledInterface {
  left: string;
  top: string;
  xTranslate: string;
  yTranslate: string;
  zIndex: string;
  opacity: string;
}

export default function BoxLoading({
  left = "50%",
  top = "50%",
  xTranslate = "-50%",
  yTranslate = "-50%",
  zIndex = "99",
  opacity = "1",
}: BoxLoadingInterface) {
  const style = {
    left: left,
    top: top,
    xTranslate: xTranslate,
    yTranslate: yTranslate,
    zIndex: zIndex,
    opacity: opacity,
  };
  return (
    <Box style={style}>
      <Loading />
    </Box>
  );
}

const Box = styled.div<{ style: StyledInterface }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  position: absolute;
  left: ${(props) => props.style.left};
  top: ${(props) => props.style.top};
  transform: ${(props) => "translate(" + props.style.xTranslate + ", " + props.style.yTranslate + ")"};
  z-index: ${(props) => props.style.zIndex};
  opacity: ${(props) => props.style.opacity};
`;
