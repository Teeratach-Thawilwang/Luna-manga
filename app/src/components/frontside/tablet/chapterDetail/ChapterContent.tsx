import { useEffect } from "react";

import styled from "styled-components";

import ChapterHeader from "@components/frontside/tablet/chapterDetail/ChapterHeader";
import RenderAudio from "@components/frontside/tablet/chapterDetail/RenderAudio";
import RenderText from "@components/frontside/tablet/chapterDetail/RenderText";
import RequestAudioUsage from "@components/frontside/tablet/chapterDetail/RequestAudioUsage";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import ChapterService from "@services/frontside/ChapterService";
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

  const nodes = ChapterService.transformTextToEditor(chapter.text, chapter.images, chapter.audio);
  const isAudioNodeExist = nodes.some((node) => node.type == ElementTypeEnum.AUDIO);

  return (
    <Box>
      <ChapterHeader namePosition="Top" />
      {isAudioNodeExist ? <RequestAudioUsage /> : null}
      <Wrap>{createContent(nodes, isAudioAccept)}</Wrap>
      <ChapterHeader />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;

  margin-top: ${(props) => box(props).space.xxl};
`;

const Wrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: ${(props) => box(props).space.md} 0;
`;

const Image = styled.img`
  /* border: 1px solid red; */
  width: 100%;
  display: block;
`;

function createContent(nodes: TextEditorElement[] | MangaEditorElement[], isAudioAccept: boolean) {
  return nodes.map((node, key) => {
    return createRenderNode(node, key, isAudioAccept);
  });
}

function createRenderNode(node: TextEditorElement | MangaEditorElement, key: number, isAudioAccept: boolean) {
  const type = node.type;

  switch (type) {
    case ElementTypeEnum.AUDIO:
      if (isAudioAccept) {
        return <RenderAudio url={node.url!} sequence={key} key={key} />;
      }
      return null;
    case ElementTypeEnum.IMAGE:
      return <Image src={node.url} key={key} />;
    case ElementTypeEnum.TEXT:
      return <RenderText node={node as TextEditorElement} key={key} />;
  }
}
