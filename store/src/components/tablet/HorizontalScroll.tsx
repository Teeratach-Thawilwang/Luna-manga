import React, { MouseEvent, MutableRefObject, useEffect, useRef, useState } from "react";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import ExpandRightIcon from "@components/iconSvg/ExpandRightIcon";
import { box, color, font } from "@utils/Themes";

export default React.memo(function HorizontalScroll({ children }: { children: JSX.Element[] }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const buttonLeftRef = useRef<HTMLDivElement | null>(null);
  const buttonRightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const activeChild = childrenArray.find((child: any) => child.props.$isActive) as React.ReactElement;
    if (activeChild && boxRef.current) {
      const activeChildIndex = childrenArray.indexOf(activeChild);
      const activeChildElement = boxRef.current.children[activeChildIndex] as HTMLElement;

      // itemLeft = activeChildElement.offsetLeft
      // itemRight = activeChildElement.offsetLeft + activeChildElement.clientWidth
      // renderBoxLeft = boxRef.current.scrollLeft
      // renderBoxRight = boxRef.current.scrollLeft + boxRef.current.clientWidth

      // Case 1:  Expect renderBoxRight >= itemRight
      // boxRef.current.scrollLeft + boxRef.current.clientWidth >= activeChildElement.offsetLeft + activeChildElement.clientWidth
      // Then
      // boxRef.current.scrollLeft >= activeChildElement.offsetLeft + activeChildElement.clientWidth - boxRef.current.clientWidth

      // Set box scrollLeft when renderBoxRight < itemRight
      // boxRef.current.scrollLeft + boxRef.current.clientWidth < activeChildElement.offsetLeft + activeChildElement.clientWidth
      // boxRef.current.scrollLeft < activeChildElement.offsetLeft + activeChildElement.clientWidth - boxRef.current.clientWidth

      // Case 2:  Expect renderBoxLeft <= itemLeft
      // boxRef.current.scrollLeft <= activeChildElement.offsetLeft

      // Set box scrollLeft when renderBoxLeft > itemLeft
      // boxRef.current.scrollLeft > activeChildElement.offsetLeft

      const preferOffset = 100;
      let criterion = activeChildElement.offsetLeft + activeChildElement.clientWidth - boxRef.current.clientWidth;
      if (boxRef.current.scrollLeft < criterion) {
        boxRef.current.scrollLeft = criterion + preferOffset;
      }

      criterion = activeChildElement.offsetLeft;
      if (boxRef.current.scrollLeft > criterion) {
        boxRef.current.scrollLeft = criterion - preferOffset;
      }
    }
  }, [children]);

  function handleStart(event: MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    setIsDragging(true);
    const xPosition = getXPosition(event, boxRef);
    setStartX(xPosition);
    setScrollLeft(boxRef.current?.scrollLeft ?? 0);
  }

  function onClick(direction: "left" | "right") {
    let nextScrollX = 0;
    const step = 200;
    const currentScrollX = boxRef.current!.scrollLeft;
    const scrollWidth = boxRef.current!.scrollWidth - boxRef.current!.clientWidth;
    boxRef.current!.style.scrollBehavior = "smooth";

    if (direction === "left") {
      nextScrollX = currentScrollX - step;
    }
    if (direction === "right") {
      nextScrollX = currentScrollX + step;
    }

    if (nextScrollX <= 0) {
      buttonLeftRef.current!.style.display = "none";
      buttonRightRef.current!.style.display = "flex";
    }
    if (nextScrollX >= scrollWidth) {
      buttonLeftRef.current!.style.display = "flex";
      buttonRightRef.current!.style.display = "none";
    }

    if (nextScrollX > 0) {
      buttonLeftRef.current!.style.display = "flex";
    }

    if (nextScrollX < scrollWidth) {
      buttonRightRef.current!.style.display = "flex";
    }

    boxRef.current!.scrollLeft = nextScrollX;

    boxRef.current!.style.scrollBehavior = "auto";
  }

  useEffect(() => {
    function handleMove(event: MouseEvent<HTMLDivElement> | TouchEvent) {
      if (!isDragging) return;

      const x = getXPosition(event, boxRef);
      const walk = x - startX;
      if (boxRef.current) {
        boxRef.current.scrollLeft = scrollLeft - walk;
      }

      const currentScrollX = boxRef.current!.scrollLeft;
      const scrollWidth = boxRef.current!.scrollWidth - boxRef.current!.clientWidth;

      if (currentScrollX == 0) {
        buttonLeftRef.current!.style.display = "none";
      } else {
        buttonLeftRef.current!.style.display = "flex";
      }

      if (currentScrollX == scrollWidth) {
        buttonRightRef.current!.style.display = "none";
      } else {
        buttonRightRef.current!.style.display = "flex";
      }
    }

    document.addEventListener("mousemove", handleMove as any);
    document.addEventListener("mouseup", () => setIsDragging(false));

    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", () => setIsDragging(false));

    return () => {
      document.removeEventListener("mousemove", handleMove as any);
      document.removeEventListener("mouseup", () => setIsDragging(false));

      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <Box>
      <ButtonLeft ref={buttonLeftRef} onClick={() => onClick("left")}>
        <ExpandLeftIcon />
      </ButtonLeft>
      <Container ref={boxRef} onMouseDown={handleStart} onTouchStart={handleStart}>
        {children}
      </Container>
      <ButtonRight ref={buttonRightRef} onClick={() => onClick("right")}>
        <ExpandRightIcon />
      </ButtonRight>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  position: relative;
`;

const Container = styled.div`
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

const BaseButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;

  aspect-ratio: 1;
  background-color: ${(props) => color(props).surface};

  display: none;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: ${(props) => font(props).size["4xl"]};
    height: ${(props) => font(props).size["4xl"]};

    box-shadow: inset 0 0 0 1px ${(props) => color(props).outlineVariant};
    border-radius: ${(props) => box(props).borderRadius.full};
    background-color: ${(props) => color(props).surface};
    aspect-ratio: 1;

    path {
      stroke: ${(props) => color(props).primary};
      stroke-width: 2px;
    }
  }

  &:hover {
    svg {
      box-shadow: inset 0 0 0 1px ${(props) => color(props).primary};
      background-color: ${(props) => color(props).surfaceContainer};
    }
  }
`;

const ButtonLeft = styled(BaseButton)`
  border-top-right-radius: ${(props) => box(props).borderRadius.full};
  border-bottom-right-radius: ${(props) => box(props).borderRadius.full};

  /* box-shadow: 5px 0 10px 0px ${(props) => color(props).surface}; */
  /* border-right: 1px solid ${(props) => color(props).primary}; */

  position: absolute;
  top: 0;
  left: 0px;
`;

const ButtonRight = styled(BaseButton)`
  border-top-left-radius: ${(props) => box(props).borderRadius.full};
  border-bottom-left-radius: ${(props) => box(props).borderRadius.full};

  /* box-shadow: -5px 0 10px 0px ${(props) => color(props).surface}; */
  /* border-left: 1px solid ${(props) => color(props).primary}; */

  display: flex;

  position: absolute;
  top: 0;
  right: 0px;
`;

function getXPosition(
  event: MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | TouchEvent,
  boxRef: MutableRefObject<HTMLDivElement | null>,
) {
  if ("pageX" in event) {
    return event.pageX - boxRef.current!.offsetLeft;
  }

  return event.touches[0].pageX - boxRef.current!.offsetLeft;
}
