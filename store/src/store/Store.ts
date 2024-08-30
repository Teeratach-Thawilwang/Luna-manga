import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import BookmarkSlice from "@store/slices/BookmarkSlice";
import CategorySlice from "@store/slices/CategorySlice";
import CategoryStorySlice from "@store/slices/CategoryStorySlice";
import ChapterCommentSlice from "@store/slices/ChapterCommentSlice";
import ChapterSlice from "@store/slices/ChapterSlice";
import CustomerProfileSlice from "@store/slices/CustomerProfileSlice";
import EditCustomerProfileSlice from "@store/slices/EditCustomerProfileSlice";
import ProfilePostSlice from "@store/slices/ProfilePostSlice";
import ProfileSlice from "@store/slices/ProfileSlice";
import SignInSignUpSlice from "@store/slices/SignInSignUpSlice";
import StoryChapterSlice from "@store/slices/StoryChapterSlice";
import StorySearchSlice from "@store/slices/StorySearchSlice";
import StorySlice from "@store/slices/StorySlice";
import ThemeSlice from "@store/slices/ThemeSlice";
import WidgetOnPageSlice from "@store/slices/WidgetOnPageSlice";
import WidgetSlice from "@store/slices/WidgetSlice";

const store = configureStore({
  reducer: {
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== "production",
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispathType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispathType>();

export default store;
