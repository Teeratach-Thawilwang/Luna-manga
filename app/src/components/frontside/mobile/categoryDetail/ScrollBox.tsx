﻿import React, { useEffect, useRef } from "react";

import styled from "styled-components";

export default function ScrollBox({ children }: { children: JSX.Element[] }) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const activeChild = childrenArray.find((child: any) => child.props.$isActive) as React.ReactElement;
    if (activeChild && boxRef.current) {
      const activeChildIndex = childrenArray.indexOf(activeChild);
      const activeChildElement = boxRef.current.children[activeChildIndex] as HTMLElement;

      // itemLeft = activeChildElement.offsetLeft
      // itemRight = activeChildElement.offsetLeft + activeChildElement.clientWidth
      // renderBoxRight = boxRef.current.scrollLeft + boxRef.current.clientWidth

      // Expect renderBoxRight >= itemRight
      // boxRef.current.scrollLeft + boxRef.current.clientWidth >= activeChildElement.offsetLeft + activeChildElement.clientWidth
      // Then
      // boxRef.current.scrollLeft >= activeChildElement.offsetLeft + activeChildElement.clientWidth - boxRef.current.clientWidth

      // Set box scrollLeft when renderBoxRight < itemRight
      // boxRef.current.scrollLeft + boxRef.current.clientWidth < activeChildElement.offsetLeft + activeChildElement.clientWidth
      // boxRef.current.scrollLeft < activeChildElement.offsetLeft + activeChildElement.clientWidth - boxRef.current.clientWidth

      const preferOffset = 20;
      const criterion = activeChildElement.offsetLeft + activeChildElement.clientWidth - boxRef.current.clientWidth;
      if (boxRef.current.scrollLeft < criterion) {
        boxRef.current.scrollLeft = criterion + preferOffset;
      }
    }
  }, [children]);

  return <Box ref={boxRef}>{children}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;

  overflow-x: scroll;

  :first-child {
    margin-left: 0px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
