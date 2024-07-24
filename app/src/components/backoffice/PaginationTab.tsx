import React from "react";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import ExpandRightIcon from "@components/iconSvg/ExpandRightIcon";
import { PaginateTabInterface, PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

export default React.memo(function PaginationTab(props: PaginateTabInterface) {
  const element = createPagiantion(props, onClickButton);

  function onClickButton(pageNumber: number) {
    props.navigatePagination(pageNumber);
  }

  return (
    <Box>
      {element.previousButtonElement}
      {element.leftDotButton}
      {element.firstButton}
      {element.secondButton}
      {element.thirdButton}
      {element.rightDotButton}
      {element.nextButtonElement}
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */

  width: 100%;
  height: 25px;

  display: flex;
  justify-content: end;
  align-items: center;
`;

const PreviousButton = styled.div<{ $isDisalbe: boolean }>`
  width: 70px;
  height: 25px;
  border-radius: 5px;
  background-color: #424b51;

  opacity: ${(props) => (props.$isDisalbe ? 0.5 : 1)};

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  img {
    width: 25px;
    height: 25px;
    margin-left: 0px;
    /* border: 1px solid red; */
  }

  p {
    /* border: 1px solid red; */

    width: 100%;
    height: 100%;
    font-size: 16px;

    display: flex;
    align-items: center;
  }

  &:hover {
    cursor: ${(props) => (props.$isDisalbe ? "" : "pointer")};
  }
`;

const NextButton = styled.div<{ $isDisalbe: boolean }>`
  width: 70px;
  height: 25px;
  border-radius: 5px;
  background-color: #424b51;

  opacity: ${(props) => (props.$isDisalbe ? 0.5 : 1)};

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0px;

  img {
    width: 25px;
    height: 25px;
    margin-right: 0px;
    /* border: 1px solid red; */
  }

  p {
    /* border: 1px solid red; */

    width: 100%;
    height: 100%;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: end;
  }

  &:hover {
    cursor: ${(props) => (props.$isDisalbe ? "" : "pointer")};
  }
`;

const PreviousIconBox = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;
  }
`;

const NextIconBox = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;
  }
`;

const Button = styled.div<{ $isActive: boolean; $isDisalbe: boolean }>`
  width: 50px;
  height: 25px;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  background-color: ${(props) => (props.$isActive ? "#6C8291" : "#424b51")};
  border-radius: 5px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: ${(props) => (props.$isDisalbe ? "" : "pointer")};
  }
`;

function createPagiantion(props: PaginationInterface, onClickButton: any) {
  let leftDotButton: JSX.Element | null = null;
  let rightDotButton: JSX.Element | null = null;

  let firstButton: JSX.Element | null = (
    <Button $isActive={false} $isDisalbe={false} onClick={() => onClickButton(props.current - 1)}>
      {props.current - 1}
    </Button>
  );
  let secondButton: JSX.Element | null = (
    <Button $isActive={true} $isDisalbe={false}>
      {props.current}
    </Button>
  );
  let thirdButton: JSX.Element | null = (
    <Button $isActive={false} $isDisalbe={false} onClick={() => onClickButton(props.current + 1)}>
      {props.current + 1}
    </Button>
  );

  let previousButtonElement: JSX.Element = (
    <PreviousButton $isDisalbe={false} onClick={() => onClickButton(props.current - 1)}>
      <PreviousIconBox>
        <ExpandLeftIcon />
      </PreviousIconBox>
      <p>Prev</p>
    </PreviousButton>
  );

  let nextButtonElement: JSX.Element = (
    <NextButton $isDisalbe={false} onClick={() => onClickButton(props.current + 1)}>
      <p>Next</p>
      <NextIconBox>
        <ExpandRightIcon />
      </NextIconBox>
    </NextButton>
  );

  if (props.last == null) {
    rightDotButton = (
      <Button $isActive={false} $isDisalbe={true}>
        ...
      </Button>
    );
  }

  if (props.current >= 3) {
    leftDotButton = (
      <Button $isActive={false} $isDisalbe={true}>
        ...
      </Button>
    );
  }

  if (props.current - 1 <= 0) {
    previousButtonElement = (
      <PreviousButton $isDisalbe={true}>
        <PreviousIconBox>
          <ExpandLeftIcon />
        </PreviousIconBox>
        <p>Prev</p>
      </PreviousButton>
    );
    firstButton = (
      <Button $isActive={true} $isDisalbe={false}>
        1
      </Button>
    );
    secondButton = (
      <Button $isActive={false} $isDisalbe={false} onClick={() => onClickButton(props.current + 1)}>
        2
      </Button>
    );
    thirdButton = (
      <Button $isActive={false} $isDisalbe={false} onClick={() => onClickButton(props.current + 2)}>
        3
      </Button>
    );

    if (props.last != null && props.last < 2) {
      secondButton = null;
    }

    if (props.last != null && props.last < 3) {
      thirdButton = null;
    }
  }

  if (props.last != null && props.current + 1 > props.last) {
    thirdButton = null;
  }

  if (props.last != null && props.last - props.current > 1) {
    rightDotButton = (
      <Button $isActive={false} $isDisalbe={false}>
        ...
      </Button>
    );
  }

  if (props.last != null && props.current >= props.last) {
    nextButtonElement = (
      <NextButton $isDisalbe={true}>
        <p>Next</p>
        <NextIconBox>
          <ExpandRightIcon />
        </NextIconBox>
      </NextButton>
    );
  }

  return {
    previousButtonElement,
    leftDotButton,
    firstButton,
    secondButton,
    thirdButton,
    rightDotButton,
    nextButtonElement,
  };
}
