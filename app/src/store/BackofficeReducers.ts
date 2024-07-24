import { combineReducers } from "@reduxjs/toolkit";

import BannerCreateEditSlice from "@store/slices/backoffice/BannerCreateEditSlice";
import BannerListSlice from "@store/slices/backoffice/BannerListSlice";
import BannerSlice from "@store/slices/backoffice/BannerSlice";
import CategoryCreateEditSlice from "@store/slices/backoffice/CategoryCreateEditSlice";
import CategoryListSlice from "@store/slices/backoffice/CategoryListSlice";
import CategorySlice from "@store/slices/backoffice/CategorySlice";
import ChapterCreateEditSlice from "@store/slices/backoffice/ChapterCreateEditSlice";
import ChapterListSlice from "@store/slices/backoffice/ChapterListSlice";
import ChapterSlice from "@store/slices/backoffice/ChapterSlice";
import CustomerEditSlice from "@store/slices/backoffice/CustomerEditSlice";
import CustomerGroupCreateEditSlice from "@store/slices/backoffice/CustomerGroupCreateEditSlice";
import CustomerGroupListSlice from "@store/slices/backoffice/CustomerGroupListSlice";
import CustomerGroupSlice from "@store/slices/backoffice/CustomerGroupSlice";
import CustomerListSlice from "@store/slices/backoffice/CustomerListSlice";
import CustomerReportListSlice from "@store/slices/backoffice/CustomerReportListSlice";
import CustomerReportSlice from "@store/slices/backoffice/CustomerReportSlice";
import CustomerSlice from "@store/slices/backoffice/CustomerSlice";
import DashboardSlice from "@store/slices/backoffice/DashboardSlice";
import PermissionListSlice from "@store/slices/backoffice/PermissionListSlice";
import SignInSlice from "@store/slices/backoffice/SignInSlice";
import StoryCreateEditSlice from "@store/slices/backoffice/StoryCreateEditSlice";
import StoryListSlice from "@store/slices/backoffice/StoryListSlice";
import StorySlice from "@store/slices/backoffice/StorySlice";
import ThemeSlice from "@store/slices/backoffice/ThemeSlice";
import UserCreateEditSlice from "@store/slices/backoffice/UserCreateEditSlice";
import UserListSlice from "@store/slices/backoffice/UserListSlice";
import UserProfileSlice from "@store/slices/backoffice/UserProfileSlice";
import UserRoleCreateEditSlice from "@store/slices/backoffice/UserRoleCreateEditSlice";
import UserRoleListSlice from "@store/slices/backoffice/UserRoleListSlice";
import UserRoleSlice from "@store/slices/backoffice/UserRoleSlice";
import UserSlice from "@store/slices/backoffice/UserSlice";
import WidgetCreateEditSlice from "@store/slices/backoffice/WidgetCreateEditSlice";
import WidgetListSlice from "@store/slices/backoffice/WidgetListSlice";
import WidgetSequenceSlice from "@store/slices/backoffice/WidgetSequenceSlice";
import WidgetSlice from "@store/slices/backoffice/WidgetSlice";

const backofficeReducer = combineReducers({
  theme: ThemeSlice,

  userProfile: UserProfileSlice,
  signIn: SignInSlice,
  dashboard: DashboardSlice,

  storyList: StoryListSlice,
  story: StorySlice,
  storyCreateEdit: StoryCreateEditSlice,

  categoryList: CategoryListSlice,
  category: CategorySlice,
  categoryCreateEdit: CategoryCreateEditSlice,

  chapterList: ChapterListSlice,
  chapter: ChapterSlice,
  chapterCreateEdit: ChapterCreateEditSlice,

  customerList: CustomerListSlice,
  customer: CustomerSlice,
  customerEdit: CustomerEditSlice,

  customerGroupList: CustomerGroupListSlice,
  customerGroup: CustomerGroupSlice,
  customerGroupCreateEdit: CustomerGroupCreateEditSlice,

  userList: UserListSlice,
  user: UserSlice,
  userCreateEdit: UserCreateEditSlice,

  permissionList: PermissionListSlice,
  userRoleList: UserRoleListSlice,
  userRole: UserRoleSlice,
  userRoleCreateEdit: UserRoleCreateEditSlice,

  bannerList: BannerListSlice,
  banner: BannerSlice,
  bannerCreateEdit: BannerCreateEditSlice,

  widgetList: WidgetListSlice,
  widget: WidgetSlice,
  widgetCreateEdit: WidgetCreateEditSlice,
  widgetSequence: WidgetSequenceSlice,

  customerReportList: CustomerReportListSlice,
  customerReport: CustomerReportSlice,
});

export default backofficeReducer;
