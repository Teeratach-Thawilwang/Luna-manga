import { useState } from "react";

import { styled } from "styled-components";

import Loading from "@components/frontside/mobile/Loading";
import { box, color } from "@utils/Themes";

interface ImageAdvertisementInterface {
  src: string;
  aspectRatio: number;
  borderRadius?: string;
}

export default function ImageAdvertisement({ src, aspectRatio, borderRadius }: ImageAdvertisementInterface) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box $borderRadius={borderRadius ?? "4px"}>
      <PlaceholderImage $isLoaded={isLoaded} $aspectRatio={aspectRatio}>
        <BoxLoading>
          <Loading />
        </BoxLoading>
      </PlaceholderImage>
      <Image src={src} $isLoaded={isLoaded} onLoad={() => setIsLoaded(true)} $aspectRatio={aspectRatio} />
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

const PlaceholderImage = styled.div<{ $isLoaded: boolean; $aspectRatio: number }>`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;

  background-color: ${(props) => color(props).surfaceContainer};

  /* width / height */
  aspect-ratio: ${(props) => `calc(${props.$aspectRatio})`};

  display: ${(props) => (props.$isLoaded ? "none" : "block")};

  position: relative;
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.6);

  z-index: ${(props) => box(props).zIndex.dropdown};
  opacity: 1;
`;

const Image = styled.img<{ $isLoaded: boolean; $aspectRatio: number }>`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;

  /* width / height */
  aspect-ratio: ${(props) => `calc(${props.$aspectRatio})`};

  display: ${(props) => (props.$isLoaded ? "block" : "none")};

  object-fit: cover;
  transition: 200ms ease-in-out;
  z-index: ${(props) => box(props).zIndex.base};
`;
