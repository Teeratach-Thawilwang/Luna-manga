import { styled } from "styled-components";

import BookmarkButton from "@components/mobile/storyDetail/modal/BookmarkButton";
import StoryOptionButton from "@components/mobile/storyDetail/storyHeader/StoryOptionButton";
import { StoryInterface } from "@interfaces/StoryInterface";
import AuthService from "@services/AuthService";
import StoryService from "@services/StoryService";
import { box } from "@utils/Themes";

export default function StoryImageOptional() {
  const story = StoryService.getStory();
  const isLoggedIn = AuthService.isLogin();
  const bookmarkOptionalElement = getBookmarkOptionalElement(isLoggedIn, story);

  return (
    <Box>
      <Image src={story!.images[0].mobile} />
      <OptionalBox>{bookmarkOptionalElement}</OptionalBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  border-top-left-radius: ${(props) => box(props).space.sm};
  border-top-right-radius: ${(props) => box(props).space.sm};

  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  display: block;
  object-fit: cover;
`;

const OptionalBox = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;

  display: flex;
  justify-content: end;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
`;

const ButtonWrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: fit-content;
  width: fit-content;
  margin-top: ${(props) => box(props).space.md};

  display: flex;
  justify-content: center;
  align-items: center;

  gap: ${(props) => box(props).space.md};
`;

function getBookmarkOptionalElement(isLoggedIn: boolean, story: StoryInterface | null) {
  if (isLoggedIn == false) {
    return null;
  }
  return (
    <>
      <ButtonWrap>
        <BookmarkButton story={story!} />
      </ButtonWrap>
      <ButtonWrap>
        <StoryOptionButton />
      </ButtonWrap>
    </>
  );
}
