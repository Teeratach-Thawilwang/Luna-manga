import { createBrowserRouter } from "react-router-dom";

import AuthMiddleware from "@middlewares/AuthMiddleware";
import GuestMiddleware from "@middlewares/GuestMiddleware";
import Middleware from "@middlewares/Middleware";
import TokenMiddleware from "@middlewares/TokenMiddleware";
import Bookmark from "@pages/Bookmark";
import Category from "@pages/Category";
import ChapterDetail from "@pages/ChapterDetail";
import ConfirmEmail from "@pages/ConfirmEmail";
import EditProfile from "@pages/EditProfile";
import Home from "@pages/Home";
import Maintenance from "@pages/Maintenance";
import NotFound404 from "@pages/NotFound404";
import Profile from "@pages/Profile";
import RegisterSuccessful from "@pages/RegisterSuccessful";
import ResetPassword from "@pages/ResetPassword";
import ResetPasswordEmailSent from "@pages/ResetPasswordEmailSent";
import ResetPasswordSuccessful from "@pages/ResetPasswordSuccessful";
import SomethingWentWrong from "@pages/SomethingWentWrong";
import StoryDetail from "@pages/StoryDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Home />
      </Middleware>
    ),
  },
  {
    path: "/story/:slug",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <StoryDetail />
      </Middleware>
    ),
  },
  {
    path: "/story/:slug/:chapterNumber",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <ChapterDetail />
      </Middleware>
    ),
  },
  {
    path: "/category",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Category />
      </Middleware>
    ),
  },
  {
    path: "/bookmark",
    element: (
      <Middleware middleware={[TokenMiddleware, AuthMiddleware]}>
        <Bookmark />
      </Middleware>
    ),
  },
  {
    path: "/profile/:customerId",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Profile />
      </Middleware>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <Middleware middleware={[TokenMiddleware, AuthMiddleware]}>
        <EditProfile />
      </Middleware>
    ),
  },
  {
    path: "/confirm-email",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <ConfirmEmail />
      </Middleware>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <ResetPassword />
      </Middleware>
    ),
  },
  {
    path: "/register-successful",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <RegisterSuccessful />
      </Middleware>
    ),
  },
  {
    path: "/reset-password-processing",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <ResetPasswordEmailSent />
      </Middleware>
    ),
  },
  {
    path: "/reset-password-successful",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <ResetPasswordSuccessful />
      </Middleware>
    ),
  },
  {
    path: "/something-went-wrong",
    element: (
      <Middleware middleware={[]}>
        <SomethingWentWrong />
      </Middleware>
    ),
  },
  {
    path: "*",
    element: (
      <Middleware middleware={[]}>
        <NotFound404 />
      </Middleware>
    ),
  },
  {
    path: "maintenance",
    element: (
      <Middleware middleware={[]}>
        <Maintenance />
      </Middleware>
    ),
  },
]);

export default router;
