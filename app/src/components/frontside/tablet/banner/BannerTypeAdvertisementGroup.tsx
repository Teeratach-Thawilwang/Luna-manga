import styled from "styled-components";

import ImageAdvertisement from "@components/frontside/tablet/ImageAdvertisement";
import { BannerInterface } from "@interfaces/frontside/BannerInterface";

export default function BannerTypeAdvertisementGroup(banner: BannerInterface) {
  return (
    <Box onClick={() => window.open(banner.link, "_blank")}>
      <ImageAdvertisement src={banner.images[0].desktop} aspectRatio={1000 / 180} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid yellow; */
  box-sizing: border-box;
  width: 100%;
  height: auto;

  cursor: pointer;
`;
