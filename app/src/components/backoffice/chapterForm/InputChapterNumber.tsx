import { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import ChapterCreateEditService from "@services/backoffice/ChapterCreateEditService";
import { useDebounce } from "@utils/Hooks";

export default function InputChapterNumber({ initial }: { initial?: number }) {
  const [chapterNumber, setChapterNumber] = useState<String | null>(initial ? String(initial) : null);
  const nameDebounce = useDebounce(chapterNumber);

  const errorMessage = ChapterCreateEditService.getter<string>("chapter_number_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    if (chapterNumber == null) {
      ChapterCreateEditService.update({ chapter_number: null });
      return;
    }
    const value = chapterNumber.length == 0 ? null : Number(chapterNumber);
    ChapterCreateEditService.update({ chapter_number: value });
  }, [nameDebounce]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    let input = event.target.value;
    const isValidInput = /^\d*\.?\d*$/.test(input);
    if (isValidInput) {
      setChapterNumber(input.length == 0 ? null : input);
      return;
    }
    input = input.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
    event.target.value = input;
  }
  return (
    <Box>
      <Title>Chapter Number</Title>
      <Input
        maxLength={15}
        type="text"
        placeholder="กรอกตัวเลขจำนวนเต็มหรือทศนิยมไม่เกิน 15 ตัวอักษร"
        value={chapterNumber == null ? "" : String(chapterNumber)}
        onChange={onChangeHandle}
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
