import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import CategoryCreateEditService from "@services/backoffice/CategoryCreateEditService";

export default function InputType({ initial }: { initial?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const type = CategoryCreateEditService.getter<CategoryTypeEnum>("type");
  const displayType = getDisplayType(type);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const errorMessage = CategoryCreateEditService.getter<string>("type_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    if (initial) {
      CategoryCreateEditService.update({ type: initial });
    }
  }, []);

  useEffect(() => {
    function onClickOutsideArea(event: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", onClickOutsideArea);
    return () => {
      window.removeEventListener("click", onClickOutsideArea);
    };
  }, []);

  function onDropDownHandle(type: CategoryTypeEnum) {
    CategoryCreateEditService.update({ type: type });
    setIsOpen(false);
  }

  return (
    <Box>
      <Title>Type</Title>
      <DropDownBox ref={dropDownRef}>
        <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
          <span>{displayType}</span>
          <ExpandDropDownBox $isOpen={isOpen}>
            <ExpandLeftIcon />
          </ExpandDropDownBox>
        </DropdownButton>
        <DropdownContent $isOpen={isOpen}>
          <DropdownItem onClick={() => onDropDownHandle(CategoryTypeEnum.MANGA)}>Manga</DropdownItem>
          <DropdownItem onClick={() => onDropDownHandle(CategoryTypeEnum.NOVEL)}>Novel</DropdownItem>
        </DropdownContent>
      </DropDownBox>
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
`;

const DropDownBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  color: #505050;

  display: flex;
  align-items: center;
`;

const DropdownButton = styled.div`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 5px;
  min-width: 200px;
  height: 50px;

  background-color: #fff;

  display: flex;
  justify-content: start;
  align-items: center;

  span {
    /* border: 1px solid red; */
    text-align: start;
    width: 100%;
    color: #000;
    font-size: 18px;
    margin-left: 20px;
    margin-right: 10px;
  }

  &:hover {
    cursor: pointer;
    background-color: #fdfdfd;
  }
`;

const ExpandDropDownBox = styled.div<{ $isOpen: boolean }>`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
  transition: 200ms ease-in-out;

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    stroke: #000;
    stroke-width: 3px;
  }
`;

const DropdownContent = styled.div<{ $isOpen: boolean }>`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;

  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  top: 55px;
  left: 0px;

  z-index: 99;

  :nth-child(1) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  :last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DropdownItem = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  color: black;
  font-size: 18px;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;

  display: flex;
  justify-content: start;
  align-items: center;

  &:hover {
    background-color: #eeeeee;
  }
`;

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}

function getDisplayType(type: CategoryTypeEnum | null): string {
  if (type == null) {
    return "";
  }
  return type == CategoryTypeEnum.MANGA ? "Manga" : "Novel";
}
