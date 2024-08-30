import { MutableRefObject } from "react";

import styled from "styled-components";

import HorizontalScroll from "@components/tablet/HorizontalScroll";
import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { CategoryInterface } from "@interfaces/CategoryInterface";
import CategoryService from "@services/CategoryService";
import CategoryStoryService from "@services/CategoryStoryService";
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
      CategoryStoryService.loadIndex(categoriesByType[0].id, 1, 15, "name");
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
      <ScrollWrap>
        <HorizontalScroll>{categoryElement}</HorizontalScroll>
      </ScrollWrap>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin-top: ${(props) => box(props).space.xxl};
`;

const ScrollWrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
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
  margin: 0 8px;
  padding: ${(props) => box(props).space.xs} ${(props) => box(props).space.md};
  border-radius: 5px;

  color: ${(props) => (props.$isActive ? color(props).onPrimary : color(props).onSurface)};
  background-color: ${(props) => (props.$isActive ? color(props).primary : color(props).surfaceContainerHigh)};

  font-size: ${(props) => font(props).size.md};
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
      CategoryStoryService.loadIndex(category.id, 1, 15, "name");
    }

    return (
      <Item key={category.id} onClick={onClick} $isActive={isActive}>
        {category.name}
      </Item>
    );
  });
}
