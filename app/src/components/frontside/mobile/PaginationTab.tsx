import styled from "styled-components";

import BaseButton from "@components/frontside/mobile/pagination/BaseButton";
import NextButton from "@components/frontside/mobile/pagination/NextButton";
import PreviousButton from "@components/frontside/mobile/pagination/PreviousButton";
import { PaginateTabInterface, PaginationInterface } from "@interfaces/frontside/PaginationInterface";

export default function PaginationTab(props: PaginateTabInterface) {
  const element = createPagiantion(props, onClickButton);

  function onClickButton(pageNumber: number) {
    props.navigatePagination(pageNumber);
  }

  return (
    <Box>
      {element.previousButton}
      {element.firstPageButton}
      {element.currentButton}
      {element.lastPageButton}
      {element.nextButton}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function createPagiantion(props: PaginationInterface, onClickButton: any) {
  const previousButton: JSX.Element | null = getPreviousButton(props.current, () => onClickButton(props.current - 1));
  const nextButton: JSX.Element | null = getNextButton(props.last, props.current, () => onClickButton(props.current + 1));

  const currentButton: JSX.Element | null = getCurrentPage(props.current);

  const firstPageButton: JSX.Element | null = getFirstPageButton(props.current, onClickButton);
  const lastPageButton: JSX.Element | null = getLastPageButton(props.last, props.current, onClickButton);

  return {
    previousButton,
    firstPageButton,
    currentButton,
    lastPageButton,
    nextButton,
  };
}

function getPreviousButton(current: number, onClick: () => void): JSX.Element | null {
  if (current > 1) {
    return <PreviousButton isDisable={false} onClick={onClick} />;
  }
  return <PreviousButton isDisable={false} onClick={() => null} />;
}

function getNextButton(last: number | null, current: number, onClick: () => void): JSX.Element | null {
  if (last == null || current >= last) {
    return <NextButton isDisable={false} onClick={() => null} />;
  }
  return <NextButton isDisable={false} onClick={onClick} />;
}

function getCurrentPage(current: number): JSX.Element | null {
  return (
    <BaseButton isActive={true} isDisable={false}>
      {current}
    </BaseButton>
  );
}

function getFirstPageButton(current: number, onClick: (page: number) => void) {
  if (current > 1) {
    return (
      <BaseButton isActive={false} isDisable={false} onClick={() => onClick(1)}>
        1
      </BaseButton>
    );
  }
  return null;
}

function getLastPageButton(last: number | null, current: number, onClick: (page: number) => void) {
  if (last == null || current >= last) {
    return null;
  }
  return (
    <BaseButton isActive={false} isDisable={false} onClick={() => onClick(last)}>
      {last}
    </BaseButton>
  );
}
