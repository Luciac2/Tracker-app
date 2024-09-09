import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library

// Sample data for demonstration with new fields
const sampleUserData = [
  {
    username: "John Doe",
    date: "2024-08-30",
    timeCheckedIn: "08:00 AM",
    timeCheckedOut: "05:00 PM",
    imageUploaded: "john.jpg",
    state: "NY",
    location: "Office",
    fullName: "Johnathan Ola",
    phoneNumber: "0800000000",
    bankName: "First Bank",
    accountNumber: "123456789",
    accountName: "John Ola",
    checkInTime: "07:55 AM", // Added checkInTime field
  },
  {
    username: "Jane Ola",
    date: "2024-08-29",
    timeCheckedIn: "09:00 AM",
    timeCheckedOut: "06:00 PM",
    imageUploaded: "jane.jpg",
    state: "CA",
    location: "Home",
    fullName: "Jane Smith",
    phoneNumber: "987-654-3210",
    bankName: "Chase",
    accountNumber: "987654321",
    accountName: "Jane Doe",
    checkInTime: "08:45 AM", // Added checkInTime field
  },
  // ... add more sample data with new fields
];

function Report() {
  const [selectedRange, setSelectedRange] = useState("today");
  const [reportData, setReportData] = useState([]);
  const [customDate, setCustomDate] = useState(""); // State for the custom date

  useEffect(() => {
    if (selectedRange) {
      fetchReportData(selectedRange);
    }
  }, [selectedRange, customDate]); // Re-run the effect when customDate changes

  const fetchReportData = (range) => {
    let filteredData = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    switch (range) {
      case "today":
        filteredData = sampleUserData.filter(
          (data) => new Date(data.date).toDateString() === today.toDateString()
        );
        break;
      case "yesterday":
        filteredData = sampleUserData.filter(
          (data) =>
            new Date(data.date).toDateString() === yesterday.toDateString()
        );
        break;
      case "last7days":
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filteredData = sampleUserData.filter(
          (data) =>
            new Date(data.date) >= lastWeek && new Date(data.date) <= today
        );
        break;
      case "thisMonth":
        const thisMonthStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        filteredData = sampleUserData.filter(
          (data) => new Date(data.date) >= thisMonthStart
        );
        break;
      case "lastMonth":
        const lastMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredData = sampleUserData.filter(
          (data) =>
            new Date(data.date) >= lastMonthStart &&
            new Date(data.date) <= lastMonthEnd
        );
        break;
      case "customDate":
        if (customDate) {
          filteredData = sampleUserData.filter(
            (data) =>
              new Date(data.date).toDateString() ===
              new Date(customDate).toDateString()
          );
        }
        break;
      default:
        break;
    }

    setReportData(filteredData);
  };

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const handleDateChange = (e) => {
    setCustomDate(e.target.value);
    setSelectedRange("customDate");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "Report.xlsx");
  };

  const formatStatus = (time) => {
    const checkInTime = new Date(`1970-01-01T${time}`);
    const earlyStart = new Date("1970-01-01T06:00:00");
    const earlyEnd = new Date("1970-01-01T08:30:00");
    const lateStart = new Date("1970-01-01T08:40:00");
    const lateEnd = new Date("1970-01-01T12:00:00");

    if (checkInTime >= earlyStart && checkInTime <= earlyEnd) {
      return "E"; // Early
    } else if (checkInTime >= lateStart && checkInTime <= lateEnd) {
      return "L"; // Late
    }
    return "";
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2 py-3">
      <h2 className="text-3xl font-bold text-center">Report Page</h2>
      <div className="report-filter">
        <p className="text-lg">Select range:</p>
        <select
          value={selectedRange}
          onChange={handleRangeChange}
          className="w-full border h-10 xl:h-12 px-2 outline-none cursor-pointer"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="customDate">Custom Date</option>
        </select>
        {selectedRange === "customDate" && (
          <input
            type="date"
            value={customDate}
            onChange={handleDateChange}
            className="w-full border h-10 xl:h-12 px-2 outline-none cursor-pointer"
          />
        )}
        <button
          className="text-orange-700"
          onClick={() => fetchReportData(selectedRange)}
        >
          Show Report
        </button>
        <button className="text-orange-700 ml-4" onClick={downloadExcel}>
          Download as Excel
        </button>
      </div>

      <div className="report-results text-center mt-8 px-4">
        {reportData.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-orange-600 text-sm text-white h-12 font-semibold">
              <tr>
                <th>S/N</th>
                <th>Username</th>
                <th>Date</th>
                <th>Time Checked In</th>
                <th>Status</th> {/* Added column header for Status */}
                <th>Time Checked Out</th>
                <th>Image Uploaded</th>
                <th>State</th>
                <th>Location</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Bank Name</th>
                <th>Account Number</th>
                <th>Account Name</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={index} className="py-4 bg-red-50">
                  <td>{index + 1}</td>
                  <td className="py-3">{data.username}</td>
                  <td>
                    {new Date(data.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>{data.timeCheckedIn}</td>
                  <td>{formatStatus(data.timeCheckedIn)}</td>{" "}
                  {/* Added Status data */}
                  <td>{data.timeCheckedOut}</td>
                  <td>{data.imageUploaded}</td>
                  <td>{data.state}</td>
                  <td>{data.location}</td>
                  <td>{data.fullName || "N/A"}</td>
                  <td>{data.phoneNumber || "N/A"}</td>
                  <td>{data.bankName || "N/A"}</td>
                  <td>{data.accountNumber || "N/A"}</td>
                  <td>{data.accountName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black font-semibold text-lg">
            No data available for the selected range....
          </p>
        )}
      </div>
    </div>
  );
}

export default Report;
