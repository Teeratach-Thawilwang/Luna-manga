import { styled } from "styled-components";

import { BaseItem } from "@components/frontside/tablet/navbar/miniProfile/BaseItem";
import ProfileImage from "@components/frontside/tablet/navbar/miniProfile/ProfileImage";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import { box } from "@utils/Themes";

export default function ProfileButtonItem() {
  const customerProfile = CustomerProfileService.getProfile()!;

  return (
    <BaseItem to={`/profile/${customerProfile.id}`}>
      <ProfileImageBox>
        <ProfileImage />
      </ProfileImageBox>
      <Text>โปรไฟล์ของฉัน</Text>
    </BaseItem>
  );
}

const ProfileImageBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  margin: 0 ${(props) => box(props).space.sm};
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-right: ${(props) => box(props).space.sm};
`;
