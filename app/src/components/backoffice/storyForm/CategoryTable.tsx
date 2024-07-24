import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";

import MoveIcon from "@components/iconSvg/MoveIcon";
import TrashIcon from "@components/iconSvg/TrashIcon";
import { CategoryListInterface } from "@interfaces/backoffice/CategoryInterface";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";
import { transformBgColorStatus, transformStatus } from "@utils/Helpers";

export default function CategoryTable() {
  const categories = StoryCreateEditService.getter<CategoryListInterface[]>("categories");

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const newCategories = Array.from(categories);
    const [reOrderCategory] = newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, reOrderCategory);
    StoryCreateEditService.update({ categories: newCategories });
  }

  function onDelete(categoryId: number) {
    const newCategories = categories.filter((category) => category.id != categoryId);
    StoryCreateEditService.update({ categories: newCategories });
  }

  if (categories.length <= 0) {
    return null;
  }

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th># Story</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </thead>
              <Tbody>
                {categories.map((category, key) => (
                  <Draggable key={category.id} draggableId={String(category.id)} index={key}>
                    {(provided) => (
                      <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Td>
                          <div>
                            <IconBox>
                              <MoveIcon />
                            </IconBox>
                            <span>{category.id}</span>
                          </div>
                        </Td>
                        <Td>{category.name}</Td>
                        <Td>{category.total_story}</Td>
                        <Td>{category.type}</Td>
                        <Td>
                          <StatusBox $bgcolor={transformBgColorStatus(category.status)}>{transformStatus(category.status)}</StatusBox>
                        </Td>
                        <Td>
                          <div>
                            <IconBox onClick={() => onDelete(category.id)}>
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
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
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
      /* cursor: pointer; */

      td {
        background-color: #f3f3f3;
      }
    }
  }

  td:nth-child(1) {
    div {
      display: flex;
      justify-content: start;
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

  &:hover {
    cursor: pointer;
  }
`;
