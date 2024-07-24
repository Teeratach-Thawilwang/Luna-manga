import styled from "styled-components";

import BoxLoading from "@components/frontside/mobile/BoxLoading";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import { box, color, font } from "@utils/Themes";

interface SeemoreButtonInterface {
  paginate: PaginationInterface | null;
  isLoading: boolean;
  onClick: () => void;
}

export default function SeeMoreButton({ paginate, isLoading, onClick }: SeemoreButtonInterface) {
  if (paginate?.next == null) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Box>
        <BoxLoadingWrap>
          <BoxLoading />
        </BoxLoadingWrap>
      </Box>
    );
  }

  return (
    <SeeMoreBox>
      <SeeMore onClick={onClick}>ดูเพิ่มเติม</SeeMore>
    </SeeMoreBox>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  position: relative;
`;

const BoxLoadingWrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeeMoreBox = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 40px;
  margin-top: ${(props) => box(props).space.md};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before {
    content: "";
    width: 100%;

    border-top: 1px solid ${(props) => color(props).outlineVariant};
    background: ${(props) => color(props).outlineVariant};

    position: absolute;
    top: 50%;
    left: 0;

    z-index: ${(props) => box(props).zIndex.base};
  }
`;

const SeeMore = styled.div`
  box-sizing: border-box;
  height: 40px;
  padding: 0 ${(props) => box(props).space.xxl};

  border-radius: ${(props) => box(props).borderRadius["4xl"]};
  border: 1px solid ${(props) => color(props).outlineVariant};

  color: ${(props) => color(props).onSurface};
  background-color: ${(props) => color(props).surface};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: ${(props) => box(props).zIndex.base};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainer};
  }

  &:active {
    background-color: ${(props) => color(props).surfaceContainerLow};
  }
`;
