import React, { useState, useEffect, useCallback } from "react";
import { Api } from "../../api/api.config";
import * as XLSX from "xlsx";

const isAdmin = localStorage.getItem("isAdmin");

function Report() {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For holding filtered results
  const [dateFrom, setDateFrom] = useState(null); // State to store the start date
  const [dateTo, setDateTo] = useState(null); // State to store the end date

  const fetchReportData = useCallback(async () => {
    // Check if both dates are selected
    if (!dateFrom || !dateTo) {
      alert("Please select both start and end dates.");
      console.log("Date From:", dateFrom);
      console.log("Date To:", dateTo);
      return;
    }

    const formattedDateFrom = dateFrom.toISOString().split("T")[0]; // Ensure correct format
    const formattedDateTo = dateTo.toISOString().split("T")[0]; // Ensure correct format

    console.log("Fetching report data with:", {
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
    });

    try {
      const response = await Api.get("allaccounts", {
        params: {
          dateFrom: formattedDateFrom,
          dateTo: formattedDateTo,
        },
      });

      if (response.status === 200) {
        console.log("Fetched report data:", response.data);
        setReportData(response.data);
        setFilteredData(response.data);
      }
    } catch (error) {
      // Enhanced error logging
      console.error(
        "Error fetching report data:",
        error.response?.data || error
      );
    }
  }, [dateFrom, dateTo]);

  const handleSearch = () => {
    fetchReportData();
  };

  useEffect(() => {
    setFilteredData(reportData);
  }, [reportData]);

  const downloadExcel = async () => {};

  return (
    <div className="flex flex-col items-center">
      {isAdmin === "true" ? (
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-center mb-5">Report Page</h2>

          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="flex flex-col">
              <label htmlFor="start-date">Select Start Date: </label>
              <input
                type="date"
                onChange={(e) => setDateFrom(new Date(e.target.value))}
                className="w-[150px] border border-gray-400 rounded-md p-2 cursor-pointer"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="end-date">Select End Date: </label>
              <input
                type="date"
                onChange={(e) => setDateTo(new Date(e.target.value))}
                className="w-[150px] border border-gray-400 rounded-md p-2 cursor-pointer"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mb-4">
            <button
              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Report Data Table */}
          <div className="report-results mt-10 px-2 lg:px-8">
            {filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                  <thead className="bg-orange-600 text-sm text-white h-20 font-semibold">
                    <tr>
                      <th className="border">User ID</th>
                      <th className="border">Full Name</th>
                      <th className="border">Role</th>
                      <th className="border">Account Number</th>
                      <th className="border">Bank</th>
                      <th className="border">Location</th>
                      <th className="border">Phone Number</th>
                      <th className="border">Early Check-In Count</th>
                      <th className="border">Late Check-In Count</th>
                      <th className="border">Early Check-Out Count</th>
                      <th className="border">Late Check-Out Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((user) => (
                      <tr key={user.UserId} className="hover:bg-gray-100">
                        <td className="border">{user.UserId}</td>
                        <td className="border">{user.FullName}</td>
                        <td className="border">{user.Role}</td>
                        <td className="border">{user.Account_number}</td>
                        <td className="border">{user.Bank}</td>
                        <td className="border">{user.Location}</td>
                        <td className="border">{user.Phone_number}</td>
                        <td className="border">{user.EarlyCheckInCount}</td>
                        <td className="border">{user.LateCheckInCount}</td>
                        <td className="border">{user.EarlyCheckOutCount}</td>
                        <td className="border">{user.LateCheckOutCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-red-500 text-center">
                No report data found for the specified criteria.
              </p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 w-full sm:w-auto"
              onClick={downloadExcel}
            >
              Download as Excel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">You are not an Admin</div>
      )}
    </div>
  );
}

export default Report;

// import React, { useState, useEffect, useCallback } from "react";
// import { Api } from "../../api/api.config";
// import * as XLSX from "xlsx";
// import DateRangeFilter from "./../DateRangeFilter";

// const isAdmin = localStorage.getItem("isAdmin");

// function Report() {
//   const [reportData, setReportData] = useState([]);
//   const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)
//   const [year, setYear] = useState(new Date().getFullYear()); // Current year
//   const [dateFrom, setDateFrom] = useState(null); // State to store the start date
//   const [dateTo, setDateTo] = useState(null); // State to store the end date

//   const fetchReportData = useCallback(async () => {
//     try {
//       const response = await Api.get("/all", {
//         params: {
//           month: month,
//           year: year,
//           dateFrom: dateFrom,
//           dateTo: dateTo,
//         },
//       });
//       if (response.status === 200) {
//         setReportData(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//     }
//   }, [month, year, dateFrom, dateTo]);

//   useEffect(() => {
//     fetchReportData();
//   }, [fetchReportData]);

//   const handleDateRangeChange = (startDate, endDate) => {
//     console.log("Selected Date Range:", startDate, endDate);
//     setDateFrom(startDate);
//     setDateTo(endDate);
//   };

//   const downloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

//     // Generate buffer
//     const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([buffer], { type: "application/octet-stream" });

//     // Create a link to download
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "report.xlsx");

//     // Append link to body
//     document.body.appendChild(link);

//     // Trigger download
//     link.click();

//     // Clean up and remove the link
//     link.parentNode.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {isAdmin === "true" ? (
//         <div className="max-w-[1400px] mx-auto px-4 py-6">
//           <h2 className="text-3xl font-bold text-center mb-5">Report Page</h2>

//           {/* Month and Year Selection */}
//           <div className="flex flex-col sm:flex-row justify-center mb-4">
//             <select
//               value={month}
//               onChange={(e) => setMonth(Number(e.target.value))}
//               className="border rounded px-4 py-2 mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
//             >
//               {Array.from({ length: 12 }, (_, index) => (
//                 <option key={index} value={index + 1}>
//                   {new Date(0, index).toLocaleString("default", {
//                     month: "long",
//                   })}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={year}
//               onChange={(e) => setYear(Number(e.target.value))}
//               className="border rounded px-4 py-2 w-full sm:w-auto"
//             >
//               {Array.from({ length: 10 }, (_, index) => (
//                 <option key={index} value={2024 + index}>
//                   {2024 + index}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <DateRangeFilter onDateRangeChange={handleDateRangeChange} />

//           {/* Report Data Table */}
//           <div className="report-results mt-10 px-2 lg:px-8">
//             {reportData.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border">
//                   <thead className="bg-orange-600 text-sm text-white h-20 font-semibold">
//                     <tr>
//                       <th className="border">User ID</th>
//                       <th className="border">Full Name</th>
//                       <th className="border">Role</th>
//                       <th className="border">Check-In Early Count</th>
//                       <th className="border">Check-In Late Count</th>
//                       <th className="border">Check-Out Early Count</th>
//                       <th className="border">Check-Out Late Count</th>
//                       {/* Add more headers as needed */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reportData.map((user) => (
//                       <tr key={user.userId} className="hover:bg-gray-100">
//                         <td className="border">{user.userId}</td>
//                         <td className="border">{user.fullName}</td>
//                         <td className="border">{user.role}</td>
//                         <td className="border">
//                           {user.checkInDetails.earlyCount}
//                         </td>
//                         <td className="border">
//                           {user.checkInDetails.lateCount}
//                         </td>
//                         <td className="border">
//                           {user.checkOutDetails.earlyCount}
//                         </td>
//                         <td className="border">
//                           {user.checkOutDetails.lateCount}
//                         </td>
//                         {/* Add more data cells as needed */}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-red-500 text-center">
//                 No report data found for the specified month and year.
//               </p>
//             )}
//           </div>

//           <div className="flex justify-center mt-6">
//             <button
//               className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 w-full sm:w-auto"
//               onClick={downloadExcel}
//             >
//               Download as Excel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center mt-6">You are not an Admin</div>
//       )}
//     </div>
//   );
// }

// export default Report;
