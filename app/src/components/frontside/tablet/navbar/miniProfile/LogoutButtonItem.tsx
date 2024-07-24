import { darken } from "polished";

import { styled } from "styled-components";

import { BaseItem } from "@components/frontside/tablet/navbar/miniProfile/BaseItem";
import AuthService from "@services/frontside/AuthService";
import { color } from "@utils/Themes";

export default function LogoutButtonItem() {
  return (
    <BaseItem to="" onClick={() => AuthService.logout()}>
      <Logout>ออกจากระบบ</Logout>
    </BaseItem>
  );
}

const Logout = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => darken(0.2, color(props).error)};
`;
