import { useEffect, useState } from "react";

import styled from "styled-components";

import MangaEditor from "@components/backoffice/mangaEditor/MangaEditor";
import { MangaEditorElement } from "@interfaces/EditorInterface";
import ChapterCreateEditService from "@services/backoffice/ChapterCreateEditService";
import { useDebounce } from "@utils/Hooks";

export default function InputImageEditor({ initial }: { initial?: MangaEditorElement[] }) {
  const [nodes, setNodes] = useState<MangaEditorElement[]>(initial ? initial : []);
  const dataDebounce = useDebounce(nodes, 500);

  const errorMessage = ChapterCreateEditService.getter<string>("manga_editor_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    ChapterCreateEditService.update({ manga_editor: dataDebounce });
  }, [dataDebounce]);

  return (
    <Box>
      <Title>Images</Title>
      <MangaEditor nodes={nodes} setNodes={setNodes} />
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
