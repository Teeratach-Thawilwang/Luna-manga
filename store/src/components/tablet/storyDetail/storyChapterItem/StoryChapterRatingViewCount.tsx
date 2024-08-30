import { styled } from "styled-components";

import FavoriteIcon from "@components/iconSvg/FavoriteIcon";
import ViewCountIcon from "@components/iconSvg/ViewCountIcon";
import { transformNumber } from "@utils/Helpers";
import { color, font } from "@utils/Themes";

export default function StoryChapterRatingViewCount({ ratingScore, viewCount }: { ratingScore: number; viewCount: number }) {
  return (
    <Box>
      <Wrap>
        <FavoriteIconBox>
          <FavoriteIcon />
        </FavoriteIconBox>
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
  width: fit-content;
  height: fit-content;
  margin-right: 20px;

  display: flex;
  gap: 0 20px;
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
  font-size: ${(props) => font(props).size.md};
  line-height: ${(props) => font(props).size.md};
`;

const FavoriteIconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};

    fill: #fe7e7e;
  }
`;

const ViewCountIconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  margin-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};

    margin-top: 2px;
  }
`;
