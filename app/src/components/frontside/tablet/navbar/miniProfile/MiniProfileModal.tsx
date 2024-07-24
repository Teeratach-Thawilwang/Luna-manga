import styled from "styled-components";

import LogoutButtonItem from "@components/frontside/tablet/navbar/miniProfile/LogoutButtonItem";
import ProfileButtonItem from "@components/frontside/tablet/navbar/miniProfile/ProfileButtonItem";
import { box, color } from "@utils/Themes";

export default function MiniProfileModal({ isShow }: { isShow: boolean }) {
  return (
    <Box $isShow={isShow}>
      <ProfileButtonItem />
      <LogoutButtonItem />
    </Box>
  );
}

const Box = styled.div<{ $isShow: boolean }>`
  box-shadow: 0px 0px 5px 0px ${(props) => color(props).shadow};
  min-width: 100px;
  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: ${(props) => (props.$isShow ? "block" : "none")};

  position: absolute;
  top: 64px;
  right: 0px;

  z-index: ${(props) => box(props).zIndex.modal};

  a:first-child {
    border-top-right-radius: ${(props) => box(props).borderRadius.md};
    border-top-left-radius: ${(props) => box(props).borderRadius.md};
  }
  a:last-child {
    border-bottom-left-radius: ${(props) => box(props).borderRadius.md};
    border-bottom-right-radius: ${(props) => box(props).borderRadius.md};
    border-bottom: 0;
  }
`;
