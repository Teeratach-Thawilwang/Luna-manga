import { darken } from "polished";

import { Link, useParams } from "react-router-dom";

import styled from "styled-components";

import CustomerProfileService from "@services/frontside/CustomerProfileService";
import { box, color, font } from "@utils/Themes";

export default function EditProfileButton() {
  const { customerId: profileId } = useParams();
  const customerId = CustomerProfileService.getCustomerId();

  if (customerId == null || customerId != Number(profileId!)) {
    return <></>;
  }

  return <Box to="/edit-profile">แก้ไขข้อมูลโปรไฟล์</Box>;
}

const Box = styled(Link)`
  height: 40px;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.xxl};
  text-decoration: none;

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
