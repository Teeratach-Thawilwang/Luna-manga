import { darken } from "polished";

import { Link, useParams } from "react-router-dom";

import styled from "styled-components";

import CustomerProfileService from "@services/CustomerProfileService";
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
  margin-top: ${(props) => box(props).space.md};
  padding: ${(props) => box(props).space.sm} ${(props) => box(props).space.xxl};
  text-decoration: none;

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
    color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    border: 1px solid ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
    color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
