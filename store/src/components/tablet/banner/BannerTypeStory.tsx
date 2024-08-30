import { Link } from "react-router-dom";

import styled from "styled-components";

import ImageStory from "@components/tablet/ImageStory";
import { BannerInterface } from "@interfaces/BannerInterface";
import { box, color, font } from "@utils/Themes";

export default function BannerTypeStory(banner: BannerInterface) {
  const url = banner.link.replace("https://", "").replace("http://", "");
  return (
    <Box to={url}>
      <Container>
        <ImageStory src={banner.images[0].desktop} />
        <BottomContainer>
          <Title>{banner.title}</Title>
        </BottomContainer>
      </Container>
    </Box>
  );
}

const Box = styled(Link)`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  padding: 0 5px;
  text-decoration: none;
  display: block;

  cursor: pointer;
`;

const Container = styled.div`
  box-sizing: border-box;
  padding-bottom: ${(props) => getContainerPaddingBottom(props)};

  position: relative;
  overflow: hidden;

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

function getContainerPaddingBottom(props: any) {
  const titleHeight = `${box(props).space.sm} + ${box(props).space.xs} + ${font(props).lineHeight.sm}`;
  return `calc(${titleHeight})`;
}
