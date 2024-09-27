import { useRef, useState } from "react";

import { styled } from "styled-components";

import RenderAudio from "@components/tablet/chapterDetail/RenderAudio";
import RenderText from "@components/tablet/chapterDetail/RenderText";
import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { addEventScroll } from "@utils/Hooks";
import { box } from "@utils/Themes";

interface ChapterNodesInterface {
  nodes: TextEditorElement[] | MangaEditorElement[];
  isAudioAccept: boolean;
  chapterType: CategoryTypeEnum;
}

export default function ChapterNodes({ nodes, isAudioAccept, chapterType }: ChapterNodesInterface) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const skipNodeNumber = chapterType == CategoryTypeEnum.NOVEL ? nodes.length : 2;
  const initialRenderNodes = [...nodes.slice(0, skipNodeNumber)];
  const [isAdding, setIsAdding] = useState(false);
  const [renderNodes, setRenderNodes] = useState<TextEditorElement[] | MangaEditorElement[]>(initialRenderNodes);

  addEventScroll(() => {
    if (footerRef.current == null) {
      return;
    }
    const currentScrollY = footerRef.current.getBoundingClientRect().bottom;
    const isReachBottom = currentScrollY <= window.innerHeight + 80;
    const isAddable = renderNodes.length < nodes.length && isAdding == false;
    if (isReachBottom && isAddable) {
      setIsAdding(true);
      const indexStop = getIndexStop(renderNodes, nodes, skipNodeNumber);
      setRenderNodes((_prev) => {
        setIsAdding(false);
        return [...nodes.slice(0, indexStop)];
      });
    }
  }, [renderNodes, isAdding, footerRef]);

  return (
    <Box>
      {createContent(renderNodes, isAudioAccept)}
      <div ref={footerRef}></div>
    </Box>
  );
}

const Box = styled.div`
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

function getIndexStop(renderNodes: any[], nodes: any[], skipNodeNumber: number) {
  const indexStop = renderNodes.length + skipNodeNumber;
  if (indexStop > nodes.length) {
    return nodes.length;
  }
  return indexStop;
}
