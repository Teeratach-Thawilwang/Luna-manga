import { RefObject, useEffect, useRef } from "react";

import styled from "styled-components";

import { CustomerStatusEnum } from "@enums/backoffice/StatusEnum";
import CustomerEditService from "@services/backoffice/CustomerEditService";

export default function InputStatus({ initial }: { initial?: CustomerStatusEnum }) {
  const inActiveRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initial == CustomerStatusEnum.ACTIVE) {
      CustomerEditService.update({ status: CustomerStatusEnum.ACTIVE });
      activeRef.current!.checked = true;
    }
    if (initial == CustomerStatusEnum.INACTIVE || !initial) {
      CustomerEditService.update({ status: CustomerStatusEnum.INACTIVE });
      inActiveRef.current!.checked = true;
    }
  }, []);

  function onCheckBoxClick(ref: RefObject<HTMLInputElement>) {
    const checkBoxName = ref.current!.getAttribute("name");
    switch (checkBoxName) {
      case CustomerStatusEnum.INACTIVE:
        ref.current!.checked = true;
        activeRef.current!.checked = false;
        CustomerEditService.update({ status: CustomerStatusEnum.INACTIVE });
        break;
      case CustomerStatusEnum.ACTIVE:
        ref.current!.checked = true;
        inActiveRef.current!.checked = false;
        CustomerEditService.update({ status: CustomerStatusEnum.ACTIVE });
        break;
      default:
        break;
    }
  }

  return (
    <Box>
      <Title>Status</Title>
      <CheckBox onClick={() => onCheckBoxClick(inActiveRef)}>
        <input type="checkbox" name={CustomerStatusEnum.INACTIVE} ref={inActiveRef} />
        <Item>Inactive</Item>
      </CheckBox>
      <CheckBox onClick={() => onCheckBoxClick(activeRef)}>
        <input type="checkbox" name={CustomerStatusEnum.ACTIVE} ref={activeRef} />
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
