import styled from "styled-components";

import EditCustomerProfileService from "@services/frontside/EditCustomerProfileService";
import { box, color } from "@utils/Themes";

export default function ErrorMessage() {
  const editProfileError = EditCustomerProfileService.getter<string>("editProfileError");
  if (editProfileError.length == 0) {
    return <></>;
  }
  return <Box>{editProfileError}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};
  padding: 0;

  color: ${(props) => color(props).error};
  text-align: center;
`;
