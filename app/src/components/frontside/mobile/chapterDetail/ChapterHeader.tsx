﻿import styled from "styled-components";

import ChapterHeaderDropDownSelect from "@components/frontside/mobile/chapterDetail/ChapterHeaderDropDownSelect";
import ChapterNextButton from "@components/frontside/mobile/chapterDetail/ChapterNextButton";
import ChapterPreviousButton from "@components/frontside/mobile/chapterDetail/ChapterPreviousButton";
import StoryNameLink from "@components/frontside/mobile/chapterDetail/StoryNameLink";

export default function ChapterHeader({ namePosition }: { namePosition?: "Top" | "Bottom" }) {
  return (
    <Box>
      {namePosition == "Top" ? <StoryNameLink /> : null}
      <Contanier>
        <ChapterPreviousButton />
        <ChapterHeaderDropDownSelect />
        <ChapterNextButton />
      </Contanier>
      {namePosition == "Bottom" ? <StoryNameLink /> : null}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Contanier = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;
