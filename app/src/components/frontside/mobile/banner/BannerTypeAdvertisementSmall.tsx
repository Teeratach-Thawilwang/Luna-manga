import styled from "styled-components";

import ImageAdvertisement from "@components/frontside/mobile/ImageAdvertisement";
import { BannerInterface } from "@interfaces/frontside/BannerInterface";

export default function BannerTypeAdvertisementSmall(banner: BannerInterface) {
  return (
    <Box onClick={() => window.open("//" + banner.link, "_blank")}>
      <ImageAdvertisement src={banner.images[0].mobile} aspectRatio={490 / 150} />
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
