import React, { useEffect, useState } from "react";

import styled from "styled-components";

import CustomFade from "@components/backoffice/CustomFade";

export default React.memo(function CenterModal({ isShow, setShow, children }: { isShow: boolean; setShow: (value: boolean) => void; children: any }) {
  // console.log("In CenterModal", isShow);
  const [localState, setLocalState] = useState<number>(0);

  useEffect(() => {
    if (localState != 0) {
      setShow(false);
    }
  }, [localState]);

  return (
    <CustomFade in={isShow} timeout={100}>
      <Plane onClick={() => setLocalState((prev) => prev + 1)}>
        <Box onClick={() => setLocalState((prev) => prev - 1)}>{children}</Box>
      </Plane>
    </CustomFade>
  );
});

const Plane = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Box = styled.div`
  border: 0;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
