import { MutableRefObject } from "react";

import styled from "styled-components";

import ScrollBox from "@components/frontside/mobile/categoryDetail/ScrollBox";
import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { CategoryInterface } from "@interfaces/frontside/CategoryInterface";
import CategoryService from "@services/frontside/CategoryService";
import CategoryStoryService from "@services/frontside/CategoryStoryService";
import { box, color, font } from "@utils/Themes";

export default function CategeryHeader({ contentRef }: { contentRef: MutableRefObject<HTMLDivElement | null> }) {
  const categoryType = CategoryService.getCategoryType();
  const categoryAllType = CategoryService.getCategory();
  const categoriesByType = CategoryService.filterCategoryByType(categoryAllType, categoryType);
  const categorySelectedId = CategoryStoryService.getCategorySelectedId();
  const categoryElement = createSlideCategory(categoriesByType, categorySelectedId);

  function onClickSelectType(type: CategoryTypeEnum) {
    if (categoryType != type && categoriesByType.length > 0) {
      CategoryService.update({ type: type });
      const categoriesByType = CategoryService.filterCategoryByType(categoryAllType, type);
      CategoryStoryService.loadIndex(categoriesByType[0].id);
    }
  }

  return (
    <Box ref={contentRef}>
      <TypeSelect>
        <TypeItemSelect $isActive={categoryType == CategoryTypeEnum.MANGA} onClick={() => onClickSelectType(CategoryTypeEnum.MANGA)}>
          Manga
        </TypeItemSelect>
        <TypeItemSelect $isActive={categoryType == CategoryTypeEnum.NOVEL} onClick={() => onClickSelectType(CategoryTypeEnum.NOVEL)}>
          Novel
        </TypeItemSelect>
      </TypeSelect>
      <ScrollBox>{categoryElement}</ScrollBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};
`;

const TypeSelect = styled.div`
  /* border: 1px solid red; */
  margin-bottom: 20px;
  border-bottom: 2px solid ${(props) => color(props).outlineVariant};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 ${(props) => box(props).space.xxxl};
`;

const TypeItemSelect = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  width: fit-content;
  height: 100%;
  padding: ${(props) => box(props).space.sm} 0;

  color: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => (props.$isActive ? font(props).weight.bold : font(props).weight.regular)};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  transition: 200ms ease-in-out;

  &::before {
    content: "";
    width: 100%;
    height: 3px;

    border-radius: ${(props) => box(props).borderRadius.md};
    background-color: ${(props) => (props.$isActive ? color(props).primary : "transparent")};

    position: absolute;
    bottom: -2px;
    left: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Item = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: fit-content;
  margin: 0 ${(props) => box(props).space.sm};
  padding: ${(props) => box(props).space.sm} ${(props) => box(props).space.md};
  border-radius: 5px;

  color: ${(props) => (props.$isActive ? color(props).onPrimary : color(props).onSurface)};
  background-color: ${(props) => (props.$isActive ? color(props).primary : color(props).surfaceContainerHigh)};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => (props.$isActive ? font(props).weight.bold : font(props).weight.regular)};

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: visible;

  &:hover {
    background-color: ${(props) => (props.$isActive ? color(props).primary : color(props).surfaceContainerHighest)};
    cursor: ${(props) => (props.$isActive ? "default" : "pointer")};
  }
`;

function createSlideCategory(categories: CategoryInterface[], categorySelectedId: number | null) {
  return categories.map((category, key) => {
    const isFirstKeySelected = categorySelectedId == null && key == 0;
    const isCategorySelected = categorySelectedId != null && category.id == categorySelectedId;
    const isActive = isFirstKeySelected || isCategorySelected;

    function onClick() {
      if (isActive) {
        return;
      }
      CategoryStoryService.loadIndex(category.id);
    }

    return (
      <Item key={category.id} onClick={onClick} $isActive={isActive}>
        {category.name}
      </Item>
    );
  });
}
