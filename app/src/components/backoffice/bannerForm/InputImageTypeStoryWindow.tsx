import { useEffect } from "react";

import styled from "styled-components";

import InputImageStoryWindow1 from "@components/backoffice/bannerForm/InputImageStoryWindow1";
import InputImageStoryWindow2 from "@components/backoffice/bannerForm/InputImageStoryWindow2";
import InputImageStoryWindow3 from "@components/backoffice/bannerForm/InputImageStoryWindow3";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputImageTypeStoryWindow({ initial }: { initial?: ImageInterface[] }) {
  const errorMessage = BannerCreateEditService.getter<string>("images_error_message");
  const errorMessageElement = createErrorMessageElement(errorMessage);

  useEffect(() => {
    if (initial) {
      BannerCreateEditService.update({ images: initial });
    }
  }, []);

  return (
    <Box>
      <Title>Banner Image</Title>
      <Warp>
        <Left>
          <InputImageStoryWindow1 />
        </Left>
        <Right>
          <InputImageStoryWindow2 />
          <InputImageStoryWindow3 />
        </Right>
      </Warp>
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

const Warp = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 1000px;
  min-height: 215px;

  display: flex;
  justify-content: start;
`;

const Left = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 490px;
  height: 100%;

  :hover {
    cursor: pointer;
  }
`;

const Right = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 490px;
  height: 100%;
  margin-left: 20px;

  :hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function createErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}
