import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

function DateRangeFilter({ onDateRangeChange }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSearch = () => {
    if (dateFrom && dateTo) {
      onDateRangeChange(dateFrom, dateTo);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    <div className="date-range-filter flex items-center gap-4 p-4 border rounded shadow-lg bg-white">
      <div className="relative flex items-center">
        <label htmlFor="date-from" className="text-gray-700">
          Date from:
        </label>
        <input
          type="date"
          id="date-from"
          className="date-input"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <FaCalendarAlt className="calendar-icon" />
      </div>

      <div className="relative flex items-center">
        <label htmlFor="date-to" className="text-gray-700">
          Date to:
        </label>
        <input
          type="date"
          id="date-to"
          className="date-input"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <FaCalendarAlt className="calendar-icon" />
      </div>

      <button
        type="button"
        className="search-button bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default DateRangeFilter;
