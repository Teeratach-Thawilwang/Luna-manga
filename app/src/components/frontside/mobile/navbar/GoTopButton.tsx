import { useState } from "react";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { addEventScroll, useDebounce } from "@utils/Hooks";
import { box, color } from "@utils/Themes";

export default function GoTopButton({ scroll }: { scroll: "Up" | "Down" }) {
  const [isShow, setIsShow] = useState(false);
  const isScrollUp = useDebounce(scroll == "Up", 300);

  addEventScroll(() => {
    if (window.scrollY <= 0) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  });

  return (
    <Box $isShow={isScrollUp && isShow} onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}>
      <ImageIcon>
        <ExpandLeftIcon />
      </ImageIcon>
    </Box>
  );
}

const Box = styled.div<{ $isShow: boolean }>`
  box-sizing: border-box;
  width: 35px;
  height: 40px;
  padding: 0 ${(props) => box(props).space.xs};

  border-radius: ${(props) => box(props).borderRadius.sm};
  border: 1px solid ${(props) => color(props).primary};
  background-color: ${(props) => color(props).surfaceContainerLow};

  display: ${(props) => (props.$isShow ? "block" : "none")};

  position: fixed;
  bottom: 80px;
  right: 20px;

  z-index: ${(props) => box(props).zIndex.fixed};

  &:hover {
    cursor: pointer;
  }
`;

const ImageIcon = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
    transform: rotateZ(90deg);

    path {
      stroke: ${(props) => color(props).primary};
      stroke-width: 4px;
    }
  }
`;
