import { Suspense, lazy } from "react";

import AuthMiddleware from "@middlewares/frontside/AuthMiddleware";
import GuestMiddleware from "@middlewares/frontside/GuestMiddleware";
import TokenMiddleware from "@middlewares/frontside/TokenMiddleware";
import FallBack from "@routes/FallBack";

const Middleware = lazy(() => import("@middlewares/Middleware"));
const Bookmark = lazy(() => import("@pages/frontside/Bookmark"));
const Category = lazy(() => import("@pages/frontside/Category"));
const ChapterDetail = lazy(() => import("@pages/frontside/ChapterDetail"));
const ConfirmEmail = lazy(() => import("@pages/frontside/ConfirmEmail"));
const EditProfile = lazy(() => import("@pages/frontside/EditProfile"));
const Home = lazy(() => import("@pages/frontside/Home"));
const Profile = lazy(() => import("@pages/frontside/Profile"));
const RegisterSuccessful = lazy(() => import("@pages/frontside/RegisterSuccessful"));
const ResetPassword = lazy(() => import("@pages/frontside/ResetPassword"));
const ResetPasswordEmailSent = lazy(() => import("@pages/frontside/ResetPasswordEmailSent"));
const ResetPasswordSuccessful = lazy(() => import("@pages/frontside/ResetPasswordSuccessful"));
const SomethingWentWrong = lazy(() => import("@pages/frontside/SomethingWentWrong"));
const StoryDetail = lazy(() => import("@pages/frontside/StoryDetail"));

const frontside = [
  {
    path: "/",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <Home />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/story/:slug",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <StoryDetail />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/story/:slug/:chapterNumber",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <ChapterDetail />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/category",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <Category />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/bookmark",
    element: (
      <Middleware middleware={[TokenMiddleware, AuthMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <Bookmark />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/profile/:customerId",
    element: (
      <Middleware middleware={[TokenMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <Profile />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <Middleware middleware={[TokenMiddleware, AuthMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <EditProfile />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/confirm-email",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <ConfirmEmail />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <ResetPassword />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/register-successful",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <RegisterSuccessful />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/reset-password-processing",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <ResetPasswordEmailSent />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/reset-password-successful",
    element: (
      <Middleware middleware={[TokenMiddleware, GuestMiddleware]}>
        <Suspense fallback={<FallBack />}>
          <ResetPasswordSuccessful />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "/something-went-wrong",
    element: (
      <Middleware middleware={[]}>
        <Suspense fallback={<FallBack />}>
          <SomethingWentWrong />
        </Suspense>
      </Middleware>
    ),
  },
];

export default frontside;
