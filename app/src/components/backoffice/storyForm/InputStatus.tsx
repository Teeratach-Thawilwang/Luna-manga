import { RefObject, useEffect, useRef } from "react";

import styled from "styled-components";

import { StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";

export default function InputStatus({ initial }: { initial?: StoryStatusEnum }) {
  const inActiveRef = useRef<HTMLInputElement>(null);
  const ongoingRef = useRef<HTMLInputElement>(null);
  const finishedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initial == StoryStatusEnum.INACTIVE || !initial) {
      StoryCreateEditService.update({ status: StoryStatusEnum.INACTIVE });
      inActiveRef.current!.checked = true;
    }
    if (initial == StoryStatusEnum.ONGOING) {
      StoryCreateEditService.update({ status: StoryStatusEnum.ONGOING });
      ongoingRef.current!.checked = true;
    }
    if (initial == StoryStatusEnum.FINISHED) {
      StoryCreateEditService.update({ status: StoryStatusEnum.FINISHED });
      finishedRef.current!.checked = true;
    }
  }, []);

  function onCheckBoxClick(ref: RefObject<HTMLInputElement>) {
    const checkBoxName = ref.current!.getAttribute("name");
    switch (checkBoxName) {
      case StoryStatusEnum.INACTIVE:
        ref.current!.checked = true;
        ongoingRef.current!.checked = false;
        finishedRef.current!.checked = false;
        StoryCreateEditService.update({ status: StoryStatusEnum.INACTIVE });
        break;
      case StoryStatusEnum.ONGOING:
        ref.current!.checked = true;
        inActiveRef.current!.checked = false;
        finishedRef.current!.checked = false;
        StoryCreateEditService.update({ status: StoryStatusEnum.ONGOING });
        break;
      case StoryStatusEnum.FINISHED:
        ref.current!.checked = true;
        inActiveRef.current!.checked = false;
        ongoingRef.current!.checked = false;
        StoryCreateEditService.update({ status: StoryStatusEnum.FINISHED });
        break;
      default:
        break;
    }
  }

  return (
    <Box>
      <Title>Status</Title>
      <CheckBox onClick={() => onCheckBoxClick(inActiveRef)}>
        <input type="checkbox" name={StoryStatusEnum.INACTIVE} ref={inActiveRef} />
        <Item>Inactive</Item>
      </CheckBox>
      <CheckBox onClick={() => onCheckBoxClick(ongoingRef)}>
        <input type="checkbox" name={StoryStatusEnum.ONGOING} ref={ongoingRef} />
        <Item>Ongoing</Item>
      </CheckBox>
      <CheckBox onClick={() => onCheckBoxClick(finishedRef)}>
        <input type="checkbox" name={StoryStatusEnum.FINISHED} ref={finishedRef} />
        <Item>Finished</Item>
      </CheckBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-weight: 500;
  font-size: 20px;
  color: #505050;

  display: flex;
  align-items: center;
`;

const CheckBox = styled.div`
  /* border: 1px solid red; */
  border-radius: 5px;
  display: flex;
  justify-content: start;
  align-items: center;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    margin-left: 20px;
    color-scheme: light;
  }

  &:hover {
    background-color: #bfc5cc;
    cursor: pointer;

    input {
      cursor: pointer;
    }
  }
`;

const Item = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  min-height: 40px;
  color: #000000;
  font-size: 20px;
  white-space: nowrap;

  display: flex;
  justify-content: left;
  align-items: center;

  margin: 0 20px 0 10px;
`;
