import { styled } from "styled-components";

import ExpandRightIcon from "@components/iconSvg/ExpandRightIcon";
import { box, color, font } from "@utils/Themes";

interface NextButtonInterface {
  isDisable: boolean;
  onClick?: () => void;
}

export default function NextButton({ isDisable, onClick }: NextButtonInterface) {
  return (
    <Box $isDisable={isDisable} onClick={onClick}>
      <IconBox>
        <ExpandRightIcon />
      </IconBox>
    </Box>
  );
}

const Box = styled.div<{ $isDisable: boolean }>`
  box-sizing: border-box;
  width: ${(props) => font(props).size["4xl"]};
  height: ${(props) => font(props).size["4xl"]};

  opacity: ${(props) => (props.$isDisable ? 0.8 : 1)};

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
`;
