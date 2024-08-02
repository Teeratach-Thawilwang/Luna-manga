import Middleware from "@middlewares/Middleware";
import AuthMiddleware from "@middlewares/frontside/AuthMiddleware";
import GuestMiddleware from "@middlewares/frontside/GuestMiddleware";
import TokenMiddleware from "@middlewares/frontside/TokenMiddleware";
import Bookmark from "@pages/frontside/Bookmark";
import Category from "@pages/frontside/Category";
import ChapterDetail from "@pages/frontside/ChapterDetail";
import ConfirmEmail from "@pages/frontside/ConfirmEmail";
import EditProfile from "@pages/frontside/EditProfile";
import Home from "@pages/frontside/Home";
import Profile from "@pages/frontside/Profile";
import RegisterSuccessful from "@pages/frontside/RegisterSuccessful";
import ResetPassword from "@pages/frontside/ResetPassword";
import ResetPasswordEmailSent from "@pages/frontside/ResetPasswordEmailSent";
import ResetPasswordSuccessful from "@pages/frontside/ResetPasswordSuccessful";
import SomethingWentWrong from "@pages/frontside/SomethingWentWrong";
import StoryDetail from "@pages/frontside/StoryDetail";

const frontside = [
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
];

export default frontside;
