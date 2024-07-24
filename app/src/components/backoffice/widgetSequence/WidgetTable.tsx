import { useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";

import CenterModal from "@components/backoffice/CenterModal";
import ConfirmDeleteWidgetModal from "@components/backoffice/widgetSequence/ConfirmDeleteWidgetModal";
import MoveIcon from "@components/iconSvg/MoveIcon";
import TrashIcon from "@components/iconSvg/TrashIcon";
import WidgetSequenceService from "@services/backoffice/WidgetSequenceService";
import { transformBgColorStatus, transformStatus, transformWidgetType } from "@utils/Helpers";

export default function WidgetTable() {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [deleteWidgetId, setDeleteWidgetId] = useState<number>(0);
  const widgets = WidgetSequenceService.getData();

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const newWidgets = Array.from(widgets);
    const [reOrderWidget] = newWidgets.splice(result.source.index, 1);
    newWidgets.splice(result.destination.index, 0, reOrderWidget);
    WidgetSequenceService.update({ data: newWidgets });
  }

  function onDelete(widgetId: number) {
    setDeleteWidgetId(widgetId);
    setIsModalShow(true);
  }

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr>
                  <Th>Sequence</Th>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th># Banner</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </thead>
              <Tbody>
                {widgets.map((widget, key) => (
                  <Draggable key={widget.id} draggableId={String(widget.id)} index={key}>
                    {(provided) => (
                      <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Td>
                          <div>
                            <IconBox>
                              <MoveIcon />
                            </IconBox>
                            <span>{widget.sequence}</span>
                          </div>
                        </Td>
                        <Td>{widget.id}</Td>
                        <Td>{widget.name}</Td>
                        <Td>{widget.total_banner}</Td>
                        <Td>{transformWidgetType(widget.type)}</Td>
                        <Td>
                          <StatusBox $bgcolor={transformBgColorStatus(widget.status)}>{transformStatus(widget.status)}</StatusBox>
                        </Td>
                        <Td>
                          <div>
                            <IconBox onClick={() => onDelete(widget.id)}>
                              <TrashIcon />
                            </IconBox>
                          </div>
                        </Td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
      <CenterModal isShow={isModalShow} setShow={setIsModalShow}>
        <ConfirmDeleteWidgetModal setShow={setIsModalShow} widgetId={deleteWidgetId} />
      </CenterModal>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  min-height: 500px;
  margin: 20px 0 0 0;

  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  border: 1px solid #424b51;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;

  font-size: 16px;
  text-align: center;
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  color: #fff;
  background-color: #424b51;
`;

const Td = styled.td`
  /* border: 1px solid #d5d5d5; */
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
  max-width: 200px;

  font-size: 16px;
  text-align: center;
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  color: #000000;
  background-color: #ffffff;
`;

const Tbody = styled.tbody`
  tr {
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      cursor: pointer;

      td {
        background-color: #f3f3f3;
      }
    }
  }

  td:nth-child(1) {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;

      span {
        margin-left: 10px;
      }
    }
  }

  td:nth-last-child(1) {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  :nth-child(2),
  :nth-last-child(1),
  :nth-last-child(2) {
    text-align: left;
  }
`;

const StatusBox = styled.div<{ $bgcolor: string }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 3px;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;

  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  background-color: ${(props) => props.$bgcolor};
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: 100%;
    height: 100%;
  }
`;
