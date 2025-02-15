import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { styled } from "styled-components";

import BookmarkButton from "@components/mobile/navbar/BookmarkButton";
import CategoryButton from "@components/mobile/navbar/CategoryButton";
import GoTopButton from "@components/mobile/navbar/GoTopButton";
import GroupButton from "@components/mobile/navbar/GroupButton";
import HomeButton from "@components/mobile/navbar/HomeButton";
import SearchButton from "@components/mobile/navbar/SearchButton";
import MenuModal from "@components/mobile/navbar/menu/MenuModal";
import SearchModal from "@components/mobile/navbar/searchBox/SearchModal";
import SignInSignUpModal from "@components/mobile/navbar/signInSignUp/SignInSignUpModal";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import AuthService from "@services/AuthService";
import SignInSignUpService from "@services/SignInSignUpService";
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

  const isFirstRender = useRef(true);
  const isRequestSignInSignUpShow = useRef(false);
  const isPreviousNavModal = useRef(NavigationModelEnum.NONE);
  const isShow = SignInSignUpService.getter<boolean>("isShow");
  const isLoggedIn = AuthService.isLogin();
  isRequestSignInSignUpShow.current = isShow;

  useEffect(() => {
    isFirstRender.current = false;
    return () => {
      unsetScrollFreeze(scrollY);
    };
  }, []);

  useEffect(() => {
    setScrollFreezeWhenActiveNotEmpty(active, scrollY, setScrollY);
  }, [active]);

  useEffect(() => {
    if (isLoggedIn && !isFirstRender.current) return;
    const isNavModalNone = active == NavigationModelEnum.NONE;
    const isPreviosModalNotSignIn = isPreviousNavModal.current != NavigationModelEnum.SIGNIN;
    const isPreviosModalNotSearch = isPreviousNavModal.current != NavigationModelEnum.SEARCH;
    const isPreviousNavModalNone = isPreviosModalNotSignIn && isPreviosModalNotSearch;
    const isPathnameValid = pathname != "/" && pathname != "/category";
    const case1 = isRequestSignInSignUpShow.current && isNavModalNone && isPreviousNavModalNone && isPathnameValid;
    const case2 = isRequestSignInSignUpShow.current && isNavModalNone && !isPreviousNavModalNone && isPathnameValid;

    if (case1) {
      setActive(NavigationModelEnum.SIGNIN);
      return;
    }
    if (case2) {
      SignInSignUpService.setIsShow(false);
      setActive(NavigationModelEnum.NONE);
      return;
    }

    return () => {
      isPreviousNavModal.current = active;
    };
  }, [isShow, active, pathname]);

  return (
    <>
      <GoTopButton scroll={scroll} />
      <SearchModal isShow={isSearchModelShow} setActive={setActive} />
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

function setScrollFreezeWhenActiveNotEmpty(active: NavigationModelEnum, scrollY: number, setScrollY: (val: number) => void): void {
  if (active != NavigationModelEnum.NONE) {
    setScrollFreeze(setScrollY);
  } else {
    unsetScrollFreeze(scrollY);
  }
}

function setScrollFreeze(setScrollY: (val: number) => void) {
  setScrollY(window.scrollY);
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.height = "100%";
}

function unsetScrollFreeze(scrollY: number) {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.height = "";

  window.scroll({ top: scrollY + 1, left: 0, behavior: "instant" });
  window.scroll({ top: scrollY, left: 0, behavior: "smooth" });
}
