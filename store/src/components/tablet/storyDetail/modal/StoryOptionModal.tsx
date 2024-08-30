import styled from "styled-components";

import ReportIcon from "@components/iconSvg/ReportIcon";
import { box, color, font } from "@utils/Themes";

export default function StoryOptionModal({ isShow, setReportShow }: { isShow: boolean; setReportShow: (value: boolean) => void }) {
  return (
    <Box $isShow={isShow}>
      <Item onClick={() => setReportShow(true)}>
        <ReportIconBox>
          <ReportIcon />
        </ReportIconBox>
        <Text>รายงาน</Text>
      </Item>
    </Box>
  );
}

const Box = styled.div<{ $isShow: boolean }>`
  box-sizing: border-box;
  min-width: 100px;

  border-radius: ${(props) => box(props).borderRadius.sm};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};
  box-shadow: 0px 0px 5px 0px ${(props) => color(props).shadow};

  display: ${(props) => (props.$isShow ? "block" : "none")};
  position: absolute;
  top: 8px;
  right: 50px;

  z-index: ${(props) => box(props).zIndex.dropdown};

  :first-child {
    border-top-left-radius: ${(props) => box(props).borderRadius.sm};
    border-top-right-radius: ${(props) => box(props).borderRadius.sm};
  }

  :last-child {
    border-bottom-left-radius: ${(props) => box(props).borderRadius.sm};
    border-bottom-right-radius: ${(props) => box(props).borderRadius.sm};
  }
`;

const Item = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 10px ${(props) => box(props).space.md};

  display: flex;
  justify-content: left;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  margin-left: ${(props) => box(props).space.sm};

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
  white-space: nowrap;
`;
const ReportIconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.lg};
    height: ${(props) => font(props).size.lg};

    path {
      stroke: ${(props) => color(props).onSurface};
    }
  }
`;
