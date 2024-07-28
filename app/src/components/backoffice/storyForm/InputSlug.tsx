import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";
import { useDebounce } from "@utils/Hooks";
import { createSlug } from "@utils/StoryCreateUpdateHelpers";

export default function InputSlug() {
  const name = StoryCreateEditService.getter<string | null>("name");
  const slug = StoryCreateEditService.getter<string | null>("slug");
  const [slugInput, setSlugInput] = useState<string>(slug ? slug : "");
  const slugDebounce = useDebounce(slugInput);

  const errorMessage = StoryCreateEditService.getter<string>("slug_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    const sluged = createSlug(name);
    StoryCreateEditService.update({ slug: sluged });
    setSlugInput(sluged);
  }, [name]);

  useEffect(() => {
    StoryCreateEditService.update({ slug: slugInput });
  }, [slugDebounce]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    const sluged = createSlug(event.target.value);
    setSlugInput(sluged);
  }
  return (
    <Box>
      <Title>Slug</Title>
      <Input maxLength={50} type="text" placeholder="กรอก slug เพื่อใช้สร้าง url สำหรับ story" value={slugInput} onChange={onChangeHandle} />
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
  /* border: 0 transparent; */

  &::placeholder {
    color: #505050;
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
