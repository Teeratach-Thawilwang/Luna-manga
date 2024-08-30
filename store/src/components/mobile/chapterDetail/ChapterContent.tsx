import { useEffect } from "react";

import styled from "styled-components";

import ChapterHeader from "@components/mobile/chapterDetail/ChapterHeader";
import ChapterNodes from "@components/mobile/chapterDetail/ChapterNodes";
import RequestAudioUsage from "@components/mobile/chapterDetail/RequestAudioUsage";
import { ImageResponsiveEnum } from "@enums/ImageResponsiveEnum";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import ChapterService from "@services/ChapterService";
import { loadFontForNovel } from "@utils/Helpers";
import { box } from "@utils/Themes";

export default function ChapterContent() {
  const chapter = ChapterService.getChapter();
  const isAudioAccept = ChapterService.getIsAcceptAudio();
  const isChapterNull = chapter == null;

  useEffect(() => {
    if (!isChapterNull) {
      const isNovelContent = nodes.some((node) => node.type == ElementTypeEnum.TEXT);
      if (isNovelContent) {
        loadFontForNovel();
      }
    }
  }, [isChapterNull]);

  if (isChapterNull) {
    return <></>;
  }

  const nodes = ChapterService.transformTextToEditor(chapter.text, chapter.images, chapter.audio, ImageResponsiveEnum.MOBILE);
  const isAudioNodeExist = nodes.some((node) => node.type == ElementTypeEnum.AUDIO);

  return (
    <Box>
      <ChapterHeader namePosition="Top" />
      {isAudioNodeExist ? <RequestAudioUsage /> : null}
      <ChapterNodes nodes={nodes} isAudioAccept={isAudioAccept} />
      <ChapterHeader />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: ${(props) => box(props).space.lg};
`;
