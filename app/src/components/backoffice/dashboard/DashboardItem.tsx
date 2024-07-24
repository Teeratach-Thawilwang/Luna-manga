import styled from "styled-components";

import { DashboardInterface } from "@interfaces/backoffice/DashboardInterface";

export default function DashboardItem({ dashboard }: { dashboard: DashboardInterface }) {
  const left = createBottomTextElement(dashboard.left_bottom);
  const right = createBottomTextElement(dashboard.right_bottom);
  const bottom = createBottomElement(left, right);

  return (
    <Box>
      <Title>{dashboard.name}</Title>
      <Middle>{dashboard.middle}</Middle>
      {bottom}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 10px;
  width: 260px;
  height: 200px;
  margin: 20px 20px 20px 20px;

  background-color: #ffffff;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.55);
  transition: 200ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 60px;
  color: #000;
  font-size: 26px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Middle = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 70px;
  color: #000;
  font-size: 50px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomWrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  margin: 0 10px;
`;

const BottomText = styled.div`
  /* border: 1px solid red; */
  height: 70px;

  p {
    height: 30px;
    margin: 0;
    padding: 0;
    color: #000;
    font-size: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function createBottomTextElement(texts: string[]) {
  if (texts.length == 0) {
    return null;
  }
  return (
    <BottomText>
      {texts.map((text, key) => (
        <p key={key}>{text}</p>
      ))}
    </BottomText>
  );
}

function createBottomElement(left: JSX.Element | null, right: JSX.Element | null) {
  if (left == null || right == null) {
    return null;
  }
  return (
    <BottomWrap>
      {left}
      {right}
    </BottomWrap>
  );
}
