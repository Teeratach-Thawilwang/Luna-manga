import { Dispatch, SetStateAction, useState } from "react";

import styled from "styled-components";

import XIcon from "@components/iconSvg/XIcon";
import ZoomIn from "@components/iconSvg/ZoomIn";
import ZoomOut from "@components/iconSvg/ZoomOut";
import { MangaEditorElement } from "@interfaces/EditorInterface";

interface RenderImageInterface {
  node: MangaEditorElement;
  setNodes: Dispatch<SetStateAction<MangaEditorElement[]>>;
}

export default function RenderImage({ node, setNodes }: RenderImageInterface) {
  const [isExpand, setIsExpand] = useState(false);

  function onDeleteHandle() {
    setNodes((nodes) => {
      return Array.from(nodes).filter((prevNode) => {
        const isTypeMatch = prevNode.type == node.type;
        const isUrlMatch = prevNode.url == node.url;
        return !(isTypeMatch && isUrlMatch);
      });
    });
  }

  return (
    <Box>
      <Toolbar $isExpand={isExpand}>
        <ExpandIconBox onClick={() => setIsExpand((prev) => !prev)}>{isExpand ? <ZoomIn /> : <ZoomOut />}</ExpandIconBox>
        <CloseIconBox onClick={onDeleteHandle}>
          <XIcon />
        </CloseIconBox>
      </Toolbar>
      <ImageBox $isExpand={isExpand}>
        <Image src={node.url} />
      </ImageBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 0px;

  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Toolbar = styled.div<{ $isExpand: boolean }>`
  /* border: 1px solid green; */
  box-sizing: border-box;
  margin-top: 5px;
  width: ${(props) => (props.$isExpand ? "100%" : "30%")};
  height: 30px;
  background-color: #363636;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const ImageBox = styled.div<{ $isExpand: boolean }>`
  /* border: 1px solid green; */
  box-sizing: border-box;
  width: ${(props) => (props.$isExpand ? "100%" : "30%")};

  display: flex;
  position: relative;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 25px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: 25px;
    height: 25px;
    fill: #ffffff;
  }

  path {
    fill: #ffffff;
    stroke-width: 1px;
    stroke: #ffffff;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ExpandIconBox = styled(IconBox)`
  /* border: 1px solid red; */
  margin-left: 2px;
  margin-right: auto;
`;

const CloseIconBox = styled(IconBox)`
  /* border: 1px solid red; */
  margin-right: 2px;
`;
