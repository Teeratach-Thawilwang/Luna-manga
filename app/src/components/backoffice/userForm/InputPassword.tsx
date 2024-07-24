import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import UserCreateEditService from "@services/backoffice/UserCreateEditService";
import { useDebounce } from "@utils/Hooks";

export default function InputPassword({ initial }: { initial?: string }) {
  const [password, setPassword] = useState<string>(initial ? initial : "");
  const [isShow, setIsShow] = useState(false);
  const passwordDebounce = useDebounce(password);

  const errorMessage = UserCreateEditService.getter<string>("password_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    UserCreateEditService.update({ password: password });
  }, [passwordDebounce]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <Box>
      <Title> password</Title>
      <Input maxLength={50} type={isShow ? "text" : "password"} placeholder="รหัสผ่าน" value={password} onChange={onChangeHandle} />
      <ShowPassword onClick={() => setIsShow((prev) => !prev)}>{isShow ? "Show" : "Hide"}</ShowPassword>
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;

  position: relative;
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

const ShowPassword = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 60px;
  height: 48px;
  font-weight: 500;
  font-size: 16px;
  color: #505050;
  background-color: #fff;

  border-radius: 5px;

  position: absolute;
  top: 51px;
  right: 1px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  font-family: Segoe UI;
  font-size: 18px;
  color: #000000;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);

  border-radius: 5px;
  padding-left: 20px;

  outline: none;

  &::placeholder {
    color: #505050;
  }

  &:focus-within {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
`;

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}
