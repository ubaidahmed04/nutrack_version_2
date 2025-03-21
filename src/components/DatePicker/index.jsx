import React from "react";
import moment from "moment";
import { DatePicker, Space } from "antd";

const DatePickerComponent = ({ onChange, date }) => (
  <Space direction="vertical">
    <DatePicker 
      onChange={onChange} 
      className="w-full" 
      format="DD-MMMM-YYYY"
      value={date ? moment(date, 'DD-MMMM-YYYY') : null}
    />
  </Space>
);


export default DatePickerComponent;
