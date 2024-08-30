import { styled } from "styled-components";

import InputText from "@components/tablet/editProfile/InputText";

export default function InputGroup() {
  return (
    <Box>
      <InputText name="firstName" type="text" palceHolder="ชื่อจริง" />
      <InputText name="lastName" type="text" palceHolder="นามสกุล" />
      <InputText name="nickName" type="text" palceHolder="ชื่อเล่น" />
      <InputText name="email" type="email" palceHolder="อีเมล" isDisable={true} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px 40px;
`;
