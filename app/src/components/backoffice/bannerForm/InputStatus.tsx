import { RefObject, useEffect, useRef } from "react";

import styled from "styled-components";

import { BannerStatusEnum } from "@enums/backoffice/StatusEnum";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputStatus({ initial }: { initial?: BannerStatusEnum }) {
  const inActiveRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initial == BannerStatusEnum.ACTIVE) {
      BannerCreateEditService.update({ status: BannerStatusEnum.ACTIVE });
      activeRef.current!.checked = true;
    }
    if (initial == BannerStatusEnum.INACTIVE || !initial) {
      BannerCreateEditService.update({ status: BannerStatusEnum.INACTIVE });
      inActiveRef.current!.checked = true;
    }
  }, []);

  function onCheckBoxClick(ref: RefObject<HTMLInputElement>) {
    const checkBoxName = ref.current!.getAttribute("name");
    switch (checkBoxName) {
      case BannerStatusEnum.INACTIVE:
        ref.current!.checked = true;
        activeRef.current!.checked = false;
        BannerCreateEditService.update({ status: BannerStatusEnum.INACTIVE });
        break;
      case BannerStatusEnum.ACTIVE:
        ref.current!.checked = true;
        inActiveRef.current!.checked = false;
        BannerCreateEditService.update({ status: BannerStatusEnum.ACTIVE });
        break;
      default:
        break;
    }
  }

  return (
    <Box>
      <Title>Status</Title>
      <CheckBox onClick={() => onCheckBoxClick(inActiveRef)}>
        <input type="checkbox" name={BannerStatusEnum.INACTIVE} ref={inActiveRef} />
        <Item>Inactive</Item>
      </CheckBox>
      <CheckBox onClick={() => onCheckBoxClick(activeRef)}>
        <input type="checkbox" name={BannerStatusEnum.ACTIVE} ref={activeRef} />
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
