import { darken } from "polished";

import styled from "styled-components";

import { CustomerReportGroupEnum } from "@enums/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/CustomerReportSourceEnum";
import ChapterCommentService from "@services/ChapterCommentService";
import ChapterService from "@services/ChapterService";
import CustomerReportService from "@services/CustomerReportService";
import { box, color, font } from "@utils/Themes";

interface ComfirmModalButtonInterface {
  group: CustomerReportGroupEnum | "DELETE";
  customerId: number;
  commentId: number;
  setShow: (value: boolean) => void;
}

export default function ComfirmModalButton({ group, customerId, commentId, setShow }: ComfirmModalButtonInterface) {
  const chapter = ChapterService.getChapter();

  function onClickHandle() {
    if (group == "DELETE") {
      ChapterCommentService.delete(chapter!.id, commentId);
      setShow(false);
      return;
    }

    CustomerReportService.report(commentId, group, CustomerReportSourceEnum.COMMENT, customerId);
    setShow(false);
  }

  return <Box onClick={onClickHandle}>ยืนยัน</Box>;
}

const Box = styled.div`
  height: 40px;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.xxl};

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
    color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    border: 1px solid ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
    color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
