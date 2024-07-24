import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import UserCreateEditService from "@services/backoffice/UserCreateEditService";
import { useDebounce } from "@utils/Hooks";

export default function InputFirstName({ initial }: { initial?: string }) {
  const [firstName, setFirstName] = useState<string>(initial ? initial : "");
  const firstNameDebounce = useDebounce(firstName);

  const errorMessage = UserCreateEditService.getter<string>("first_name_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    UserCreateEditService.update({ first_name: firstName });
  }, [firstNameDebounce]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }
  return (
    <Box>
      <Title>First name</Title>
      <Input maxLength={50} type="text" placeholder="ชื่อจริง" value={firstName} onChange={onChangeHandle} />
      {errorMessageElement}
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
