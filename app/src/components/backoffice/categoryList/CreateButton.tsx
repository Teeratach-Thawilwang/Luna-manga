import { useNavigate } from "react-router-dom";

import styled from "styled-components";

export default function CreateButton() {
  const navigate = useNavigate();
  return <Box onClick={() => navigate(`/backoffice/category/create`)}>+ Create</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 50px;
  width: 125px;
  margin-left: 20px;

  font-size: 20px;
  color: #fff;
  background-color: #3ba639;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #44b642;
    cursor: pointer;
  }

  &:active {
    background-color: #349f32;
  }
`;
