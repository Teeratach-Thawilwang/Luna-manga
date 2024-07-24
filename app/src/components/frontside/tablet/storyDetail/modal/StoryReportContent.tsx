import { darken, lighten } from "polished";

import { RefObject, useRef } from "react";

import styled from "styled-components";

import { CustomerReportGroupEnum } from "@enums/frontside/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/frontside/CustomerReportSourceEnum";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import CustomerReportService from "@services/frontside/CustomerReportService";
import StoryService from "@services/frontside/StoryService";
import { box, color, font } from "@utils/Themes";

interface reportGroupsInterface {
  group: CustomerReportGroupEnum;
  ref: RefObject<HTMLInputElement>;
  text: string;
}

export default function StoryReportContent({ setShow }: { setShow: (value: boolean) => void }) {
  const copyrightInfringementRef = useRef<HTMLInputElement>(null);
  const inappropriateRatedRef = useRef<HTMLInputElement>(null);
  const hateSpeechRef = useRef<HTMLInputElement>(null);
  const spamRef = useRef<HTMLInputElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const customerId = CustomerProfileService.getCustomerId()!;
  const storyId = StoryService.getStory()?.id;

  const reportGroups: reportGroupsInterface[] = [
    {
      group: CustomerReportGroupEnum.COPYRIGHT_INFRINGEMENT,
      ref: copyrightInfringementRef,
      text: "ผิดลิขสิทธิ์",
    },
    {
      group: CustomerReportGroupEnum.INAPPROPRIATELY_RATED,
      ref: inappropriateRatedRef,
      text: "เนื้อหามีความไม่เหมาะสม",
    },
    {
      group: CustomerReportGroupEnum.HATE_SPEECH,
      ref: hateSpeechRef,
      text: "มีคำหยาบคาย",
    },
    {
      group: CustomerReportGroupEnum.SPAM,
      ref: spamRef,
      text: "สแปม",
    },
    {
      group: CustomerReportGroupEnum.OTHER,
      ref: otherRef,
      text: "อื่น ๆ",
    },
  ];

  function onCheckBoxClick(ref: RefObject<HTMLInputElement>) {
    reportGroups.map((item) => (item.ref.current!.checked = false));
    ref.current!.checked = !ref.current!.checked;
  }

  function onSubmit() {
    const selectGroup = reportGroups.filter((item) => item.ref.current?.checked);
    if (selectGroup.length == 0 || storyId == undefined) {
      return;
    }

    const group = selectGroup[0].group;
    const isMessageEmpty = (messageRef.current?.value ?? "").length <= 0;
    if (group == CustomerReportGroupEnum.OTHER && isMessageEmpty) {
      messageRef.current?.focus();
      return;
    }

    const source = CustomerReportSourceEnum.STORY;
    const message = messageRef.current?.value;
    CustomerReportService.report(storyId, group, source, customerId, message);

    messageRef.current!.value = "";
    reportGroups.map((item) => (item.ref.current!.checked = false));
    setShow(false);
  }

  return (
    <Box>
      <Title>รายงานความไม่เหมาะสม</Title>
      {createCheckBoxes(reportGroups, onCheckBoxClick)}
      <Message maxLength={150} placeholder="ข้อมูลเพิ่มเติม" data-gramm="false" ref={messageRef} />
      <SubmitButton onClick={onSubmit}>รายงาน</SubmitButton>
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 400px;
  padding: ${(props) => box(props).space.md};
  padding-top: 10px;

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};
`;

const Title = styled.div`
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: ${(props) => box(props).space.sm};

  border-bottom: 1px solid ${(props) => color(props).outlineVariant};

  /* color: ${(props) => color(props).onSurface}; */
  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};

  text-align: center;
`;

const CheckBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* padding: 0 ${(props) => box(props).space.md}; */

  display: flex;
  justify-content: start;
  align-items: center;

  &:hover {
    cursor: pointer;

    div {
      box-shadow: inset 0 0 0 1px ${(props) => color(props).outlineVariant};
      background-color: ${(props) => color(props).surfaceContainerHighest};
    }
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const Item = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-left: ${(props) => box(props).space.sm};
  padding: ${(props) => box(props).space.sm};

  border-radius: ${(props) => box(props).borderRadius.md};
  color: ${(props) => lighten(0.1, color(props).onSurface)};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};

  text-align: left;
`;

const Message = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  margin-top: ${(props) => box(props).space.sm};
  padding: 10px;

  border: 1px solid ${(props) => color(props).outlineVariant};
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surfaceContainerHigh};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.light};

  display: block;
  outline: none;
  resize: none;

  overflow: hidden;

  &::placeholder {
    /* padding: 5px; */
    color: ${(props) => color(props).onSurfaceVariant};
  }

  &:focus {
    border: 1px solid ${(props) => color(props).primary};
  }
`;

const SubmitButton = styled.div`
  height: 40px;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.xxl};

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;

function createCheckBox(ref: RefObject<HTMLInputElement>, text: string, onClick: (ref: RefObject<HTMLInputElement>) => void): JSX.Element {
  return (
    <CheckBox onClick={() => onClick(ref)} key={text}>
      <Input type="checkbox" ref={ref} />
      <Item>{text}</Item>
    </CheckBox>
  );
}

function createCheckBoxes(reportGroups: reportGroupsInterface[], onClick: (ref: RefObject<HTMLInputElement>) => void): JSX.Element[] {
  return reportGroups.map((item) => createCheckBox(item.ref, item.text, onClick));
}
