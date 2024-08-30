import { styled } from "styled-components";

import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { box, color, font } from "@utils/Themes";

export default function StorySeachItemType({ type }: { type: CategoryTypeEnum }) {
  return (
    <Box>
      <StoryType type={type}>{type.toUpperCase()}</StoryType>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  margin-right: ${(props) => box(props).space.sm};

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StoryType = styled.div<{ type: CategoryTypeEnum }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 80px;
  padding: ${(props) => box(props).space.xs} 0;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => getColorByType(props)};
  background-color: ${(props) => getBackgroundColorByType(props)};

  font-size: ${(props) => font(props).size.xs};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;
`;

function getBackgroundColorByType(props: { type: CategoryTypeEnum }) {
  if (props.type == CategoryTypeEnum.MANGA) {
    return color(props).primary;
  }
  return color(props).secondary;
}

function getColorByType(props: { type: CategoryTypeEnum }) {
  if (props.type == CategoryTypeEnum.MANGA) {
    return color(props).onPrimary;
  }
  return color(props).onSecondary;
}
