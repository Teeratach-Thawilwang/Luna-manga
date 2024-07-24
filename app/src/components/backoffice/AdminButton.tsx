import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import AdminButtonModal from "@components/backoffice/AdminButtonModal";
import DefaultUserIcon from "@components/iconSvg/DefaultUserIcon";

export default function AdminButton() {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutsideArea(event: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsModalShow(false);
      }
    }
    window.addEventListener("click", onClickOutsideArea);
    return () => {
      window.removeEventListener("click", onClickOutsideArea);
    };
  }, []);

  return (
    <Box ref={dropDownRef} onClick={() => setIsModalShow((prev) => !prev)}>
      <DefaultProfileImage>
        <DefaultUserIcon />
      </DefaultProfileImage>
      <p>Admin</p>
      <AdminButtonModal isShow={isModalShow} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 110px;
  height: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  p {
    color: #000;
    font-size: 20px;
    margin-left: 10px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DefaultProfileImage = styled.div`
  /* border: 1px solid red; */
  width: 40px;
  height: 40px;
  margin-left: 5px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 40px;
    height: 40px;
    text-align: center;

    circle:nth-child(1) {
      fill: #000000;
      stroke: #000000;
    }

    circle:nth-child(2) {
      stroke: #000000;
    }

    path {
      fill: #000000;
      stroke: #000000;
    }
  }
`;
