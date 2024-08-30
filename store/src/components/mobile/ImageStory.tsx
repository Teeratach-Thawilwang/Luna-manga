import { useState } from "react";

import { styled } from "styled-components";

import Loading from "@components/mobile/Loading";
import { box, color } from "@utils/Themes";

export default function ImageStory({ src, borderRadius }: { src: string; borderRadius?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Box $borderRadius={borderRadius ?? "8px"}>
      <PlaceholderImage $isLoaded={isLoaded}>
        <BoxLoading>
          <Loading />
        </BoxLoading>
      </PlaceholderImage>
      <Image src={src} $isLoaded={isLoaded} onLoad={() => setIsLoaded(true)} />
    </Box>
  );
}

const Box = styled.div<{ $borderRadius: string }>`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.$borderRadius};

  overflow: hidden;
`;

const PlaceholderImage = styled.div<{ $isLoaded: boolean }>`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;

  background-color: ${(props) => color(props).surfaceContainer};

  /* width / height = 200px / 300 */
  aspect-ratio: calc(200 / 300);

  display: ${(props) => (props.$isLoaded ? "none" : "block")};

  position: relative;
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.4);

  z-index: ${(props) => box(props).zIndex.dropdown};
  opacity: 1;
`;

const Image = styled.img<{ $isLoaded: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;

  /* width / height = 200px / 300 */
  aspect-ratio: calc(200 / 300);

  display: ${(props) => (props.$isLoaded ? "block" : "none")};

  object-fit: cover;
  transition: 200ms ease-in-out;
  z-index: ${(props) => box(props).zIndex.base};
`;
