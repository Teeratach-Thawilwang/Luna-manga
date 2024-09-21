import { rgba } from "polished";

import React from "react";

import styled from "styled-components";

import FadeInFadeOut from "@components/mobile/FadeInFadeOut";
import { color } from "@utils/Themes";

interface CenterModalInterface {
  isShow: boolean;
  setShow: (value: boolean) => void;
  children: JSX.Element;
  delay?: number;
}

export default React.memo(function CenterModal({ isShow, setShow, children, delay = 100 }: CenterModalInterface) {
  return (
    <FadeInFadeOut isShow={isShow} delay={delay}>
      <Plane onClick={() => setShow(!isShow)} />
      <Box>{children}</Box>
    </FadeInFadeOut>
  );
});

const Plane = styled.div`
  background-color: ${(props) => rgba(color(props).surface, 0.6)};
  backdrop-filter: blur(2px);
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Box = styled.div`
  width: fit-content;
  height: fit-content;
  border: 0;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
