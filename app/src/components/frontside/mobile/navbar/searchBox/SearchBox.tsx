import { darken } from "polished";

import { useEffect, useState } from "react";

import styled from "styled-components";

import SearchIcon from "@components/iconSvg/SearchIcon";
import XIcon from "@components/iconSvg/XIcon";
import StorySearchService from "@services/frontside/StorySearchService";
import { useDebounce } from "@utils/Hooks";
import { box, color, font } from "@utils/Themes";

export default function SearchBox() {
  const [isFocus, setIsFocus] = useState(false);
  const q = StorySearchService.getSearchQuery();
  const debouncedSearch = useDebounce(q, 800);

  useEffect(() => {
    if (debouncedSearch != "") {
      StorySearchService.loadStorySearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isLoading = event.target.value != "";
    StorySearchService.update({ q: event.target.value, is_loading: isLoading });
  }

  function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      (event.target as HTMLInputElement).blur();
    }
  }

  return (
    <Box>
      <SearchIconBox $isExpand={isFocus}>
        <SearchIcon />
      </SearchIconBox>
      <SearchInput
        $isExpand={q != ""}
        $isShow={q != ""}
        name="search"
        type="text"
        placeholder="ค้นหา..."
        autoComplete="off" // disable suggestion
        value={q}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onKeyUp={onEnter}
      />
      <ClearIconBox $isExpand={isFocus} $isShow={q != ""} onClick={() => StorySearchService.clearState()}>
        <XIcon />
      </ClearIconBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin: auto ${(props) => box(props).space.lg} auto ${(props) => box(props).space.none};
  padding: ${(props) => box(props).space.none};

  display: flex;
  justify-content: start;
  align-items: center;

  position: relative;
`;

const IconBox = styled.div<{ $isExpand: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  padding: 0 ${(props) => box(props).space.md};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};
  }
`;

const SearchIconBox = styled(IconBox)`
  position: absolute;
  left: 0;

  path,
  circle {
    stroke: ${(props) => (props.$isExpand ? color(props).onSurface : darken(1 - font(props).opacity.hover, color(props).onSurface))};
  }
`;

const SearchInput = styled.input<{ $isExpand: boolean; $isShow: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => `calc(${font(props).lineHeight.sm} + 2*${box(props).space.md})`};
  /* padding: ${(props) => box(props).space.md} ${(props) => `calc(2*${box(props).space.md} + ${font(props).size.lg})`}; */
  padding: 0 ${(props) => `calc(2*${box(props).space.md} + ${font(props).size.lg})`};

  border: 0px;
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  box-shadow: inset 0px 0px 0px 1px ${(props) => color(props).outline};

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainerHigh};
  outline: none;

  font-size: ${(props) => font(props).size.md};
  line-height: ${(props) => font(props).size.xl};
  transition: width 0.5s;

  &::placeholder {
    font-size: ${(props) => font(props).size.md};
    color: ${(props) => darken(1 - font(props).opacity.hover, color(props).onSurface)};
  }

  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${(props) => color(props).primary};
    width: 100%;
  }
`;

const ClearIconBox = styled(IconBox)<{ $isShow: boolean }>`
  display: ${(props) => (props.$isShow ? "display" : "none")};

  position: absolute;
  right: 0;

  path {
    stroke: ${(props) => color(props).onSurface};
    fill: ${(props) => color(props).onSurface};
  }

  &:hover {
    cursor: pointer;
  }
`;
