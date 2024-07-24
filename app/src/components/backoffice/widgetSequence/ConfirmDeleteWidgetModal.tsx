import styled from "styled-components";

import WidgetSequenceService from "@services/backoffice/WidgetSequenceService";

interface ConfirmDeleteWidgetModalInterface {
  widgetId: number;
  setShow: (value: boolean) => void;
}

export default function ConfirmDeleteWidgetModal({ widgetId, setShow }: ConfirmDeleteWidgetModalInterface) {
  function onClickHandle() {
    WidgetSequenceService.deleteById(widgetId);
    setShow(false);
  }

  return (
    <Box>
      <Header>
        <Text>
          ต้องการลบ
          <br />
          Widget id = {widgetId}
          <br />
          ออกจากลำดับ
        </Text>
      </Header>
      <ConfimButton onClick={onClickHandle}>ยืนยัน</ConfimButton>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  min-width: 250px;
`;

const Header = styled.div`
  /* border: 1px solid red; */
  /* height: 50px; */

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 20px;
  margin-right: 20px;
`;

const Text = styled.p`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 20px auto 0 auto;

  font-size: 18px;
  /* letter-spacing: 1px; */
  color: #000000;
  text-align: center;

  span {
    color: #000000;
    font-weight: bolder;
  }
`;

const ConfimButton = styled.div`
  /* border: 1px solid red; */
  width: calc(100% - 40px);
  height: 50px;

  border: 0 transparent;
  border-radius: 5px;

  color: #ffffff;
  background-color: #152027;

  font-size: 18px;
  font-weight: normal;
  /* font-family: Kanit; */

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px 20px 20px 20px;

  &:hover {
    cursor: pointer;
    opacity: 0.95;
  }
`;
