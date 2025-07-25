﻿import styled from "styled-components";

import EditProfileButton from "@components/frontside/mobile/profile/EditProfileButton";
import ProfileFullName from "@components/frontside/mobile/profile/ProfileFullName";
import ProfileImage from "@components/frontside/mobile/profile/ProfileImage";
import ProfileNickName from "@components/frontside/mobile/profile/ProfileNickName";

export default function ProfileContent() {
  return (
    <Box>
      <ProfileImage />
      <ProfileNickName />
      <ProfileFullName />
      <EditProfileButton />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
