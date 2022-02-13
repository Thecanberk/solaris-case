import React, { useState } from "react";
import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import "./customDatePicker.css";

interface ICustomDatePicker {
    date: string;
    increaseClicked?: (arg0: any) => void;
    decreaseClicked?: (arg0: any) => void;
}

const CustomDatePicker = ({date, increaseClicked, decreaseClicked}: ICustomDatePicker) => {

  return (
    <>
      <div className="date-picker-container">
        <a href="#"  onClick={increaseClicked} className="btn btn--white btn--animated">
          <div className="date-picker-btn"> + </div>
        </a>
        <div className="date-text">{date}</div>
        <a href="#" onClick={decreaseClicked} className="btn btn--white btn--animated">
          <div className="date-picker-btn"> - </div>
        </a>
      </div>
    </>
  );
};

export default CustomDatePicker;
