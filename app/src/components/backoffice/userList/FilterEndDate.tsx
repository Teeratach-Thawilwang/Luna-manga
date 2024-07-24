import { MutableRefObject, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

import CalendarIcon from "@components/iconSvg/CalendarIcon";
import UserListService from "@services/backoffice/UserListService";

export default function FilterEndDate() {
  const currentDate = new Date();
  const userFilter = UserListService.getFilter();
  const startDate = UserListService.getStartDate();
  const endDate = UserListService.getEndDate();
  const boxRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  function handleChange(date: Date | null) {
    UserListService.updateFilter({ end_date: String(date) });
    UserListService.loadUserList(userFilter?.q, userFilter?.status, userFilter?.start_date, String(date), 1, userFilter?.order_by);
  }

  function onClickHandle() {
    // boxRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  return (
    <Box ref={boxRef} onClick={onClickHandle}>
      <DatePickerCustom
        selected={endDate ? new Date(endDate) : null}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="End Date"
        maxDate={currentDate}
        minDate={startDate ? new Date(startDate) : null}
      />
      <IconBox onClick={() => UserListService.updateFilter({ end_date: null })}>
        <CalendarIcon />
      </IconBox>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  position: relative;

  margin-left: 20px;
  z-index: 99;

  .react-datepicker__header {
    color: #fff;
    background-color: #212b36;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #fff;
  }

  button {
    span::before {
      border-color: #fff;
    }

    &:hover {
      span::before {
        border-color: #e3f1ff;
      }
    }
  }
`;

const DatePickerCustom = styled(DatePicker)`
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  max-width: 200px;
  height: 50px;
  padding-left: 20px;

  border-radius: 5px;

  background-color: #fff;

  font-size: 18px;

  &:focus {
    border: 1px solid #ccc;
    outline: none;
  }

  &::placeholder {
    color: #000;
    font-size: 18px;
  }
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-left: auto;

  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    fill: #000;
  }
`;
