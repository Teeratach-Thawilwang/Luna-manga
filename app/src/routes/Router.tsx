import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import backoffice from "@routes/Backoffice";
import FallBack from "@routes/FallBack";
import frontside from "@routes/Frontside";

const Middleware = lazy(() => import("@middlewares/Middleware"));
const Maintenance = lazy(() => import("@pages/Maintenance"));
const NotFound404 = lazy(() => import("@pages/NotFound404"));

const router = createBrowserRouter([
  ...frontside,
  ...backoffice,
  {
    path: "*",
    element: (
      <Middleware middleware={[]}>
        <Suspense fallback={<FallBack />}>
          <NotFound404 />
        </Suspense>
      </Middleware>
    ),
  },
  {
    path: "maintenance",
    element: (
      <Middleware middleware={[]}>
        <Suspense fallback={<FallBack />}>
          <Maintenance />
        </Suspense>
      </Middleware>
    ),
  },
]);

export default router;
