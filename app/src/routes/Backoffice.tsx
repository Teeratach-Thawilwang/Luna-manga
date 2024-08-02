import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import Middleware from "@middlewares/Middleware";
import GuestMiddleware from "@middlewares/backoffice/GuestMiddleware";
import PermissionMiddleware from "@middlewares/backoffice/PermissionMiddleware";
import TokenMiddleware from "@middlewares/backoffice/TokenMiddleware";
import BannerCreate from "@pages/backoffice/BannerCreate";
import BannerDetail from "@pages/backoffice/BannerDetail";
import BannerList from "@pages/backoffice/BannerList";
import CategoryCreate from "@pages/backoffice/CategoryCreate";
import CategoryDetail from "@pages/backoffice/CategoryDetail";
import CategoryList from "@pages/backoffice/CategoryList";
import ChapterCreate from "@pages/backoffice/ChapterCreate";
import ChapterDetail from "@pages/backoffice/ChapterDetail";
import ChapterList from "@pages/backoffice/ChapterList";
import CustomerDetail from "@pages/backoffice/CustomerDetail";
import CustomerGroupCreate from "@pages/backoffice/CustomerGroupCreate";
import CustomerGroupDetail from "@pages/backoffice/CustomerGroupDetail";
import CustomerGroupList from "@pages/backoffice/CustomerGroupList";
import CustomerList from "@pages/backoffice/CustomerList";
import CustomerReportDetail from "@pages/backoffice/CustomerReportDetail";
import CustomerReportList from "@pages/backoffice/CustomerReportList";
import Dashboard from "@pages/backoffice/Dashboard";
import LogIn from "@pages/backoffice/LogIn";
import StoryCreate from "@pages/backoffice/StoryCreate";
import StoryDetail from "@pages/backoffice/StoryDetail";
import StoryList from "@pages/backoffice/StoryList";
import UserCreate from "@pages/backoffice/UserCreate";
import UserDetail from "@pages/backoffice/UserDetail";
import UserList from "@pages/backoffice/UserList";
import UserRoleCreate from "@pages/backoffice/UserRoleCreate";
import UserRoleDetail from "@pages/backoffice/UserRoleDetail";
import UserRoleList from "@pages/backoffice/UserRoleList";
import WidgetCreate from "@pages/backoffice/WidgetCreate";
import WidgetDetail from "@pages/backoffice/WidgetDetail";
import WidgetList from "@pages/backoffice/WidgetList";
import WidgetSequence from "@pages/backoffice/WidgetSequence";

const backoffice = [
  {
    path: "/login",
    element: (
      <Middleware middleware={[GuestMiddleware]}>
        <LogIn />
      </Middleware>
    ),
  },
  {
    path: "/",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Dashboard />
      </Middleware>
    ),
  },
  //--------------------- Story ---------------------//
  {
    path: "/stories/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.STORY_VIEW)]}>
        <StoryList />
      </Middleware>
    ),
  },
  {
    path: "/story/:type/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.STORY_MANGE)]}>
        <StoryCreate />
      </Middleware>
    ),
  },
  {
    path: "/story/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.STORY_VIEW)]}>
        <StoryDetail />
      </Middleware>
    ),
  },
  //--------------------- Chapter ---------------------//
  {
    path: "/chapters/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <ChapterList />
      </Middleware>
    ),
  },
  {
    path: "/chapter/:type/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_MANGE)]}>
        <ChapterCreate />
      </Middleware>
    ),
  },
  {
    path: "/chapter/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <ChapterDetail />
      </Middleware>
    ),
  },
  //--------------------- Category ---------------------//
  {
    path: "/categories",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <CategoryList />
      </Middleware>
    ),
  },
  {
    path: "/category/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_MANGE)]}>
        <CategoryCreate />
      </Middleware>
    ),
  },
  {
    path: "/category/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CATEGORY_VIEW)]}>
        <CategoryDetail />
      </Middleware>
    ),
  },
  //--------------------- Customer ---------------------//
  {
    path: "/customers",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMERS_VIEW)]}>
        <CustomerList />
      </Middleware>
    ),
  },
  {
    path: "/customer/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMERS_VIEW)]}>
        <CustomerDetail />
      </Middleware>
    ),
  },
  //--------------------- Customer-group ---------------------//
  {
    path: "/customer-groups",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_GROUPS_VIEW)]}>
        <CustomerGroupList />
      </Middleware>
    ),
  },
  {
    path: "/customer-group/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_GROUPS_MANGE)]}>
        <CustomerGroupCreate />
      </Middleware>
    ),
  },
  {
    path: "/customer-group/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_GROUPS_VIEW)]}>
        <CustomerGroupDetail />
      </Middleware>
    ),
  },
  //--------------------- User ---------------------//
  {
    path: "/users",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.USER_VIEW)]}>
        <UserList />
      </Middleware>
    ),
  },
  {
    path: "/user/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.USER_MANGE)]}>
        <UserCreate />
      </Middleware>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.USER_VIEW)]}>
        <UserDetail />
      </Middleware>
    ),
  },
  //--------------------- User Role ---------------------//
  {
    path: "/user-roles",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.ROLE_VIEW)]}>
        <UserRoleList />
      </Middleware>
    ),
  },
  {
    path: "/user-role/create",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.ROLE_MANGE)]}>
        <UserRoleCreate />
      </Middleware>
    ),
  },
  {
    path: "/user-role/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.ROLE_VIEW)]}>
        <UserRoleDetail />
      </Middleware>
    ),
  },
  //--------------------- Banner ---------------------//
  {
    path: "/banners",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.BANNER_VIEW)]}>
        <BannerList />
      </Middleware>
    ),
  },
  {
    path: "/banner/create/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.BANNER_MANGE)]}>
        <BannerCreate />
      </Middleware>
    ),
  },
  {
    path: "/banner/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.BANNER_VIEW)]}>
        <BannerDetail />
      </Middleware>
    ),
  },
  //--------------------- Widget ---------------------//
  {
    path: "/widgets",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_VIEW)]}>
        <WidgetList />
      </Middleware>
    ),
  },
  {
    path: "/widget/create/:type",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_MANGE)]}>
        <WidgetCreate />
      </Middleware>
    ),
  },
  {
    path: "/widget/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_VIEW)]}>
        <WidgetDetail />
      </Middleware>
    ),
  },
  {
    path: "/widget-sequence",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.WIDGET_VIEW)]}>
        <WidgetSequence />
      </Middleware>
    ),
  },
  //--------------------- Customer-report ---------------------//
  {
    path: "/customer-reports",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_REPORT_VIEW)]}>
        <CustomerReportList />
      </Middleware>
    ),
  },
  {
    path: "/customer-report/:id",
    element: (
      <Middleware middleware={[TokenMiddleware, () => PermissionMiddleware(PermissionEnum.CUSTOMER_REPORT_VIEW)]}>
        <CustomerReportDetail />
      </Middleware>
    ),
  },
];

backoffice.map((route) => {
  route.path = "/backoffice" + route.path;
});

export default backoffice;
