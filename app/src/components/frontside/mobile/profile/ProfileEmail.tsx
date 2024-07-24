import styled from "styled-components";

import ProfileService from "@services/frontside/ProfileService";
import { box, color, font } from "@utils/Themes";

export default function ProfileEmail() {
  const email = ProfileService.getter<string>("email");
  return <Box>{email}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};
  text-align: center;
`;
