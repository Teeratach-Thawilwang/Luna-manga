import styled from "styled-components";

import BoxLoading from "@components/frontside/tablet/BoxLoading";
import ProfileContent from "@components/frontside/tablet/profile/ProfileContent";
import ProfilePost from "@components/frontside/tablet/profile/post/ProfilePost";
import ProfilePostService from "@services/frontside/ProfilePostService";
import ProfileService from "@services/frontside/ProfileService";
import { box } from "@utils/Themes";

export default function Detail() {
  const isProfileLoading = ProfileService.getIsLoading();
  const isProfilePostLoading = !ProfilePostService.getPostIsLoaded();

  if (isProfileLoading || isProfilePostLoading) {
    return (
      <Box>
        <BoxLoading />
      </Box>
    );
  }

  return (
    <Box>
      <ProfileContent />
      <ProfilePost />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: ${(props) => box(props).space.xxl} 0;
  padding: 0 10px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;
