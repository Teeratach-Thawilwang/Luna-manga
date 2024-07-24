import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { ChapterStatusEnum } from "@enums/backoffice/StatusEnum";
import ChapterListService from "@services/backoffice/ChapterListService";
import { transformStatus } from "@utils/Helpers";

export default function FilterStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const chapterFilter = ChapterListService.getFilter();
  const status = ChapterListService.getStatus();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const type = (urlParams.get("type") as CategoryTypeEnum) ?? CategoryTypeEnum.MANGA;

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

  function onDropDownHandle(status: ChapterStatusEnum | null) {
    ChapterListService.updateFilter({ status: status });
    setIsOpen(false);
    ChapterListService.loadChapterList(
      chapterFilter?.q,
      status ?? undefined,
      chapterFilter?.start_date,
      chapterFilter?.end_date,
      type,
      1,
      chapterFilter?.order_by,
    );
  }

  return (
    <Box ref={dropDownRef}>
      <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
        <span>Status: {status != null ? transformStatus(status) : "All"}</span>
        <ExpandDropDownBox $isOpen={isOpen}>
          <ExpandLeftIcon />
        </ExpandDropDownBox>
      </DropdownButton>
      <DropdownContent $isOpen={isOpen}>
        <DropdownItem onClick={() => onDropDownHandle(null)}>All</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(ChapterStatusEnum.ACTIVE)}>Active</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(ChapterStatusEnum.INACTIVE)}>Inactive</DropdownItem>
      </DropdownContent>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  position: relative;
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
  min-width: 200px;

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
