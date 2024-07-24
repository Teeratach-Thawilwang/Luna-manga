import styled from "styled-components";

import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";
import StoryListService from "@services/backoffice/StoryListService";
import { transformBgColorStatus, transformStatus } from "@utils/Helpers";

export default function StorySearchListItem() {
  const type = BannerCreateEditService.getter<CategoryTypeEnum | null>("type") ?? CategoryTypeEnum.MANGA;
  const storySearch = StoryListService.getData();

  function onAddStory(story: StoryListInterface) {
    BannerCreateEditService.update({ story: story });
    StoryListService.clearState();
  }

  return (
    <Table>
      <Tbody>
        {storySearch.map((story, key) => {
          return (
            <tr key={key}>
              <Td>
                <div>{story.id}</div>
              </Td>
              <Td>{story.name}</Td>
              <Td>{type}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(story.status)}>{transformStatus(story.status)}</StatusBox>
              </Td>
              <Td>
                <AddButton onClick={() => onAddStory(story)}>+</AddButton>
              </Td>
            </tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
`;

const Tbody = styled.tbody`
  tr {
    /* border: 1px solid rgba(0, 0, 0, 0.1); */

    &:hover {
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

const AddButton = styled.div`
  box-sizing: border-box;
  border-radius: 100%;
  height: 25px;
  width: 25px;

  color: #ffffff;
  background-color: #3ba539;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #5dc85b;
  }

  &:active {
    cursor: pointer;
    background-color: #3ba539;
  }
`;
