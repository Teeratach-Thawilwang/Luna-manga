import { styled } from "styled-components";

import SearchIcon from "@components/iconSvg/SearchIcon";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import { color, font } from "@utils/Themes";

interface SearchButtonInterface {
  isActive: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function SearchButton({ isActive, setActive }: SearchButtonInterface) {
  function onClick() {
    if (isActive) {
      setActive(NavigationModelEnum.NONE);
    } else {
      setActive(NavigationModelEnum.SEARCH);
    }
  }
  return (
    <Box $isActive={isActive} onClick={onClick}>
      <SearchIcon />
      <Text $isActive={isActive}>ค้นหา</Text>
    </Box>
  );
}

const Box = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px 0;

  cursor: pointer;

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};

    transform: scale(1.35);

    path,
    circle {
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
    }
  }
`;

const Text = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
  font-size: ${(props) => font(props).size.xs};
`;
