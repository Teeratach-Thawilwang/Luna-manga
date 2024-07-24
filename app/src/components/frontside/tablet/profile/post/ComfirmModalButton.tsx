import { darken } from "polished";

import styled from "styled-components";

import { CustomerReportGroupEnum } from "@enums/frontside/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/frontside/CustomerReportSourceEnum";
import CustomerReportService from "@services/frontside/CustomerReportService";
import ProfilePostService from "@services/frontside/ProfilePostService";
import { box, color, font } from "@utils/Themes";

interface ComfirmModalButtonInterface {
  group: CustomerReportGroupEnum | "DELETE";
  customerId: number;
  postId: number;
  setShow: (value: boolean) => void;
}

export default function ComfirmModalButton({ group, customerId, postId, setShow }: ComfirmModalButtonInterface) {
  function onClickHandle() {
    if (group == "DELETE") {
      ProfilePostService.delete(customerId, postId);
      setShow(false);
      return;
    }

    CustomerReportService.report(postId, group, CustomerReportSourceEnum.POST, customerId);
    setShow(false);
  }

  return <Box onClick={onClickHandle}>ยืนยัน</Box>;
}

const Box = styled.div`
  height: 40px;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.xxl};

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
