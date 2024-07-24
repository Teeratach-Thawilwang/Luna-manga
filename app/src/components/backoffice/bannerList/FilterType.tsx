import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import BannerListService from "@services/backoffice/BannerListService";
import { transformBannerType } from "@utils/Helpers";

export default function FilterType() {
  const [isOpen, setIsOpen] = useState(false);
  const bannerFilter = BannerListService.getFilter();
  const type = BannerListService.getType();
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

  function onDropDownHandle(type: BannerTypeEnum | null) {
    BannerListService.updateFilter({ type: status });
    setIsOpen(false);
    BannerListService.loadBannerList(
      bannerFilter?.q,
      bannerFilter?.status,
      type ?? undefined,
      bannerFilter?.start_date,
      bannerFilter?.end_date,
      1,
      bannerFilter?.order_by,
    );
  }

  return (
    <Box ref={dropDownRef}>
      <DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
        <span>Type: {type != null ? transformBannerType(type) : "All"}</span>
        <ExpandDropDownBox $isOpen={isOpen}>
          <ExpandLeftIcon />
        </ExpandDropDownBox>
      </DropdownButton>
      <DropdownContent $isOpen={isOpen}>
        <DropdownItem onClick={() => onDropDownHandle(null)}>All</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(BannerTypeEnum.CHAPTER)}>Chapter</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(BannerTypeEnum.STORY)}>Story</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(BannerTypeEnum.STORY_WINDOW)}>Story Window</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(BannerTypeEnum.ADVERTISEMENT_SMALL)}>Advertisement Small</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(BannerTypeEnum.ADVERTISEMENT_MEDIUM)}>Advertisement Medium</DropdownItem>
        <DropdownItem onClick={() => onDropDownHandle(BannerTypeEnum.ADVERTISEMENT_GROUP)}>Advertisement Group</DropdownItem>
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

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  &:hover {
    background-color: #eeeeee;
  }
`;
