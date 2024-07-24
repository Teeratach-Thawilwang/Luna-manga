import { useRef, useState } from "react";

import styled from "styled-components";

import CenterModal from "@components/frontside/mobile/CenterModal";
import StoryOptionModal from "@components/frontside/mobile/storyDetail/modal/StoryOptionModal";
import StoryReportContent from "@components/frontside/mobile/storyDetail/modal/StoryReportContent";
import VerticalOptionIcon from "@components/iconSvg/VerticalOptionIcon";
import { addEventClick } from "@utils/Hooks";
import { color, font } from "@utils/Themes";

export default function StoryOptionButton() {
  const [isOptionModalShow, setIsOptionModalShow] = useState<boolean>(false);
  const [isReportModalShow, setIsReportModalShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  addEventClick((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOptionModalShow(false);
    }
  });

  return (
    <>
      <Box onClick={() => setIsOptionModalShow(!isOptionModalShow)} ref={modalRef}>
        <OptionModal>
          <VerticalOptionIcon />
        </OptionModal>
        <StoryOptionModal isShow={isOptionModalShow} setReportShow={setIsReportModalShow} />
      </Box>
      <CenterModal isShow={isReportModalShow} setShow={setIsReportModalShow}>
        <StoryReportContent setShow={setIsReportModalShow} />
      </CenterModal>
    </>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const OptionModal = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  border-radius: 100%;

  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};
  }

  path {
    fill: ${(props) => color(props).primary};
    stroke: ${(props) => color(props).primary};
  }

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }

  &:active {
    transform: scale(1);
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;
