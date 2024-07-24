import React from "react";

import styled from "styled-components";

import AuthService from "@services/backoffice/AuthService";

export default React.memo(function AdminButtonModal(props: { isShow: boolean }) {
  // console.log("In AdminButtonModal");
  return (
    <Box $isShow={props.isShow}>
      <Item color="#ff0000" onClick={() => AuthService.logout()}>
        ออกจากระบบ
      </Item>
    </Box>
  );
});

const Box = styled.div<{ $isShow: boolean }>`
  display: ${(props) => (props.$isShow ? "block" : "none")};
  min-width: 150px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.55);

  position: absolute;
  top: 72px;
  right: -5px;

  z-index: 99;
`;

const Item = styled.div<{ color: string }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  color: ${(props) => props.color};
  font-size: 20px;
  white-space: nowrap;

  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  justify-content: start;
  align-items: center;

  &:hover {
    background-color: #e8e8e8;
    cursor: pointer;
  }

  &:active {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;
