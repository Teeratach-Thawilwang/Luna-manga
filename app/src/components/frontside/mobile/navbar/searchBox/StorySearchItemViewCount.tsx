import { styled } from "styled-components";

import StarIcon from "@components/iconSvg/StarIcon";
import ViewCountIcon from "@components/iconSvg/ViewCountIcon";
import { transformNumber } from "@utils/Helpers";
import { box, color, font } from "@utils/Themes";

export default function StorySearchItemViewCount({ ratingScore, viewCount }: { ratingScore: number; viewCount: number }) {
  return (
    <Box>
      <Wrap>
        <ScoreIconBox>
          <StarIcon />
        </ScoreIconBox>
        <Text>{transformNumber(ratingScore)}</Text>
      </Wrap>
      <Wrap>
        <ViewCountIconBox>
          <ViewCountIcon />
        </ViewCountIconBox>
        <Text>{transformNumber(viewCount)}</Text>
      </Wrap>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin-bottom: 0;

  display: flex;
  gap: 0 ${(props) => box(props).space.md};
`;

const Wrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding-top: 1px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.xs};
  line-height: ${(props) => font(props).size.xs};
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin-right: ${(props) => box(props).space.xs};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.sm};
    height: ${(props) => font(props).size.sm};
    line-height: 1.5;

    transform: scale(1.1);
  }
`;

const ScoreIconBox = styled(IconBox)`
  path {
    fill: ${(props) => color(props).primary};
  }
`;

const ViewCountIconBox = styled(IconBox)`
  margin-top: 1px;

  path,
  circle {
    stroke: ${(props) => color(props).primary};
    stroke-width: 2px;
  }
`;
