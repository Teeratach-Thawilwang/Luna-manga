import React, { useRef } from "react";

import styled from "styled-components";

import Logo from "@components/tablet/navbar/Logo";
import MiniProfileButton from "@components/tablet/navbar/MiniProfileButton";
import NavbarButton from "@components/tablet/navbar/NavbarButton";
import SignInButton from "@components/tablet/navbar/SignInButton";
import SearchBox from "@components/tablet/navbar/searchBox/SearchBox";
import SearchItems from "@components/tablet/navbar/searchBox/SearchItems";
import AuthService from "@services/AuthService";
import CustomerProfileService from "@services/CustomerProfileService";
import StorySearchService from "@services/StorySearchService";
import { addEventClick } from "@utils/Hooks";
import { color } from "@utils/Themes";

export default React.memo(function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = CustomerProfileService.isLoggedIn() && AuthService.isLogin();

  addEventClick((event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      StorySearchService.update({ is_modal_show: false });
    }
  });

  return (
    <Box ref={navbarRef}>
      <TabNavbar>
        <Logo />
        <NavbarButton url="/">หน้าแรก</NavbarButton>
        <NavbarButton url="/category">หมวดหมู่</NavbarButton>
        {isLoggedIn ? <NavbarButton url="/bookmark">บุ๊กมาร์ค</NavbarButton> : null}
        <SearchBox />
        {isLoggedIn ? <MiniProfileButton /> : <SignInButton />}
      </TabNavbar>
      <SearchItems />
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid ${(props) => color(props).outlineVariant};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const TabNavbar = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 700px;
  max-width: 1000px;
  padding: 0 20px 0 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  Button:last-child {
    margin-right: 0px;
    margin-left: auto;
  }
`;
