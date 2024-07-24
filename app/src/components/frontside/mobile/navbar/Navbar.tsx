import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { styled } from "styled-components";

import BookmarkButton from "@components/frontside/mobile/navbar/BookmarkButton";
import CategoryButton from "@components/frontside/mobile/navbar/CategoryButton";
import GoTopButton from "@components/frontside/mobile/navbar/GoTopButton";
import GroupButton from "@components/frontside/mobile/navbar/GroupButton";
import HomeButton from "@components/frontside/mobile/navbar/HomeButton";
import SearchButton from "@components/frontside/mobile/navbar/SearchButton";
import MenuModal from "@components/frontside/mobile/navbar/menu/MenuModal";
import SearchModal from "@components/frontside/mobile/navbar/searchBox/SearchModal";
import SignInSignUpModal from "@components/frontside/mobile/navbar/signInSignUp/SignInSignUpModal";
import { NavigationModelEnum } from "@enums/frontside/NavigationModelEnum";
import { useHideScrollBar, useScroll } from "@utils/Hooks";
import { box, color } from "@utils/Themes";

export default function Navbar() {
  useHideScrollBar();
  const scroll = useScroll("Up");
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState<NavigationModelEnum>(NavigationModelEnum.NONE);
  const { pathname } = useLocation();

  const isHomeActive = pathname == "/" && active == NavigationModelEnum.NONE;
  const isCategoryActive = pathname == "/category" && active == NavigationModelEnum.NONE;
  const isBookmarkActive = pathname == "/bookmark" && active == NavigationModelEnum.NONE;
  const isSearchModelShow = active == NavigationModelEnum.SEARCH;
  const isSignInSignUpModalShow = active == NavigationModelEnum.SIGNIN;
  const isMenuModalShow = active == NavigationModelEnum.MENU;
  const isGroupModelShow = isSignInSignUpModalShow || isMenuModalShow;

  useEffect(() => {
    setScrollFreezeWhenActiveNotEmpty(active, scrollY, setScrollY);
  }, [active]);

  return (
    <>
      <GoTopButton scroll={scroll} />
      <SearchModal isShow={isSearchModelShow} />
      <SignInSignUpModal isShow={isSignInSignUpModalShow} />
      <MenuModal isShow={isMenuModalShow} setActive={setActive} />
      <Box $isShow={scroll == "Up"}>
        <TabNavbar>
          <HomeButton isActive={isHomeActive} setActive={setActive} />
          <CategoryButton isActive={isCategoryActive} setActive={setActive} />
          <BookmarkButton isActive={isBookmarkActive} setActive={setActive} />
          <SearchButton isActive={isSearchModelShow} setActive={setActive} />
          <GroupButton isActive={isGroupModelShow} setActive={setActive} />
        </TabNavbar>
      </Box>
    </>
  );
}

const Box = styled.div<{ $isShow: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 60px;

  border-top: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surface};
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 300ms ease-in-out;
  transform: translateY(${(props) => (props.$isShow ? "0" : "100%")});

  position: fixed;
  bottom: 0;

  z-index: ${(props) => box(props).zIndex.sticky};
`;

const TabNavbar = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 5px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

function setScrollFreezeWhenActiveNotEmpty(active: string, scrollY: number, setScrollY: (val: number) => void): void {
  if (active != NavigationModelEnum.NONE) {
    setScrollY(window.scrollY);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.height = "";

    window.scroll({ top: scrollY + 1, left: 0, behavior: "instant" });
    window.scroll({ top: scrollY, left: 0, behavior: "smooth" });
  }
}
