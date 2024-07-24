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
        <Text> {transformNumber(viewCount)}</Text>
      </Wrap>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 150px;
  margin: 0 ${(props) => box(props).space.sm};

  display: grid;
  grid-template-columns: 50% 50%;
`;

const Wrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
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
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};
    transform: scale(1.1);
  }
`;

const ScoreIconBox = styled(IconBox)`
  path {
    fill: ${(props) => color(props).primary};
  }
`;

const ViewCountIconBox = styled(IconBox)`
  path,
  circle {
    stroke: ${(props) => color(props).primary};
    stroke-width: 2px;
  }
`;
