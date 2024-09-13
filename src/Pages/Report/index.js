import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import DateRangeFilter from "./../DateRangeFilter"; // Import DateRangeFilter

const sampleUserData = [
  // Sample user data for demonstration with new fields
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
    checkInTime: "07:55 AM",
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
    checkInTime: "08:45 AM",
  },
];

function Report() {
  const [reportData, setReportData] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = () => {
    let filteredData = [];
    const { startDate, endDate } = dateRange;
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    filteredData = sampleUserData.filter((data) => {
      const date = new Date(data.date);
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return date >= start && date <= end;
      } else {
        return date >= lastWeek && date <= today;
      }
    });

    setReportData(filteredData);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
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
      <DateRangeFilter onDateRangeChange={handleDateRangeChange} />

      <div className="report-results text-center mt-10 px-8">
        {reportData.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-orange-600 text-sm text-white h-20 font-semibold">
              <tr>
                <th>S/N</th>
                <th>Username</th>
                <th>Date</th>
                <th>Time Checked In</th>
                <th>Status</th>
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
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{data.timeCheckedIn}</td>
                  <td>{formatStatus(data.checkInTime)}</td>
                  <td>{data.timeCheckedOut}</td>
                  <td>{data.imageUploaded}</td>
                  <td>{data.state}</td>
                  <td>{data.location}</td>
                  <td>{data.fullName}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{data.bankName}</td>
                  <td>{data.accountNumber}</td>
                  <td>{data.accountName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500">
            No report data found for the selected range.
          </p>
        )}
      </div>

      <button className="text-orange-700 mt-4" onClick={downloadExcel}>
        Download as Excel
      </button>
    </div>
  );
}

export default Report;
