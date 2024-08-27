import styled from "styled-components";

import BookmarkButton from "@components/frontside/tablet/storyDetail/modal/BookmarkButton";
import StoryHeaderDescription from "@components/frontside/tablet/storyDetail/storyHeader/StoryHeaderDescription";
import StoryHeaderRatingViewCount from "@components/frontside/tablet/storyDetail/storyHeader/StoryHeaderRatingViewCount";
import StoryOptionButton from "@components/frontside/tablet/storyDetail/storyHeader/StoryOptionButton";
import { StoryInterface } from "@interfaces/frontside/StoryInterface";
import AuthService from "@services/frontside/AuthService";
import StoryService from "@services/frontside/StoryService";
import { box, color, font } from "@utils/Themes";

export default function StoryDetailHeader() {
  // console.log("In StoryDetailHeader");
  const story = StoryService.getStory();
  const isLoggedIn = AuthService.isLogin();
  const bookmarkOptionalElement = getBookmarkOptionalElement(isLoggedIn, story);

  return (
    <Box>
      <Image src={story!.images[0].desktop} />
      <Container>
        <TitleBox>
          <Title>{story!.name}</Title>
          {bookmarkOptionalElement}
        </TitleBox>
        <Author>ผู้แต่ง: {story!.author.display_name}</Author>
        <StoryHeaderRatingViewCount ratingScore={story!.reaction.rating_score} viewCount={story!.view_count} />
        <StoryHeaderDescription {...story!} />
      </Container>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  min-height: 100px;
  margin-top: ${(props) => box(props).space.xxl};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: 400px;

  object-fit: cover;
`;

const Container = styled.div`
  /* box-sizing: border-box; */
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).space.sm};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  position: relative;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  height: 100%;
  padding: 0 ${(props) => box(props).space.sm};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  word-wrap: break-word;
  text-align: center;
`;

const BookmarkButtonWrap = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  height: 50px;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 50px;
`;

const OptionButtonWrap = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  height: 50px;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
`;

const Author = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};
`;

function getBookmarkOptionalElement(isLoggedIn: boolean, story: StoryInterface | null) {
  if (isLoggedIn == false) {
    return null;
  }
  return (
    <>
      <BookmarkButtonWrap>
        <BookmarkButton story={story!} />
      </BookmarkButtonWrap>
      <OptionButtonWrap>
        <StoryOptionButton />
      </OptionButtonWrap>
    </>
  );
}
