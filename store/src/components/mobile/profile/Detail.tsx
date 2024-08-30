import styled from "styled-components";

import BoxLoading from "@components/mobile/BoxLoading";
import Logo from "@components/mobile/Logo";
import ProfileContent from "@components/mobile/profile/ProfileContent";
import ProfilePost from "@components/mobile/profile/post/ProfilePost";
import ProfilePostService from "@services/ProfilePostService";
import ProfileService from "@services/ProfileService";
import { box } from "@utils/Themes";

export default function Detail() {
  const isProfileLoading = ProfileService.getIsLoading();
  const isProfilePostLoading = !ProfilePostService.getPostIsLoaded();

  if (isProfileLoading || isProfilePostLoading) {
    return (
      <Box>
        <Logo />
        <BoxLoading />
      </Box>
    );
  }

  return (
    <Box>
      <Logo />
      <ProfileContent />
      <ProfilePost />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: 0;
  margin-bottom: ${(props) => box(props).space.xxl};
  padding: 0 5px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;
