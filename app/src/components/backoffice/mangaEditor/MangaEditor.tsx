import React, { Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";

import AddAudioButton from "@components/backoffice/mangaEditor/AddAudioButton";
import AddImageButton from "@components/backoffice/mangaEditor/AddImageButton";
import RenderAudio from "@components/backoffice/mangaEditor/RenderAudio";
import RenderImage from "@components/backoffice/mangaEditor/RenderImage";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { MangaEditorElement } from "@interfaces/EditorInterface";

interface MangaEditorInterface {
  nodes: MangaEditorElement[];
  setNodes: Dispatch<SetStateAction<MangaEditorElement[]>>;
}

export default React.memo(function MangaEditor({ nodes, setNodes }: MangaEditorInterface) {
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const newData = Array.from(nodes);
    const [reOrderData] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reOrderData);
    setNodes(newData);
  }

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <DroppableBox {...provided.droppableProps} ref={provided.innerRef}>
              {nodes.map((node, key) => (
                <Draggable key={key} draggableId={String(key)} index={key}>
                  {(provided) => (
                    <DraggableItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {createRenderNode(node, setNodes, key)}
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DroppableBox>
          )}
        </Droppable>
      </DragDropContext>
      <ToolbarBottom $marginTop={nodes.length == 0 ? "0px" : "10px"}>
        <AddImageButton setNodes={setNodes} />
        <AddAudioButton setNodes={setNodes} />
      </ToolbarBottom>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
`;

const DroppableBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  border-radius: 5px;
  background-color: #bfc5cc;
`;

const DraggableItem = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
`;

const ToolbarBottom = styled.div<{ $marginTop: string }>`
  /* border: 1px solid green; */
  box-sizing: border-box;
  margin-top: ${(props) => props.$marginTop};

  display: flex;
  justify-content: start;
  align-items: center;
`;

function createRenderNode(node: MangaEditorElement, setNodes: Dispatch<SetStateAction<MangaEditorElement[]>>, key: number) {
  const type = node.type;

  switch (type) {
    case ElementTypeEnum.AUDIO:
      return <RenderAudio node={node} setNodes={setNodes} key={key} />;
    case ElementTypeEnum.IMAGE:
      return <RenderImage node={node} setNodes={setNodes} key={key} />;
  }
}
