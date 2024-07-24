import styled from "styled-components";

import BaseButton from "@components/frontside/tablet/pagination/BaseButton";
import NextButton from "@components/frontside/tablet/pagination/NextButton";
import PreviousButton from "@components/frontside/tablet/pagination/PreviousButton";
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
      {element.leftDotButton}
      {element.firstButton}
      {element.secondButton}
      {element.thirdButton}
      {element.rightDotButton}
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
  justify-content: end;
  align-items: center;
`;

function createPagiantion(props: PaginationInterface, onClickButton: any) {
  const leftDotButton: JSX.Element | null = getLeftDotButton(props.current);
  const rightDotButton: JSX.Element | null = getRightDotButton(props.last, props.current);

  const previousButton: JSX.Element | null = getPreviousButton(props.current, () => onClickButton(props.current - 1));
  const nextButton: JSX.Element | null = getNextButton(props.last, props.current, () => onClickButton(props.current + 1));

  const firstButton: JSX.Element = getFirstButton(props.current, () => onClickButton(props.current - 1));
  const secondButton: JSX.Element | null = getSecondButton(props.last, props.current, () => onClickButton(props.current + 1));
  const thirdButton: JSX.Element | null = getThirdButton(props.last, props.current, onClickButton);

  const firstPageButton: JSX.Element | null = getFirstPageButton(props.current, onClickButton);
  const lastPageButton: JSX.Element | null = getLastPageButton(props.last, props.current, onClickButton);

  return {
    previousButton,
    firstPageButton,
    leftDotButton,
    firstButton,
    secondButton,
    thirdButton,
    rightDotButton,
    lastPageButton,
    nextButton,
  };
}

function getLeftDotButton(current: number): JSX.Element | null {
  if (current > 3) {
    return (
      <BaseButton isActive={false} isDisable={true}>
        ···
      </BaseButton>
    );
  }
  return null;
}

function getRightDotButton(last: number | null, current: number): JSX.Element | null {
  if (last == null) {
    return (
      <BaseButton isActive={false} isDisable={true}>
        ···
      </BaseButton>
    );
  }
  if (last != null && last > current + 2) {
    return (
      <BaseButton isActive={false} isDisable={true}>
        ···
      </BaseButton>
    );
  }
  return null;
}

function getPreviousButton(current: number, onClick: () => void): JSX.Element | null {
  if (current > 1) {
    return <PreviousButton isDisable={false} onClick={onClick} />;
  }
  return null;
}

function getNextButton(last: number | null, current: number, onClick: () => void): JSX.Element | null {
  if (last != null && current >= last) {
    return null;
  }
  return <NextButton isDisable={false} onClick={onClick} />;
}

function getFirstButton(current: number, onClick: () => void): JSX.Element {
  if (current <= 1) {
    return (
      <BaseButton isActive={true} isDisable={false}>
        1
      </BaseButton>
    );
  }

  return (
    <BaseButton isActive={false} isDisable={false} onClick={onClick}>
      {current - 1}
    </BaseButton>
  );
}

function getSecondButton(last: number | null, current: number, onClick: () => void): JSX.Element | null {
  if (last != null && last < 2) {
    return null;
  }

  if (current <= 1) {
    return (
      <BaseButton isActive={false} isDisable={false} onClick={onClick}>
        2
      </BaseButton>
    );
  }

  return (
    <BaseButton isActive={true} isDisable={false}>
      {current}
    </BaseButton>
  );
}

function getThirdButton(last: number | null, current: number, onClick: (page: number) => void): JSX.Element | null {
  if (last != null && (last < 3 || current + 1 > last)) {
    return null;
  }
  if (current <= 1) {
    return (
      <BaseButton isActive={false} isDisable={false} onClick={() => onClick(current + 2)}>
        3
      </BaseButton>
    );
  }
  return (
    <BaseButton isActive={false} isDisable={false} onClick={() => onClick(current + 1)}>
      {current + 1}
    </BaseButton>
  );
}

function getFirstPageButton(current: number, onClick: (page: number) => void) {
  if (current > 2) {
    return (
      <BaseButton isActive={false} isDisable={false} onClick={() => onClick(1)}>
        1
      </BaseButton>
    );
  }
  return null;
}

function getLastPageButton(last: number | null, current: number, onClick: (page: number) => void) {
  if (last == null) {
    return null;
  }
  if (last != null && (last <= 3 || current + 1 >= last)) {
    return null;
  }
  return (
    <BaseButton isActive={false} isDisable={false} onClick={() => onClick(last)}>
      {last}
    </BaseButton>
  );
}
