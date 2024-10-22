import React, { useState, useCallback } from "react";
import { Api } from "../../api/api.config";

const isAdmin = localStorage.getItem("isAdmin");

function Report() {
  const [reportData, setReportData] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [message, setMessage] = useState("");

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchReportData = useCallback(async () => {
    if (!dateFrom || !dateTo) {
      alert("Please select both start and end dates.");
      return;
    }

    const formattedDateFrom = formatDate(dateFrom);
    const formattedDateTo = formatDate(dateTo);

    try {
      const response = await Api.post("viewaccounts", {
        dateFrom: formattedDateFrom,
        dateTo: formattedDateTo,
      });

      if (response.status === 200) {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        if (data.length === 0) {
          setMessage("No data available for the selected date range.");
        } else {
          setReportData(data);
          setMessage("Report data fetched for preview.");
        }
      } else {
        setMessage("Error: Unable to fetch report data.");
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        if (error.response.data) {
          if (typeof error.response.data === "string") {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else {
          errorMessage = error.message;
        }
      }
      setMessage(`Error: ${errorMessage}`);
    }
  }, [dateFrom, dateTo]);

  const handleDownload = async () => {
    if (!dateFrom || !dateTo) {
      alert("Please select both start and end dates.");
      return;
    }

    const formattedDateFrom = formatDate(dateFrom);
    const formattedDateTo = formatDate(dateTo);

    try {
      const response = await Api.post(
        "allaccounts",
        {
          dateFrom: formattedDateFrom,
          dateTo: formattedDateTo,
        },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `report-${formattedDateFrom}-${formattedDateTo}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        setMessage(
          `File downloaded successfully: report-${formattedDateFrom}-${formattedDateTo}.xlsx`
        );
      } else {
        const errorBlob = response.data;
        const errorText = await errorBlob.text();
        setMessage(`Error: ${errorText || "An unexpected error occurred."}`);
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        if (error.response.data) {
          if (typeof error.response.data === "string") {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else {
          errorMessage = error.message;
        }
      }

      setMessage(`Error: ${errorMessage}`);
    }
  };

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

          <div className="flex justify-center mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
              onClick={fetchReportData}
            >
              Preview
            </button>
            <button
              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>

          {message && <p className="text-center text-orange-500">{message}</p>}

          <div className="report-results mt-10 px-2 lg:px-8">
            {reportData.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                  <thead className="bg-blue-600 text-sm text-white h-20 font-semibold">
                    <tr>
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
                    {reportData.map((user) => (
                      <tr key={user.userId} className="hover:bg-gray-100">
                        <td className="border text-center font-bold text-lg">
                          {user.fullName}
                        </td>
                        <td className="border text-center">{user.role}</td>
                        <td className="border text-center">
                          {user.accountNumber}
                        </td>
                        <td className="border text-center">{user.bankName}</td>
                        <td className="border text-center">
                          {user.location || "N/A"}
                        </td>
                        <td className="border text-center">
                          {user.phoneNumber || "N/A"}
                        </td>
                        <td className="border text-center font-bold text-xl">
                          {user.checkInDetails.earlyCount || 0}
                        </td>
                        <td className="border text-center font-bold text-xl">
                          {user.checkInDetails.lateCount || 0}
                        </td>
                        <td className="border text-center font-bold text-xl">
                          {user.checkOutDetails.earlyCount || 0}
                        </td>
                        <td className="border text-center font-bold text-xl">
                          {user.checkOutDetails.lateCount || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">You are not an Admin</div>
      )}
    </div>
  );
}

export default Report;
