import styled from "styled-components";

interface ConfirmDeleteCategoryModalInterface {
  onDelete: () => void;
}

export default function ConfirmDeleteModal({ onDelete }: ConfirmDeleteCategoryModalInterface) {
  return (
    <Box>
      <Header>
        <Text>
          ต้องการลบ Widget <br /> และนำออกจาก Widget ?
        </Text>
      </Header>
      <ConfimButton onClick={onDelete}>ยืนยัน</ConfimButton>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  min-width: 250px;

  padding-bottom: 20px;
  /* background-color: #424b51; */
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

  margin: 10px 20px 0px 20px;

  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }

  &:active {
    cursor: pointer;
    opacity: 1;
  }
`;
