import { lighten } from "polished";

import styled from "styled-components";

import ComfirmModalButton from "@components/frontside/tablet/profile/post/ComfirmModalButton";
import { CustomerReportGroupEnum } from "@enums/frontside/CustomerReportGroupEnum";
import { box, color, font } from "@utils/Themes";

interface ReportPostConfirmModalInterface {
  group: CustomerReportGroupEnum | "DELETE";
  text: string;
  customerId: number;
  postId: number;
  setShow: (value: boolean) => void;
}

export default function ReportPostConfirmModal({ group, text, customerId, postId, setShow }: ReportPostConfirmModalInterface) {
  const titleText = getTitleTextByGroup(group);

  return (
    <Box>
      {titleText}
      <Text>{text}</Text>
      <ComfirmModalButton group={group} customerId={customerId} postId={postId} setShow={setShow} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  min-width: 300px;
  padding: 10px;

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};
`;

const Title = styled.div`
  box-sizing: border-box;
  padding: 10px;

  border-bottom: 1px solid ${(props) => color(props).outlineVariant};

  /* color: ${(props) => color(props).onSurface}; */
  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};

  text-align: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 10px;

  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};

  text-align: center;
`;

function getTitleTextByGroup(group: CustomerReportGroupEnum | "DELETE"): JSX.Element {
  if (group == "DELETE") {
    return <Title>คุณต้องการจะลบโพสต์นี้</Title>;
  }

  return (
    <>
      <Title>รายงาน</Title>
      <Text>คุณต้องการรายงานว่าโพสต์นี้</Text>
    </>
  );
}
