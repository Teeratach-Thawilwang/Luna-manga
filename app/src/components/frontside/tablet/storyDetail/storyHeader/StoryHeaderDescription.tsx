import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import { StoryInterface } from "@interfaces/frontside/StoryInterface";
import { box, color, font } from "@utils/Themes";

export default React.memo(function StoryHeaderDescription(story: StoryInterface) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("80px");
  const isLongDescription = story.description.length > 200;
  const [isFull, setIsFull] = useState(!isLongDescription);

  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setMaxHeight(isFull ? `${height}px` : "80px");
    }
  }, [isFull, story.description]);

  return (
    <Box onClick={() => (isLongDescription ? setIsFull((prev) => !prev) : null)}>
      <Description ref={descriptionRef} $maxHeight={maxHeight}>
        &ensp;&ensp;&ensp;&ensp;{story?.description}
      </Description>
      {isLongDescription ? <Button $isFull={isFull}>{isFull ? "ดูน้อยลง" : "ดูเพิ่มเติม"}</Button> : null}
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin-top: ${(props) => box(props).space.lg};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div<{ $maxHeight: string }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  padding: 0 ${(props) => box(props).space.md};
  padding-bottom: ${(props) => box(props).space.sm};
  max-height: ${(props) => props.$maxHeight};

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
  white-space: normal;
  word-wrap: break-word;

  overflow-y: hidden;
  user-select: none;
  transition: max-height 300ms ease-in-out;
`;

const Button = styled.div<{ $isFull: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  height: 30px;

  box-shadow: ${(props) => (props.$isFull ? "" : `0 -20px 20px 0px ${color(props).surfaceContainer}`)};
  border-radius: ${(props) => box(props).borderRadius.lg};

  color: ${(props) => color(props).primary};
  background-color: ${(props) => color(props).surfaceContainer};

  font-size: ${(props) => font(props).size.md};
  font-weight: bold;
  line-height: 30px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;
