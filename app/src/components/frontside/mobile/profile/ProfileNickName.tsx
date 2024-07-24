import styled from "styled-components";

import ProfileService from "@services/frontside/ProfileService";
import { box, color, font } from "@utils/Themes";

export default function ProfileNickName() {
  const nickName = ProfileService.getter<string>("nick_name");
  return <Box>{nickName}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  text-align: center;
`;
