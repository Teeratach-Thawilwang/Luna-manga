import styled from "styled-components";

import WidgetSequenceService from "@services/backoffice/WidgetSequenceService";

export default function FooterControl() {
  const widgetSequenceIds = WidgetSequenceService.getIds();

  function onUpdate() {
    WidgetSequenceService.updateWidgetSequence(widgetSequenceIds);
  }
  return (
    <Box>
      <UpdateButton onClick={onUpdate}>Update</UpdateButton>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 20px;
  margin: auto 0 0 0;
  height: 60px;
  width: 100%;

  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;

  color: #000000;
  background-color: #ffffff;

  display: flex;
  justify-content: end;
  align-items: center;
`;

const UpdateButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 125px;
  margin-right: 20px;

  font-size: 18px;
  color: #fff;
  background-color: #3ba639;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #44b642;
    cursor: pointer;
  }

  &:active {
    background-color: #349f32;
  }
`;
