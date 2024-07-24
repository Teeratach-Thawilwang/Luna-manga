import styled from "styled-components";

import EditProfileButton from "@components/frontside/tablet/profile/EditProfileButton";
import ProfileFullName from "@components/frontside/tablet/profile/ProfileFullName";
import ProfileImage from "@components/frontside/tablet/profile/ProfileImage";
import ProfileNickName from "@components/frontside/tablet/profile/ProfileNickName";
import { box, color } from "@utils/Themes";

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
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  padding: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
