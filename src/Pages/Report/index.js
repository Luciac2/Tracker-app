import React, { useState, useEffect } from 'react';

// Sample data for demonstration
const sampleUserData = [
  { username: 'John Doe', date: '2024-08-30', timeCheckedIn: '08:00 AM', timeCheckedOut: '05:00 PM', imageUploaded: 'john.jpg' },
  { username: 'Jane Doe', date: '2024-08-29', timeCheckedIn: '09:00 AM', timeCheckedOut: '06:00 PM', imageUploaded: 'jane.jpg' },
  { username: 'Jane Doe', date: '2024-06-20', timeCheckedIn: '09:00 AM', timeCheckedOut: '06:00 PM', imageUploaded: 'jane.jpg' },
  { username: 'Jane Doe', date: '2024-07-28', timeCheckedIn: '09:00 AM', timeCheckedOut: '06:00 PM', imageUploaded: 'jane.jpg' },
  { username: 'Jane Doe', date: '2024-08-31', timeCheckedIn: '09:00 AM', timeCheckedOut: '06:00 PM', imageUploaded: 'jane.jpg' },
  // ... add more sample data for different dates
];

function Report () {
  const [selectedRange, setSelectedRange] = useState('today');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Fetch report data based on selected range
    if (selectedRange) {
      fetchReportData(selectedRange);
    }
  }, [selectedRange]);

  const fetchReportData = (range) => {
    let filteredData = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    switch (range) {
      case 'today':
        filteredData = sampleUserData.filter(data => new Date(data.date).toDateString() === today.toDateString());
        break;
      case 'yesterday':
        filteredData = sampleUserData.filter(data => new Date(data.date).toDateString() === yesterday.toDateString());
        break;
      case 'last7days':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filteredData = sampleUserData.filter(data => new Date(data.date) >= lastWeek && new Date(data.date) <= today);
        break;
      case 'thisMonth':
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredData = sampleUserData.filter(data => new Date(data.date) >= thisMonthStart);
        break;
      case 'lastMonth':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredData = sampleUserData.filter(data => new Date(data.date) >= lastMonthStart && new Date(data.date) <= lastMonthEnd);
        break;
      default:
        break;
    }

    setReportData(filteredData);
  };

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2 py-3">
      <h2 className='text-3xl font-bold text-center'>Report Page</h2>
      <div className="report-filter">
        <p className='text-lg'>Select range:</p>
        <select value={selectedRange} onChange={handleRangeChange} className='w-full border h-10 xl:h-12 px-2 outline-none cursor-pointer'>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
        <button className='text-orange-700' onClick={() => fetchReportData(selectedRange)}>Show Report</button>
      </div>

      <div className="report-results text-center mt-8 px-4">
        {reportData.length > 0 ? (
          <table className='w-full border'> 
            <thead className='bg-orange-600 text-sm text-white h-12 font-semibold'>
              <tr className=''>
                <th>S/N</th>
                <th className=''>Username</th>
                <th>Date</th>
                <th>Time Checked In</th>
                <th>Time Checked Out</th>
                <th>Image Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={index} className='py-4 bg-red-50'>
                    <td>{index + 1}</td> {/* Index number */}
                    <td className='py-3'>{data.username}</td>
                    <td>{new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                    <td>{data.timeCheckedIn}</td>
                    <td>{data.timeCheckedOut}</td>
                    <td>{data.imageUploaded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-black font-semibold text-lg'>No data available for the selected range....</p>
        )}
      </div>
    </div>
  );
};

export default Report;
