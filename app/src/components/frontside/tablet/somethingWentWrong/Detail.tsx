﻿import { useSearchParams } from "react-router-dom";

import styled from "styled-components";

import InfoIcon from "@components/iconSvg/InfoIcon";
import { ResponseErrorInterface } from "@interfaces/ResponseErrorInterface";
import { navigateTo } from "@utils/Helpers";
import { box, color, font } from "@utils/Themes";

export default function Detail() {
  const [URLSearchParams, _SetURLSearchParams] = useSearchParams();
  const raw = URLSearchParams.get("data");

  if (raw == null) {
    navigateTo(`/`);
    return;
  }

  const data = JSON.parse(raw) as ResponseErrorInterface;
  const messagesElement = transformMessages(data.messages);
  const isMessageEmpty = data.message == undefined || data.message == "";
  const isMessagesEmpty = data.messages == undefined || data.messages.length == 0;
  const isShowDetail = !(isMessageEmpty && isMessagesEmpty);

  return (
    <Box>
      <Card>
        <InfoIconBox>
          <InfoIcon />
        </InfoIconBox>
        <Title>Something went wrong.</Title>
        <Text>Error: {data.error}</Text>
        {isShowDetail ? (
          <>
            <Text>Detail: {data.message}</Text>
            {messagesElement}
          </>
        ) : null}
      </Card>
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

const Card = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 700px;
  padding: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoIconBox = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: ${(props) => box(props).space.sm};

  border-radius: 100%;
  border: 4px solid ${(props) => color(props).error};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size["5xl"]};
    height: ${(props) => font(props).size["5xl"]};

    path {
      stroke-width: 0px;
      fill: ${(props) => color(props).error};
    }
  }
`;

const Title = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  text-align: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  text-align: center;
`;

function transformMessages(messages: any[] | undefined) {
  return messages?.map((item, key) => {
    return <Text key={key}>{JSON.stringify(item)}</Text>;
  });
}
