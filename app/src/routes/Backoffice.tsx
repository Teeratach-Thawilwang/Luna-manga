import { Suspense, lazy } from "react";

import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import GuestMiddleware from "@middlewares/backoffice/GuestMiddleware";
import PermissionMiddleware from "@middlewares/backoffice/PermissionMiddleware";
import TokenMiddleware from "@middlewares/backoffice/TokenMiddleware";
import FallBack from "@routes/FallBack";

const Middleware = lazy(() => import("@middlewares/Middleware"));
const BannerCreate = lazy(() => import("@pages/backoffice/BannerCreate"));
const BannerDetail = lazy(() => import("@pages/backoffice/BannerDetail"));
const BannerList = lazy(() => import("@pages/backoffice/BannerList"));
const CategoryCreate = lazy(() => import("@pages/backoffice/CategoryCreate"));
const CategoryDetail = lazy(() => import("@pages/backoffice/CategoryDetail"));
const CategoryList = lazy(() => import("@pages/backoffice/CategoryList"));
const ChapterCreate = lazy(() => import("@pages/backoffice/ChapterCreate"));
const ChapterDetail = lazy(() => import("@pages/backoffice/ChapterDetail"));
const ChapterList = lazy(() => import("@pages/backoffice/ChapterList"));
const CustomerDetail = lazy(() => import("@pages/backoffice/CustomerDetail"));
const CustomerGroupCreate = lazy(() => import("@pages/backoffice/CustomerGroupCreate"));
const CustomerGroupDetail = lazy(() => import("@pages/backoffice/CustomerGroupDetail"));
const CustomerGroupList = lazy(() => import("@pages/backoffice/CustomerGroupList"));
const CustomerList = lazy(() => import("@pages/backoffice/CustomerList"));
const CustomerReportDetail = lazy(() => import("@pages/backoffice/CustomerReportDetail"));
const CustomerReportList = lazy(() => import("@pages/backoffice/CustomerReportList"));
const Dashboard = lazy(() => import("@pages/backoffice/Dashboard"));
const LogIn = lazy(() => import("@pages/backoffice/LogIn"));
const StoryCreate = lazy(() => import("@pages/backoffice/StoryCreate"));
const StoryDetail = lazy(() => import("@pages/backoffice/StoryDetail"));
const StoryList = lazy(() => import("@pages/backoffice/StoryList"));
const UserCreate = lazy(() => import("@pages/backoffice/UserCreate"));
const UserDetail = lazy(() => import("@pages/backoffice/UserDetail"));
const UserList = lazy(() => import("@pages/backoffice/UserList"));
const UserRoleCreate = lazy(() => import("@pages/backoffice/UserRoleCreate"));
const UserRoleDetail = lazy(() => import("@pages/backoffice/UserRoleDetail"));
const UserRoleList = lazy(() => import("@pages/backoffice/UserRoleList"));
const WidgetCreate = lazy(() => import("@pages/backoffice/WidgetCreate"));
const WidgetDetail = lazy(() => import("@pages/backoffice/WidgetDetail"));
const WidgetList = lazy(() => import("@pages/backoffice/WidgetList"));
const WidgetSequence = lazy(() => import("@pages/backoffice/WidgetSequence"));

const backoffice = [
  {
    path: "/login",
    element: (
      <Middleware middleware={[GuestMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <LogIn />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <Dashboard />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Story ---------------------//
  {
    path: "/stories/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.STORY_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <StoryList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/story/:type/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.STORY_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <StoryCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/story/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.STORY_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <StoryDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Chapter ---------------------//
  {
    path: "/chapters/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <ChapterList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/chapter/:type/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <ChapterCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/chapter/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <ChapterDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Category ---------------------//
  {
    path: "/categories",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CategoryList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/category/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <CategoryCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/category/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CategoryDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Customer ---------------------//
  {
    path: "/customers",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMERS_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/customer/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMERS_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Customer-group ---------------------//
  {
    path: "/customer-groups",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_GROUPS_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerGroupList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/customer-group/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_GROUPS_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerGroupCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/customer-group/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_GROUPS_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerGroupDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- User ---------------------//
  {
    path: "/users",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.USER_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <UserList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/user/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.USER_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <UserCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.USER_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <UserDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- User Role ---------------------//
  {
    path: "/user-roles",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.ROLE_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <UserRoleList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/user-role/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.ROLE_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <UserRoleCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/user-role/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.ROLE_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <UserRoleDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Banner ---------------------//
  {
    path: "/banners",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.BANNER_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <BannerList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/banner/create/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.BANNER_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <BannerCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/banner/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.BANNER_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <BannerDetail />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Widget ---------------------//
  {
    path: "/widgets",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <WidgetList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/widget/create/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_MANGE)]}>
        <Suspense fallback={<FallBack />}>
          <WidgetCreate />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/widget/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <WidgetDetail />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/widget-sequence",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <WidgetSequence />
        </Suspense>
      </Middleware>
    ),
  },
  //--------------------- Customer-report ---------------------//
  {
    path: "/customer-reports",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_REPORT_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerReportList />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/customer-report/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_REPORT_VIEW)]}>
        <Suspense fallback={<FallBack />}>
          <CustomerReportDetail />
        </Suspense>
      </Middleware>
    ),
  },
];

backoffice.map((route) => {
  route.path = "/backoffice" + route.path;
});

export default backoffice;
