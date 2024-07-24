import { useState } from "react";

import styled from "styled-components";

import ExpandUpDouble from "@components/iconSvg/ExpandUpDouble";
import { addEventScroll } from "@utils/Hooks";
import { box, color, font } from "@utils/Themes";

export default function GoTopButton() {
  const [isShow, setIsShow] = useState(false);

  addEventScroll(() => {
    if (window.scrollY <= 0) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  });

  return (
    <Box $isShow={isShow} onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}>
      <ImageIcon>
        <ExpandUpDouble />
      </ImageIcon>
      <Text>Top</Text>
    </Box>
  );
}

const Box = styled.div<{ $isShow: boolean }>`
  box-sizing: border-box;
  width: 40px;
  height: fit-content;
  padding-bottom: ${(props) => box(props).space.sm};

  border-radius: ${(props) => box(props).borderRadius.sm};
  border: 1px solid ${(props) => color(props).primary};
  background-color: ${(props) => color(props).shadow};

  display: ${(props) => (props.$isShow ? "block" : "none")};

  position: fixed;
  bottom: 50px;
  right: 50px;

  z-index: ${(props) => box(props).zIndex.fixed};

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: -${(props) => box(props).space.xs};

  font-size: ${(props) => font(props).size.md};
  line-height: ${(props) => font(props).size.md};
  text-align: center;

  display: block;
`;

const ImageIcon = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 40px;

  display: block;

  svg {
    width: 100%;
    height: 100%;
  }
`;
