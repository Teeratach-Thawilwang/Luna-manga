import styled from "styled-components";

import AdminButton from "@components/backoffice/AdminButton";

export default function Header({ headerTitle }: { headerTitle: string }) {
  return (
    <Box>
      <Title>{headerTitle}</Title>
      <AdminButton />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 70px;

  border-bottom: 1px solid #bdbdbd;
  background-color: #ffffff;

  display: grid;
  grid-template-columns: auto 140px;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  color: #000;

  font-size: 30px;
  font-weight: bold;
  padding-left: 20px;

  display: flex;
  justify-content: start;
  align-items: center;
`;
