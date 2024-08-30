import { darken } from "polished";

import { styled } from "styled-components";

import { BaseItem } from "@components/mobile/navbar/menu/BaseItem";
import AuthService from "@services/AuthService";
import { color } from "@utils/Themes";

export default function LogoutButtonItem() {
  return (
    <Box to="" onClick={() => AuthService.logout()}>
      <Logout>ออกจากระบบ</Logout>
    </Box>
  );
}

const Box = styled(BaseItem)`
  /* border: 1px solid red; */
  margin-top: auto;
  margin-bottom: 0%;
`;

const Logout = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => darken(0.2, color(props).error)};
`;
