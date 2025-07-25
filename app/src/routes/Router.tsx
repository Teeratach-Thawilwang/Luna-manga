import { createBrowserRouter } from "react-router-dom";

import Middleware from "@middlewares/Middleware";
import Maintenance from "@pages/Maintenance";
import NotFound404 from "@pages/NotFound404";
import backoffice from "@routes/Backoffice";
import frontside from "@routes/Frontside";

const router = createBrowserRouter([
  ...frontside,
  ...backoffice,
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
