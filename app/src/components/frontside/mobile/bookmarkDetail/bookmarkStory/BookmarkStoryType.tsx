import { styled } from "styled-components";

import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { box, color, font } from "@utils/Themes";

export default function BookmarkStoryType({ type }: { type: CategoryTypeEnum }) {
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
  margin-top: ${(props) => box(props).space.sm};
  margin-bottom: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StoryType = styled.div<{ type: CategoryTypeEnum }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 60px;
  padding: 2px 0;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => getColorByType(props)};
  background-color: ${(props) => getBackgroundColorByType(props)};

  font-size: ${(props) => font(props).size["2xs"]};
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
