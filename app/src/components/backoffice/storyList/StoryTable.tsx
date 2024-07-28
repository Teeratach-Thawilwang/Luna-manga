import { MutableRefObject, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import Loading from "@components/backoffice/Loading";
import StoryListPagination from "@components/backoffice/storyList/StoryListPagination";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import StoryListService from "@services/backoffice/StoryListService";
import { transformBgColorStatus, transformStatus, transfromDateString } from "@utils/Helpers";

export default function StoryTable() {
  const { type: slug } = useParams();
  const type = slug! as CategoryTypeEnum;
  const navigate = useNavigate();
  const storys = StoryListService.getData();
  const storyFilter = StoryListService.getFilter();
  const isLoading = StoryListService.getIsLoading();
  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  function navigatePagination(page: number) {
    tableRef.current!.scrollIntoView({ block: "start", behavior: "smooth" });
    StoryListService.loadStoryList(
      storyFilter?.q,
      storyFilter?.status,
      storyFilter?.start_date,
      storyFilter?.end_date,
      type,
      page,
      storyFilter?.order_by,
    );
  }

  return (
    <Box ref={tableRef}>
      {isLoading == true ? (
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      ) : null}
      <Table $isLoading={isLoading}>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th># Chapters</Th>
            <Th>Author</Th>
            <Th>Rating</Th>
            <Th>Status</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </tr>
        </thead>
        <Tbody>
          {storys.map((story) => (
            <tr key={story.id} onClick={() => navigate(`/backoffice/story/${story.id}`)}>
              <Td>{story.id}</Td>
              <Td>{story.name}</Td>
              <Td>{story.total_chapter}</Td>
              <Td>{story.author_name}</Td>
              <Td>{story.rating_score}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(story.status)}>{transformStatus(story.status)}</StatusBox>
              </Td>
              <Td>{transfromDateString(story.created_at)}</Td>
              <Td>{transfromDateString(story.updated_at)}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <StoryListPagination navigatePagination={navigatePagination} />
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

const BoxLoading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -30%);
  z-index: 99;
  opacity: 1;
  /* background-color: rgba(255, 223, 223, 0.35); */
`;

const Table = styled.table<{ $isLoading: boolean }>`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;

  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};
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
