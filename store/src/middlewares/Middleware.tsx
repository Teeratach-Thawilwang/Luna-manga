import { useEffect, useState } from "react";

import { styled } from "styled-components";

import ThemeColorProvider from "@middlewares/ThemeColorProvider";
import { navigateTo } from "@utils/Helpers";

interface MiddlewareInterface {
  middleware: (() => Promise<boolean>)[];
  children: JSX.Element;
}

export default function Middleware({ middleware, children }: MiddlewareInterface) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function handle() {
      await defaultMiddleware();

      const isAllMIddlewareValid = await validateMiddleware(middleware);
      setIsValid(isAllMIddlewareValid);
    }
    handle();
  }, [children]);

  if (!isValid) {
    return (
      <ThemeColorProvider>
        <Box />
      </ThemeColorProvider>
    );
  }

  return <ThemeColorProvider>{children}</ThemeColorProvider>;
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;

async function validateMiddleware(middleware: (() => Promise<boolean>)[]) {
  let isAllMiddlewareValid = true;
  for (let i = 0; i < middleware.length; i++) {
    let isValid = await middleware[i]();
    if (!isValid) {
      isAllMiddlewareValid = false;
      break;
    }
  }
  return isAllMiddlewareValid;
}

async function defaultMiddleware() {
  await maintenanceMiddleware();
}

async function maintenanceMiddleware() {
  if (import.meta.env.VITE_MAINTENANCE_MODE == "true") {
    navigateTo("/maintenance");
  }
}
