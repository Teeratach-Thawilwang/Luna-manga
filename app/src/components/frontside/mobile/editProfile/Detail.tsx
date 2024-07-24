import { useRef, useState } from "react";

import styled from "styled-components";

import BoxLoading from "@components/frontside/mobile/BoxLoading";
import Logo from "@components/frontside/mobile/Logo";
import ErrorMessage from "@components/frontside/mobile/editProfile/ErrorMessage";
import InputGroup from "@components/frontside/mobile/editProfile/InputGroup";
import InputProfileImage from "@components/frontside/mobile/editProfile/InputProfileImage";
import UpdateProfileButton from "@components/frontside/mobile/editProfile/UpdateProfileButton";
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
      <Logo />
      <Form>
        <Card>
          {isLoading ? (
            <CardLoading>
              <BoxLoading />
            </CardLoading>
          ) : null}
          <Title>แก้ไขข้อมูลส่วนตัว</Title>
          <InputProfileImage setBlob={setBlobHandle} setFile={setFileHandle} fileRef={fileRef} />
          <InputGroup />
          <ErrorMessage />
          <UpdateProfileButton blobRef={blobRef} fileRef={fileRef} setIsLoading={setIsLoadingHandle} />
        </Card>
      </Form>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: 0;
  margin-bottom: ${(props) => box(props).space.xxl};
  padding: 0 5px;

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
`;

const Card = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  padding: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerLow};

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
