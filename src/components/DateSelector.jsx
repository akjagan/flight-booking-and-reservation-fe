import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <h2>Select a Date:</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Pick a date"
        className="border p-2 rounded"
      />
    </div>
  );
};

export default DateSelector;
