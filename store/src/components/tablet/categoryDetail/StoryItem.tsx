import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import ImageStory from "@components/tablet/ImageStory";
import Loading from "@components/tablet/Loading";
import { CategoryStoryInterface } from "@interfaces/CategoryStoryInterface";
import CategoryStoryService from "@services/CategoryStoryService";
import { box, color, font } from "@utils/Themes";

export default React.memo(function StoryItem(story: CategoryStoryInterface) {
  const isLoading = CategoryStoryService.getIsLoading();
  const boxLoadingElement = getBoxLoading(isLoading);

  return (
    <Box to={`/story/${story.slug}`}>
      <Container $isLoading={isLoading}>
        {boxLoadingElement}
        <ImageStory src={story.images[0].desktop} />
        <BottomContainer>
          <Title>{story.name}</Title>
        </BottomContainer>
      </Container>
    </Box>
  );
});

const Box = styled(Link)`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 100%;
  padding: 0 5px;
  text-decoration: none;

  cursor: pointer;
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  position: absolute;
  top: ${(props) => `calc(50% - ${getContainerPaddingBottom(props)})`};
  left: 50%;
  transform: ${(props) => `translate(-50%, calc(-50% + ${getContainerPaddingBottom(props)}/2))`} scale(0.4);

  z-index: ${(props) => box(props).zIndex.dropdown};
  opacity: 1;
`;

const Container = styled.div<{ $isLoading: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding-bottom: ${(props) => getContainerPaddingBottom(props)};

  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};

  &:hover {
    img {
      opacity: 0.6;
      transform: scale(1.4);
    }
  }
`;

const BottomContainer = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;

  border-radius: 8px;

  position: absolute;
  bottom: 0;
`;

const BaseText = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  padding: ${(props) => box(props).space.xs};

  line-height: ${(props) => font(props).lineHeight.sm};
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
  text-align: center;
`;

const Title = styled(BaseText)`
  padding-top: ${(props) => box(props).space.sm};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};
`;

function getBoxLoading(isLoading: boolean) {
  if (isLoading) {
    return (
      <BoxLoading>
        <Loading />
      </BoxLoading>
    );
  }
  return null;
}

function getContainerPaddingBottom(props: any) {
  const titleHeight = `${box(props).space.sm} + ${box(props).space.xs} + ${font(props).lineHeight.sm}`;
  return `calc(${titleHeight})`;
}
