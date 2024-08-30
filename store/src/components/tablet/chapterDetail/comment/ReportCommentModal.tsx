import { useState } from "react";

import styled from "styled-components";

import CenterModal from "@components/tablet/CenterModal";
import ReportCommentConfirmModal from "@components/tablet/chapterDetail/comment/ReportCommentConfirmModal";
import { CustomerReportGroupEnum } from "@enums/CustomerReportGroupEnum";
import CustomerProfileService from "@services/CustomerProfileService";
import { box, color, font } from "@utils/Themes";

interface ReportPostModalInterface {
  isShow: boolean;
  commentId: number;
  commenterId: number;
  setIsShow: (value: boolean) => void;
}

interface ReportPostModalState {
  isShow: boolean;
  group: CustomerReportGroupEnum | "DELETE";
  text: string;
}

const initialReportPostModalState = {
  isShow: false,
  group: CustomerReportGroupEnum.HATE_SPEECH,
  text: "",
};

const PostReportMapping = [
  { group: CustomerReportGroupEnum.SEXUAL, text: "มีเนื้อหามีความรุนแรงทางเพศ" },
  { group: CustomerReportGroupEnum.UNRELATED, text: "มีการโฆษณาที่ไม่เกี่ยวข้องกับโพส" },
  { group: CustomerReportGroupEnum.HATE_SPEECH, text: "มีคำหยาบคาย" },
  { group: CustomerReportGroupEnum.SPAM, text: "สแปม" },
  { group: "DELETE", text: "ลบ" },
];

export default function ReportCommentModal({ isShow, commentId, commenterId, setIsShow }: ReportPostModalInterface) {
  const customerId = CustomerProfileService.getCustomerId();
  const [state, setState] = useState<ReportPostModalState>(initialReportPostModalState);
  const isOnwer = getIsOwner(customerId, commenterId);

  function setShowHandle(value: boolean) {
    setState((prev) => ({ ...prev, isShow: value }));
    setIsShow(value);
  }

  const reportItemElements = createReportItem(isOnwer, setIsShow, setState);

  return (
    <>
      {isShow ? <Box>{reportItemElements}</Box> : null}
      <CenterModal isShow={state.isShow} setShow={setShowHandle}>
        <ReportCommentConfirmModal group={state.group} text={state.text} customerId={customerId!} commentIdId={commentId} setShow={setShowHandle} />
      </CenterModal>
    </>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  min-width: 100px;

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  box-shadow: 0px 0px 5px 0px ${(props) => color(props).shadow};

  position: absolute;
  right: 50px;
  top: 5px;

  display: block;

  z-index: ${(props) => box(props).zIndex.dropdown};

  div:first-child {
    border-top-right-radius: ${(props) => box(props).borderRadius.md};
    border-top-left-radius: ${(props) => box(props).borderRadius.md};
  }
  div:last-child {
    border-bottom-left-radius: ${(props) => box(props).borderRadius.md};
    border-bottom-right-radius: ${(props) => box(props).borderRadius.md};
  }
`;

const Item = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 0;
  padding: ${(props) => box(props).space.sm};

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  font-size: ${(props) => font(props).size.md};
  white-space: nowrap;

  display: flex;
  justify-content: left;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }
`;

function getIsOwner(customerId: number | null, commenterId: number): boolean {
  if (customerId != null && customerId == commenterId) {
    return true;
  }
  return false;
}

function onItemClick(
  group: CustomerReportGroupEnum | "DELETE",
  text: string,
  setIsShow: (value: boolean) => void,
  setState: (value: ReportPostModalState) => void,
) {
  setState({ isShow: true, group: group, text: text });
  setIsShow(false);
}

function createReportItem(isOnwer: boolean, setIsShow: (value: boolean) => void, setState: (value: ReportPostModalState) => void) {
  return PostReportMapping.map((report, key) => {
    const group = report.group as CustomerReportGroupEnum | "DELETE";
    const textState = group == "DELETE" ? "" : report.text;

    if (!isOnwer && group == "DELETE") {
      return null;
    }

    return (
      <Item onClick={() => onItemClick(group, textState, setIsShow, setState)} key={key}>
        {report.text}
      </Item>
    );
  });
}
