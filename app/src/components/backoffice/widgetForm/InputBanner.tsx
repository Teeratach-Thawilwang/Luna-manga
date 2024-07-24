import { useEffect } from "react";

import styled from "styled-components";

import BannerSearchBox from "@components/backoffice/widgetForm/BannerSearchBox";
import BannerTable from "@components/backoffice/widgetForm/BannerTable";
import { BannerListInterface } from "@interfaces/backoffice/BannerInterface";
import WidgetCreateEditService from "@services/backoffice/WidgetCreateEditService";

export default function InputBanner({ initial }: { initial?: BannerListInterface[] }) {
  useEffect(() => {
    if (initial) {
      WidgetCreateEditService.update({ banners: initial });
    }
  }, []);

  const errorMessage = WidgetCreateEditService.getter<string>("banner_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  return (
    <Box>
      <Title>Banners</Title>
      <BannerSearchBox />
      <BannerTable />
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
