import { Link } from "react-router-dom";

import styled from "styled-components";

import ImageStory from "@components/mobile/ImageStory";
import Loading from "@components/mobile/Loading";
import { BannerInterface } from "@interfaces/BannerInterface";
import { box, color, font } from "@utils/Themes";

export default function BannerTypeChapter({ banner, isLoading }: { banner: BannerInterface; isLoading: boolean }) {
  const boxLoadingElement = getBoxLoading(isLoading);
  const url = banner.link.replace("https://", "").replace("http://", "");

  return (
    <Box to={url}>
      <Container $isLoading={isLoading}>
        {boxLoadingElement}
        <ImageStory src={banner.images[0].mobile} />
        <BottomContainer>
          <Title>{banner.title}</Title>
          <ChapterNumber>{banner.name}</ChapterNumber>
        </BottomContainer>
      </Container>
    </Box>
  );
}

const Box = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  padding: 0 3px;
  text-decoration: none;
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
  box-sizing: border-box;
  width: 100%;
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

  line-height: ${(props) => font(props).lineHeight.xs};
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
  text-align: left;
`;

const Title = styled(BaseText)`
  padding-top: ${(props) => box(props).space.sm};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};
`;

const ChapterNumber = styled(BaseText)`
  color: ${(props) => color(props).onSurfaceVariant};

  font-size: ${(props) => font(props).size.xs};
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
  const titleHeight = `${box(props).space.sm} + ${box(props).space.xs} + ${font(props).lineHeight.xs}`;
  const ChapterNumberHeight = `2*${box(props).space.xs} + ${font(props).lineHeight.xs}`;
  return `calc(${titleHeight} + ${ChapterNumberHeight})`;
}
