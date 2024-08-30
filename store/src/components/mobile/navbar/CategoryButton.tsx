import { Link } from "react-router-dom";

import { styled } from "styled-components";

import CategoryIcon from "@components/iconSvg/CategoryIcon";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import { color, font } from "@utils/Themes";

interface CategoryButtonInterface {
  isActive: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function CategoryButton({ isActive, setActive }: CategoryButtonInterface) {
  function onClick() {
    if (isActive) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    setActive(NavigationModelEnum.NONE);
  }
  return (
    <Box to="/category" $isActive={isActive} onClick={onClick}>
      <CategoryIcon />
      <Text $isActive={isActive}>หมวดหมู่</Text>
    </Box>
  );
}

const Box = styled(Link)<{ $isActive: boolean }>`
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

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};
    transform: scale(1.2);

    rect {
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
