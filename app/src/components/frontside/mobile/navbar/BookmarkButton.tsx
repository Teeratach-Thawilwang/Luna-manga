import { Link } from "react-router-dom";

import { styled } from "styled-components";

import BookmarkIcon from "@components/iconSvg/BookmarkIcon";
import { NavigationModelEnum } from "@enums/frontside/NavigationModelEnum";
import AuthService from "@services/frontside/AuthService";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import { color, font } from "@utils/Themes";

interface BookmarkButtonInterface {
  isActive: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function BookmarkButton({ isActive, setActive }: BookmarkButtonInterface) {
  const isLoggedIn = CustomerProfileService.isLoggedIn() && AuthService.isLogin();

  function onClick() {
    if (isActive) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    setActive(isLoggedIn ? NavigationModelEnum.NONE : NavigationModelEnum.SIGNIN);
  }

  if (!isLoggedIn) {
    return (
      <Box $isActive={isActive} onClick={onClick}>
        <BookmarkIcon />
        <Text $isActive={isActive}>บุ๊คมาร์ก</Text>
      </Box>
    );
  }

  return (
    <BoxLink to="/bookmark" $isActive={isActive} onClick={onClick}>
      <BookmarkIcon />
      <Text $isActive={isActive}>บุ๊คมาร์ก</Text>
    </BoxLink>
  );
}

const Box = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px 0;

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};

    path {
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
      fill: ${(props) => (props.$isActive ? color(props).primary : "none")};
    }
  }
`;

const BoxLink = styled(Link)<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px 0;

  svg {
    /* border: 1px solid red; */
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};

    path {
      stroke: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
      fill: ${(props) => (props.$isActive ? color(props).primary : "none")};
    }
  }
`;

const Text = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;

  color: ${(props) => (props.$isActive ? color(props).primary : color(props).onSurface)};
  font-size: ${(props) => font(props).size.xs};
`;
