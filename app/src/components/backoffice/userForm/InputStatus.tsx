import { RefObject, useEffect, useRef } from "react";

import styled from "styled-components";

import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import UserCreateEditService from "@services/backoffice/UserCreateEditService";

export default function InputStatus({ initial }: { initial?: UserStatusEnum }) {
  const inActiveRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initial == UserStatusEnum.ACTIVE) {
      UserCreateEditService.update({ status: UserStatusEnum.ACTIVE });
      activeRef.current!.checked = true;
    }
    if (initial == UserStatusEnum.INACTIVE || !initial) {
      UserCreateEditService.update({ status: UserStatusEnum.INACTIVE });
      inActiveRef.current!.checked = true;
    }
  }, []);

  function onCheckBoxClick(ref: RefObject<HTMLInputElement>) {
    const checkBoxName = ref.current!.getAttribute("name");
    switch (checkBoxName) {
      case UserStatusEnum.INACTIVE:
        ref.current!.checked = true;
        activeRef.current!.checked = false;
        UserCreateEditService.update({ status: UserStatusEnum.INACTIVE });
        break;
      case UserStatusEnum.ACTIVE:
        ref.current!.checked = true;
        inActiveRef.current!.checked = false;
        UserCreateEditService.update({ status: UserStatusEnum.ACTIVE });
        break;
      default:
        break;
    }
  }

  return (
    <Box>
      <Title>Status</Title>
      <CheckBox onClick={() => onCheckBoxClick(inActiveRef)}>
        <input type="checkbox" name={UserStatusEnum.INACTIVE} ref={inActiveRef} />
        <Item>Inactive</Item>
      </CheckBox>
      <CheckBox onClick={() => onCheckBoxClick(activeRef)}>
        <input type="checkbox" name={UserStatusEnum.ACTIVE} ref={activeRef} />
        <Item>Active</Item>
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
