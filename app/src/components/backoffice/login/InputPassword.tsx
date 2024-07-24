import React from "react";

import styled from "styled-components";

import SignInService from "@services/backoffice/SignInService";

export default function InputPassword() {
  const password = SignInService.getter<string>("password");

  return (
    <Input
      name="password"
      type="password"
      placeholder=" รหัสผ่าน"
      value={password ?? undefined}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => SignInService.update({ [e.target.name]: e.target.value })}
    />
  );
}

const Input = styled.input`
  width: 285px;
  height: 25px;
  margin: 0 20px 20px 20px;
  padding: 0;
  outline: none;

  border: 0 transparent;
  border-radius: 0;
  border-bottom: 1px solid #000;

  color: #000;
  background-color: #fff;
  background-clip: text;
  -webkit-text-fill-color: #000000;

  font-size: 18px;
  font-weight: normal;
  /* font-family: Kanit; */

  &::placeholder {
    color: #787878;
    -webkit-text-fill-color: #787878;
  }
`;
