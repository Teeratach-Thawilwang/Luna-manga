import { useRef, useState } from "react";

import styled from "styled-components";

import verticalOptionIcon from "@assets/icon/vertical_option_icon.svg";
import { CommentInterface } from "@interfaces/CommentInterface";
import { addEventClick } from "@utils/Hooks";
import { color, font } from "@utils/Themes";

interface OptionButtonInterface {
  comment: CommentInterface;
  optionModal: (commentId: number, commenterId: number, isShow: boolean, setIsShow: (value: boolean) => void) => JSX.Element;
}

export default function OptionButton({ comment, optionModal }: OptionButtonInterface) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);

  addEventClick((event: MouseEvent) => {
    if (!isModalShow && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalShow(false);
    }
  });

  return (
    <Box ref={modalRef}>
      <OptionIcon src={verticalOptionIcon} onClick={() => setIsModalShow((prev) => !prev)} />
      {optionModal(comment.id, comment.commenter.id, isModalShow, setIsModalShow)}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  width: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const OptionIcon = styled.img`
  /* border: 1px solid red; */
  padding: 10px;
  border-radius: 100%;
  width: ${(props) => font(props).size.lg};
  height: ${(props) => font(props).size.lg};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHighest};
  }

  &:active {
    transform: scale(0.9);
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;
