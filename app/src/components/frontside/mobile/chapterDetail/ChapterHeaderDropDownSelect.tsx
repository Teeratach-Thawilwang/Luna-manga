import { RefObject, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import CenterModal from "@components/frontside/mobile/CenterModal";
import DropdownIcon from "@components/iconSvg/DropdownIcon";
import { ChapterListInterface } from "@interfaces/frontside/ChapterInterface";
import ChapterService from "@services/frontside/ChapterService";
import { addEventClick } from "@utils/Hooks";
import { box, color, font } from "@utils/Themes";

export default function ChapterHeaderDropDownSelect() {
  const navigate = useNavigate();
  const { slug, chapterNumber } = useParams();
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownCurrentRef = useRef<HTMLDivElement>(null);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const chapterList = ChapterService.getChapterList();
  const optionList = useMemo(() => createOption(chapterList, Number(chapterNumber), dropDownCurrentRef, onClickHandle), []);

  function onClickHandle(i: number) {
    if (i != Number(chapterNumber)) {
      navigate(`/story/${slug}/${i}`);
    }
  }

  addEventClick((event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsModalShow(false);
    }
    if (dropDownRef.current && dropDownCurrentRef.current) {
      dropDownCurrentRef.current.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  });

  return (
    <>
      <Box>
        <Selector ref={dropDownRef} onClick={() => setIsModalShow((prev) => !prev)}>
          ตอนที่ {chapterNumber}
          <IconBox>
            <DropdownIcon />
          </IconBox>
        </Selector>
      </Box>
      <CenterModal isShow={isModalShow} setShow={setIsModalShow}>
        <OptionBox>{optionList}</OptionBox>
      </CenterModal>
    </>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px ${(props) => box(props).space.sm};

  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Selector = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainer};

  font-size: ${(props) => font(props).size.sm};
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

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
  width: ${(props) => `calc(100vw - ${box(props).space.lg})`};
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
  /* border: 1px solid red; */
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

  cursor: ${(props) => (props.$isCurrent ? "default" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.$isCurrent ? color(props).surfaceContainerHighest : color(props).surfaceContainerHigh)};
  }
`;

function createOption(
  chapterList: ChapterListInterface[],
  currentNumber: number,
  currentRef: RefObject<HTMLDivElement>,
  onClick: (i: number) => void,
  maxOption: number = 100,
) {
  const chapterListFilter = filterChapterList(chapterList, maxOption, currentNumber);
  return chapterListFilter.map((chapter) => {
    return (
      <Option
        ref={chapter.chapter_number == currentNumber ? currentRef : null}
        $isCurrent={chapter.chapter_number == currentNumber}
        onClick={() => onClick(chapter.chapter_number)}
        key={chapter.id}
      >
        {chapter.name}
      </Option>
    );
  });
}

function filterChapterList(chapterList: ChapterListInterface[], size: number, currentNumber: number) {
  const chapterCurrentNumber = chapterList.find((chapter) => chapter.chapter_number === currentNumber);
  const index = chapterList.indexOf(chapterCurrentNumber!);

  if (index === -1) {
    return [];
  }

  let start = Math.max(0, index - Math.floor((size - 1) / 2));
  let end = Math.min(chapterList.length, start + size);

  if (end > chapterList.length) {
    start = Math.max(0, chapterList.length - size);
    end = chapterList.length;
  }

  if (end - start + 1 < size && end == chapterList.length) {
    start = Math.max(0, end - size);
  }

  return chapterList.slice(start, end);
}
