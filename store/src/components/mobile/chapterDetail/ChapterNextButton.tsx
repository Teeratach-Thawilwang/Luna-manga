import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import ExpandRightIcon from "@components/iconSvg/ExpandRightIcon";
import ChapterService from "@services/ChapterService";
import { box, color, font } from "@utils/Themes";

export default function ChapterNextButton() {
  const navigate = useNavigate();
  const { slug, chapterNumber: number } = useParams();
  const currentNumber = Number(number);
  const chapterList = ChapterService.getChapterList();
  const lastChapter = chapterList[0].chapter_number;

  function onClickHandle() {
    if (currentNumber != lastChapter) {
      const currentChapterIndex = chapterList.findIndex((chapter) => chapter.chapter_number == currentNumber);
      navigate(`/story/${slug}/${chapterList[currentChapterIndex - 1].chapter_number}`);
    }
  }
  return (
    <Box onClick={onClickHandle} $disable={currentNumber == lastChapter}>
      <IconBox>
        <ExpandRightIcon />
      </IconBox>
    </Box>
  );
}

const Box = styled.div<{ $disable: boolean }>`
  border: 1px solid red;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: ${(props) => box(props).space.sm};

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.$disable ? 0.5 : 1)};
  cursor: ${(props) => (props.$disable ? "default " : "pointer")};

  &:hover {
    background-color: ${(props) => (props.$disable ? color(props).surfaceContainer : color(props).surfaceContainerHigh)};

    div {
      color: ${(props) => (props.$disable ? color(props).onSurface : color(props).primary)};
    }

    path {
      stroke: ${(props) => (props.$disable ? color(props).onSurface : color(props).primary)};
    }
  }
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.xl};
    height: ${(props) => font(props).size.xl};

    path {
      stroke-width: 4px;
    }
  }
`;
