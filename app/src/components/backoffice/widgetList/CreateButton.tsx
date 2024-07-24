import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";

export default function CreateButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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

  function onDropDownHandle(type: WidgetTypeEnum) {
    setIsOpen(false);
    navigate(`/backoffice/widget/create/${type}`);
  }

  return (
    <Box ref={dropDownRef}>
      <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>+ Create</DropdownButton>
      <DropdownContent $isOpen={isOpen}>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.CHAPTER_GROUP)}>Chapter Group</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.STORY_LIST)}>Story List</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.STORY_GROUP)}>Story Group</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.STORY_WINDOW)}>Story Window</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.ADVERTISEMENT_SMALL)}>Advertisement Small</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.ADVERTISEMENT_MEDIUM)}>Advertisement Medium</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(WidgetTypeEnum.ADVERTISEMENT_GROUP)}>Advertisement Group</DropdownItem>
      </DropdownContent>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  position: relative;

  margin-left: 20px;
`;

const DropdownButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 50px;
  width: 125px;
  /* margin-left: 20px; */

  font-size: 20px;
  color: #fff;
  background-color: #3ba639;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #44b642;
    cursor: pointer;
  }

  &:active {
    background-color: #349f32;
  }
`;

const DropdownContent = styled.div<{ $isOpen: boolean }>`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 5px;
  min-width: 200px;

  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  top: 55px;
  right: 0px;

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

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  &:hover {
    background-color: #eeeeee;
  }
`;
