import { RefObject, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import DropdownIcon from "@components/iconSvg/DropdownIcon";
import CenterModal from "@components/tablet/CenterModal";
import { ChapterListInterface } from "@interfaces/ChapterInterface";
import ChapterService from "@services/ChapterService";
import { addEventClick } from "@utils/Hooks";
import { box, color, font } from "@utils/Themes";

export default function ChapterHeaderDropDownSelect() {
  const { slug, chapterNumber } = useParams();
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownCurrentRef = useRef<HTMLDivElement>(null);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const chapterList = ChapterService.getChapterList();
  const currentChapter = chapterList.filter((chapter) => chapter.chapter_number == Number(chapterNumber))[0];
  const optionList = createOption(chapterList, Number(chapterNumber), slug!, dropDownCurrentRef);

  addEventClick((event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsModalShow(false);
    }
    if (dropDownRef.current && dropDownCurrentRef.current) {
      dropDownCurrentRef.current.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  });

  return (
    <Box>
      <Selector ref={dropDownRef} onClick={() => setIsModalShow((prev) => !prev)}>
        <Text>{currentChapter.name}</Text>
        <IconBox>
          <DropdownIcon />
        </IconBox>
      </Selector>
      <CenterModal isShow={isModalShow} setShow={setIsModalShow}>
        <OptionBox>{optionList}</OptionBox>
      </CenterModal>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  padding: 10px ${(props) => box(props).space.md};

  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Selector = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 10px;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: min(55vw, 800px);

  font-size: ${(props) => font(props).size.sm};
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
  text-align: center;
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  position: absolute;
  top: 50%;
  right: ${(props) => box(props).space.md};
  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};

    path {
      fill: ${(props) => color(props).onSurface};
    }
  }
`;

const OptionBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 400px;
  max-width: 1000px;
  max-height: 50vh;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius.xl};

  background-color: ${(props) => color(props).surfaceContainer};

  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.div<{ $isCurrent: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: ${(props) => box(props).space.sm} ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => (props.$isCurrent ? color(props).surfaceContainerHighest : color(props).surfaceContainer)};

  font-size: ${(props) => font(props).size.md};
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  &:hover {
    background-color: ${(props) => (props.$isCurrent ? color(props).surfaceContainerHighest : color(props).surfaceContainerHigh)};
    cursor: ${(props) => (props.$isCurrent ? "default" : "pointer")};
  }
`;

function createOption(chapterList: ChapterListInterface[], currentNumber: number, slug: string, currentRef: RefObject<HTMLDivElement>) {
  const navigate = useNavigate();

  function onClickHandle(i: number) {
    if (i != currentNumber) {
      navigate(`/story/${slug}/${i}`);
    }
  }

  return chapterList.map((chapter) => {
    return (
      <Option
        ref={chapter.chapter_number == currentNumber ? currentRef : null}
        $isCurrent={chapter.chapter_number == currentNumber}
        onClick={() => {
          onClickHandle(chapter.chapter_number);
        }}
        key={chapter.id}
      >
        {chapter.name}
      </Option>
    );
  });
}
