import { styled } from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { box, color, font } from "@utils/Themes";

interface PreviousButtonInterface {
  isDisable: boolean;
  onClick?: () => void;
}

export default function PreviousButton({ isDisable, onClick }: PreviousButtonInterface) {
  return (
    <Box $isDisable={isDisable} onClick={onClick}>
      <IconBox>
        <ExpandLeftIcon />
      </IconBox>
    </Box>
  );
}

const Box = styled.div<{ $isDisable: boolean }>`
  box-sizing: border-box;
  width: ${(props) => font(props).size["4xl"]};
  height: ${(props) => font(props).size["4xl"]};
  margin-right: 10px;

  display: ${(props) => (props.$isDisable ? "none" : "flex")};
  justify-content: center;
  align-items: center;

  cursor: ${(props) => (props.$isDisable ? "default" : "pointer")};
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-left: 0px;

  border-radius: ${(props) => box(props).borderRadius.full};
  box-shadow: inset 0 0 0 1px ${(props) => color(props).primary};

  background-color: ${(props) => color(props).surface};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.xl};
    height: ${(props) => font(props).size.xl};

    path {
      stroke: ${(props) => color(props).primary};
    }
  }

  &:hover {
    background-color: ${(props) => color(props).primary};
    path {
      stroke-width: 4px;
      stroke: ${(props) => color(props).onPrimary};
    }
  }
`;
