import styled from "styled-components";

import { WidgetListInterface, WidgetSequenceInterface } from "@interfaces/backoffice/WidgetInterface";
import WidgetListService from "@services/backoffice/WidgetListService";
import WidgetSequenceService from "@services/backoffice/WidgetSequenceService";
import { transformBgColorStatus, transformStatus, transformWidgetType } from "@utils/Helpers";

export default function SearchListItem() {
  const widgetsSearch = WidgetListService.getData();
  const widgetsSequence = WidgetSequenceService.getData();

  function onAddWidget(widget: WidgetListInterface) {
    const isWidgetInSequence = widgetsSequence.some((widgetSeq) => widgetSeq.id == widget.id);
    if (!isWidgetInSequence) {
      const newWidgetSequence = Array.from(widgetsSequence);
      const lastSequence = newWidgetSequence.length + 1;
      const addWidgetSequence = { ...widget, sequence: lastSequence } as WidgetSequenceInterface;
      newWidgetSequence.push(addWidgetSequence);
      WidgetSequenceService.update({ data: newWidgetSequence });
    }
    WidgetListService.deleteById(widget.id);
  }

  return (
    <Table>
      <Tbody>
        {widgetsSearch.map((widget, key) => {
          return (
            <tr key={key}>
              <Td>
                <div>{widget.id}</div>
              </Td>
              <Td>{widget.name}</Td>
              <Td>{widget.total_banner}</Td>
              <Td>{transformWidgetType(widget.type)}</Td>
              <Td>
                <StatusBox $bgcolor={transformBgColorStatus(widget.status)}>{transformStatus(widget.status)}</StatusBox>
              </Td>
              <Td>
                <AddButton onClick={() => onAddWidget(widget)}>+</AddButton>
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
    border: 1px solid rgba(0, 0, 0, 0.1);

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
