import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import * as XLSX from "xlsx"; // Import the xlsx library
import DateRangeFilter from "./../DateRangeFilter"; // Import DateRangeFilter

const isAdmin = localStorage.getItem("isAdmin");

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

  // Wrap fetchReportData with useCallback
  const fetchReportData = useCallback(() => {
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
  }, [dateRange]); // Include dateRange as a dependency

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]); // Now it's safe to include fetchReportData

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
    <div>
      {isAdmin === "true" ?
      <div className="max-w-[1400px] mx-auto px-2 py-3">
        <h2 className="text-3xl font-bold text-center mb-5">Report Page</h2>
        <DateRangeFilter onDateRangeChange={handleDateRangeChange} />

        <div className="report-results mt-10 px-2 lg:px-8">
          {reportData.length > 0 ? (
            <>
              {/* Responsive grid for smaller screens */}
              <div className="grid gap-6 md:hidden">
                {reportData.map((data, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                  >
                    <p className="font-bold">S/N: {index + 1}</p>
                    <p className="font-bold">Username: {data.username}</p>
                    <p>
                      Date:{" "}
                      {new Date(data.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p>Time Checked In: {data.timeCheckedIn}</p>
                    <p>Status: {formatStatus(data.checkInTime)}</p>
                    <p>Time Checked Out: {data.timeCheckedOut}</p>
                    <p>State: {data.state}</p>
                    <p>Location: {data.location}</p>
                    <p>Full Name: {data.fullName}</p>
                    <p>Phone Number: {data.phoneNumber}</p>
                  </div>
                ))}
              </div>

              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full table-auto border">
                  <thead className="bg-orange-600 text-sm text-white h-20 font-semibold">
                    <tr>
                      <th className="p-2">S/N</th>
                      <th className="p-2">Username</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Time Checked In</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Time Checked Out</th>
                      <th className="p-2">State</th>
                      <th className="p-2">Location</th>
                      <th className="p-2">Full Name</th>
                      <th className="p-2">Phone Number</th>
                      {/* Hide these columns on smaller screens */}
                      <th className="p-2 hidden lg:table-cell">Bank Name</th>
                      <th className="p-2 hidden lg:table-cell">Account Number</th>
                      <th className="p-2 hidden lg:table-cell">Account Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((data, index) => (
                      <tr key={index} className="py-4 bg-red-50 text-sm">
                        <td className="p-2">{index + 1}</td>
                        <td className="py-3 p-2">{data.username}</td>
                        <td className="p-2">
                          {new Date(data.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-2">{data.timeCheckedIn}</td>
                        <td className="p-2">{formatStatus(data.checkInTime)}</td>
                        <td className="p-2">{data.timeCheckedOut}</td>
                        <td className="p-2">{data.state}</td>
                        <td className="p-2">{data.location}</td>
                        <td className="p-2">{data.fullName}</td>
                        <td className="p-2">{data.phoneNumber}</td>
                        {/* Hidden columns for smaller screens */}
                        <td className="p-2 hidden lg:table-cell">
                          {data.bankName}
                        </td>
                        <td className="p-2 hidden lg:table-cell">
                          {data.accountNumber}
                        </td>
                        <td className="p-2 hidden lg:table-cell">
                          {data.accountName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-center">
              No report data found for the selected range.
            </p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600"
            onClick={downloadExcel}
          >
            Download as Excel
          </button>
        </div>
      </div>
      :
      <div>You are not an Admin</div>
    }
    </div>
  );
}

export default Report;
