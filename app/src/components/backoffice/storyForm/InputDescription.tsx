import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";
import { useDebounce } from "@utils/Hooks";

export default function InputDescription({ initial }: { initial?: string }) {
  const [description, setDescription] = useState<string>(initial ? initial : "");
  const descriptionDebounce = useDebounce(description);

  const errorMessage = StoryCreateEditService.getter<string>("description_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    StoryCreateEditService.update({ description: description });
  }, [descriptionDebounce]);

  function onChangeHandle(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value != "") {
      setDescription(event.target.value);
    }
  }

  function autoHeight(event: any) {
    event.target.style.height = "200px";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  return (
    <Box>
      <Title>Description</Title>
      <TextArea
        maxLength={2000}
        placeholder="maximum 2000 characters"
        onChange={onChangeHandle}
        onInput={(e) => autoHeight(e)}
        value={description}
        data-gramm="false"
      />
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
  font-size: 20px;
  font-weight: 500;
  color: #505050;

  display: flex;
  align-items: center;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 200px;
  max-height: 400px;
  resize: none;
  overflow-y: auto;

  font-size: 18px;
  font-family: Segoe UI;
  color: #000000;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);

  border-radius: 5px;
  padding: 20px 17px 20px 20px;

  outline: none;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::placeholder {
    color: #505050;
    position: absolute;
    top: 20px;
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
