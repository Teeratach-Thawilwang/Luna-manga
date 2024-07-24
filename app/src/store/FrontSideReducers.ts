import { combineReducers } from "@reduxjs/toolkit";

import BookmarkSlice from "@store/slices/frontside/BookmarkSlice";
import CategorySlice from "@store/slices/frontside/CategorySlice";
import CategoryStorySlice from "@store/slices/frontside/CategoryStorySlice";
import ChapterCommentSlice from "@store/slices/frontside/ChapterCommentSlice";
import ChapterSlice from "@store/slices/frontside/ChapterSlice";
import CustomerProfileSlice from "@store/slices/frontside/CustomerProfileSlice";
import EditCustomerProfileSlice from "@store/slices/frontside/EditCustomerProfileSlice";
import ProfilePostSlice from "@store/slices/frontside/ProfilePostSlice";
import ProfileSlice from "@store/slices/frontside/ProfileSlice";
import SignInSignUpSlice from "@store/slices/frontside/SignInSignUpSlice";
import StoryChapterSlice from "@store/slices/frontside/StoryChapterSlice";
import StorySearchSlice from "@store/slices/frontside/StorySearchSlice";
import StorySlice from "@store/slices/frontside/StorySlice";
import ThemeSlice from "@store/slices/frontside/ThemeSlice";
import WidgetOnPageSlice from "@store/slices/frontside/WidgetOnPageSlice";
import WidgetSlice from "@store/slices/frontside/WidgetSlice";

const frontsideReducer = combineReducers({
  theme: ThemeSlice,
  widget: WidgetSlice,
  widgetOnPage: WidgetOnPageSlice,
  category: CategorySlice,
  signInSignUp: SignInSignUpSlice,
  story: StorySlice,
  storyChapter: StoryChapterSlice,
  chapter: ChapterSlice,
  chapterComment: ChapterCommentSlice,
  categoryStory: CategoryStorySlice,
  bookmark: BookmarkSlice,
  customerProfile: CustomerProfileSlice,
  editCustomerProfile: EditCustomerProfileSlice,
  profile: ProfileSlice,
  profilePost: ProfilePostSlice,
  storySearch: StorySearchSlice,
});

export default frontsideReducer;
