import styled from "styled-components";

import Loading from "@components/backoffice/Loading";

export default function SearchLoading() {
  return (
    <LoadingWrap>
      <BoxLoading>
        <Loading color="#000000" />
      </BoxLoading>
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  /* border: 1px solid red; */
  position: relative;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  position: absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  z-index: 99;
  opacity: 1;
`;
