import { useEffect } from "react";

import styled from "styled-components";

import InputImageAdvertisementGroup from "@components/backoffice/bannerForm/InputImageAdvertisementGroup";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputImageTypeAdvertisementGroup({ initial }: { initial?: ImageInterface[] }) {
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
        <InputImageAdvertisementGroup />
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
  min-height: 180px;

  display: flex;
  justify-content: start;
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
