import { useRef, useState } from "react";

import styled from "styled-components";

import BoxLoading from "@components/frontside/tablet/BoxLoading";
import InputGroup from "@components/frontside/tablet/editProfile/InputGroup";
import InputProfileImage from "@components/frontside/tablet/editProfile/InputProfileImage";
import UpdateProfileButton from "@components/frontside/tablet/editProfile/UpdateProfileButton";
import { box, color, font } from "@utils/Themes";

export default function Detail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const blobRef = useRef<Blob | null>(null);
  const fileRef = useRef<File | null>(null);

  function setBlobHandle(blob: Blob) {
    blobRef.current = blob;
  }

  function setFileHandle(file: File) {
    fileRef.current = file;
  }

  function setIsLoadingHandle(value: boolean) {
    setIsLoading(value);
  }

  return (
    <Box>
      <Form>
        <Card>
          {isLoading && (
            <CardLoading>
              <BoxLoading />
            </CardLoading>
          )}
          <Title>แก้ไขข้อมูลส่วนตัว</Title>
          <InputProfileImage setBlob={setBlobHandle} setFile={setFileHandle} fileRef={fileRef} />
          <InputGroup />
        </Card>
        <UpdateButtonBox>
          <UpdateProfileButton blobRef={blobRef} fileRef={fileRef} setIsLoading={setIsLoadingHandle} />
        </UpdateButtonBox>
      </Form>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: ${(props) => box(props).space.xxl} 0;
  padding: 0 10px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 700px;
`;

const Card = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  padding: ${(props) => box(props).space.xl} ${(props) => box(props).space.xxl};

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const CardLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: ${(props) => box(props).space.xl} ${(props) => box(props).space.xxl};

  border-radius: ${(props) => box(props).borderRadius.md};
  background-color: ${(props) => color(props).surfaceContainer};

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: ${(props) => box(props).zIndex.dropdown};
  opacity: 0.7;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.md};
  text-align: center;
`;

const UpdateButtonBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: ${(props) => box(props).space.lg};

  display: flex;
  justify-content: end;
  align-items: center;
`;
