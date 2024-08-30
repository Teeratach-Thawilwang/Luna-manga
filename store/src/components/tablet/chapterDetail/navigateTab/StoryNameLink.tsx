import { lighten } from "polished";

import { Link, useParams } from "react-router-dom";

import styled from "styled-components";

import ChapterService from "@services/ChapterService";
import { box, color, font } from "@utils/Themes";

export default function StoryNameLink() {
  const { slug } = useParams();
  const storyName = ChapterService.getStoryName();

  return (
    <Box to={`/story/${slug}`}>
      <Text>{storyName}</Text>
    </Box>
  );
}

const Box = styled(Link)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: ${(props) => box(props).space.sm};
  text-decoration: none;

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  color: ${(props) => color(props).primary};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => lighten(1 - font(props).opacity.hover, color(props).primary)};
    color: ${(props) => lighten(1 - font(props).opacity.hover, color(props).primary)};
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  font-size: ${(props) => font(props).size.md};
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;
