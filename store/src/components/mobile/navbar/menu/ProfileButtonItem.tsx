import { useLocation } from "react-router-dom";

import { styled } from "styled-components";

import ExpandRightIcon from "@components/iconSvg/ExpandRightIcon";
import { BaseItem } from "@components/mobile/navbar/menu/BaseItem";
import ProfileImage from "@components/mobile/navbar/miniProfile/ProfileImage";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import { CustomerProfileInterface } from "@interfaces/CustomerProfileInterface";
import CustomerProfileService from "@services/CustomerProfileService";
import { box, color, font } from "@utils/Themes";

export default function ProfileButtonItem({ setActive }: { setActive: (value: NavigationModelEnum) => void }) {
  const { pathname } = useLocation();
  const customerProfile = CustomerProfileService.getProfile()!;
  const nameElement = createNameElement(customerProfile);

  function onClick() {
    const targetUrl = `/profile/${customerProfile.id}`;
    if (pathname == targetUrl) {
      setActive(NavigationModelEnum.NONE);
    }
  }

  return (
    <Box to={`/profile/${customerProfile.id}`} onClick={onClick}>
      <ProfileImageBox>
        <ProfileImage isActive={true} />
      </ProfileImageBox>
      <Container>
        {nameElement}
        <Email>{customerProfile.email}</Email>
      </Container>
      <IconBox>
        <ExpandRightIcon />
      </IconBox>
    </Box>
  );
}

const Box = styled(BaseItem)`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding-right: 0;
`;

const ProfileImageBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 70px;

  aspect-ratio: 1;
  object-fit: cover;

  img,
  svg {
    transform: scale(1);
  }
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const HeadName = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-left: ${(props) => box(props).space.md};
  margin-top: 0;
  margin-bottom: auto;

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  text-align: start;
`;

const FullName = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-left: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurfaceVariant};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};

  text-align: start;
`;

const Email = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-left: ${(props) => box(props).space.md};
  margin-bottom: 0;

  color: ${(props) => color(props).onSurfaceVariant};

  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};

  text-align: start;
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-right: ${(props) => box(props).space.xs};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size["2xl"]};
    height: ${(props) => font(props).size["2xl"]};

    path {
      stroke: ${(props) => color(props).outlineVariant};
    }
  }
`;

function createNameElement(profile: CustomerProfileInterface): JSX.Element {
  if (profile.nick_name.length == 0) {
    return (
      <HeadName>
        {profile.first_name} {profile.last_name}
      </HeadName>
    );
  }
  return (
    <>
      <HeadName>{profile.nick_name}</HeadName>
      <FullName>
        {profile.first_name} {profile.last_name}
      </FullName>
    </>
  );
}
