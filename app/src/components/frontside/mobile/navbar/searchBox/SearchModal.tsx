import { styled } from "styled-components";

import SearchBox from "@components/frontside/mobile/navbar/searchBox/SearchBox";
import SearchItems from "@components/frontside/mobile/navbar/searchBox/SearchItems";
import { box, color } from "@utils/Themes";

export default function SearchModal({ isShow }: { isShow: boolean }) {
  return (
    <Box $isShow={isShow}>
      <SearchBox />
      <SearchItems />
    </Box>
  );
}

const Box = styled.div<{ $isShow: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: calc(100dvh - 60px);
  padding: ${(props) => box(props).space.md} ${(props) => box(props).space.sm};

  background-color: ${(props) => color(props).surface};

  display: ${(props) => (props.$isShow ? "block" : "none")};

  overflow-y: scroll;
  overflow-x: hidden;

  position: fixed;
  top: 0;

  z-index: ${(props) => box(props).zIndex.modal};

  &::-webkit-scrollbar {
    display: none;
  }
`;
