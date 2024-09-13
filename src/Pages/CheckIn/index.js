import React, { useState } from "react";
import axios from "axios";

const CheckInForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a picture for check-in.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("checkIn", selectedFile); // Adjust the key if needed

    // Optional: Log FormData to check if the file is attached correctly
    console.log("FormData:", formData.get("checkIn"));

    try {
      const res = await axios.post(
        "https://odlcontractattendance.onrender.com/api/v1/checkin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data); // Save the response data
      console.log("API Response:", res.data); // Log the response data
    } catch (error) {
      console.error("Error during check-in:", error);

      // Capture and display detailed error messages
      if (error.response) {
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
        setError(error.response.data); // Show error message from the server
      } else if (error.request) {
        console.error("Error Request:", error.request);
        setError("No response received from the server.");
      } else {
        console.error("Error Message:", error.message);
        setError("Error in setting up the request.");
      }
    }
  };
  console.log(response);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Select Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Check In</button>
      </form>

      {response && (
        <div>
          <h3>Check-In Successful!</h3>
          <p>Message: {response.message}</p>
          <p>Location: {response.data?.location}</p>
          <p>Time In: {response.data?.timeIn}</p>
          <p>Recommended Rating: {response.data?.recommendedRating}</p>
          <img
            src={response.data?.attendancePicture?.pictureUrl}
            alt="Attendance"
          />
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <h3>Error:</h3>
          <p>{typeof error === "string" ? error : JSON.stringify(error)}</p>
        </div>
      )}
    </div>
  );
};

export default CheckInForm;
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const userId = "user123"; // Replace with actual user ID
//   const userName = "John Doe"; // Replace with actual user name
//   const allowedLocation = { lat: 6.5566, lon: 3.349 };
//   const allowedTimeZoneOffset = new Date().getTimezoneOffset();
//   const [previewImage, setPreviewImage] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const [userData, setUserData] = useState({
//     id: userId,
//     name: userName,
//     months: {},
//   });
//   const [currentMonth, setCurrentMonth] = useState(
//     new Date().toLocaleString("default", { month: "long" })
//   );
//   const [clickedCheckIn, setClickedCheckIn] = useState(false);
//   const [clickedCheckOut, setClickedCheckOut] = useState(false);
//   const [nextCheckInTime, setNextCheckInTime] = useState(null);
//   const [locationError, setLocationError] = useState("");
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Function to check if the user can click the check-in button today
//   const canClickCheckIn = () => {
//     const now = new Date();
//     const nextCheckIn = nextCheckInTime ? new Date(nextCheckInTime) : null;
//     return (
//       now >=
//         new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0) &&
//       (!nextCheckIn || now > nextCheckIn)
//     );
//   };

//   // Function to check if the user can click the check-out button today
//   const canClickCheckOut = () => {
//     const now = new Date();
//     return (
//       clickedCheckIn &&
//       now <=
//         new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0)
//     );
//   };

//   // Function to handle check-in button click
//   const handleCheckInClick = () => {
//     // Check user ID
//     if (userId !== "user123") {
//       console.log("User ID mismatch");
//       return;
//     }

//     // Get the user's location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log(latitude.toFixed(4), longitude);
//           // Check if location matches
//           if (
//             latitude.toFixed(4) === allowedLocation.lat.toFixed(4) &&
//             longitude.toFixed(4) === allowedLocation.lon.toFixed(4)
//           ) {
//             // Check if timestamp matches the user's current time zone
//             if (new Date().getTimezoneOffset() === allowedTimeZoneOffset) {
//               // Record check-in
//               uploadCheckInData(latitude, longitude); // Call the function to handle API request
//             } else {
//               console.log("Timestamp does not match user's current location.");
//               logoutUser();
//             }
//           } else {
//             console.log("Location does not match allowed location.");
//             setLocationError("Location does not match allowed location.");
//             logoutUser();
//           }
//         },
//         (error) => {
//           console.log("Geolocation error: ", error.message);
//           setLocationError("Unable to access location.");
//           logoutUser();
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//       setLocationError("Geolocation not supported.");
//       logoutUser();
//     }
//   };

//   // Function to log out the user
//   const logoutUser = () => {
//     console.log("Logging out user due to location or timestamp mismatch.");
//     // Perform actual logout logic, such as clearing user session and redirecting to the login page
//     setUserData({
//       id: "",
//       name: "",
//       months: {},
//     });
//     window.location.href = "/login"; // Redirect to the login page
//   };

//   // Function to upload check-in data
//   const uploadCheckInData = (latitude, longitude) => {
//     if (!selectedFile) {
//       console.log("No file selected");
//       setLocationError("Please upload a picture to check in.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("checkIn", selectedFile);

//     axios
//       .post("/checkin", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         const { data } = response.data;
//         console.log("Check-in clicked");

//         // Record data in user calendar
//         const now = new Date();
//         const today = now.toISOString().split("T")[0];
//         const dayOfWeek = now.toLocaleString("default", { weekday: "long" });
//         const newDayData = {
//           day: dayOfWeek,
//           date: today,
//           timeCheckedIn: now.toLocaleTimeString(),
//           late: now.getHours() >= 6,
//           currentLocation: `${latitude}, ${longitude}`,
//           pictureUploaded: selectedFile && selectedFile.name,
//           pictureUrl: data.attendancePicture.pictureUrl, // Include picture URL from response
//           recommendedRating: data.recommendedRating, // Include recommended rating from response
//         };

//         setUserData((prev) => {
//           const updatedMonths = { ...prev.months };
//           if (!updatedMonths[currentMonth]) {
//             updatedMonths[currentMonth] = [];
//           }
//           updatedMonths[currentMonth].push(newDayData);
//           return { ...prev, months: updatedMonths };
//         });

//         setClickedCheckIn(true);
//         setNextCheckInTime(
//           new Date(
//             now.getFullYear(),
//             now.getMonth(),
//             now.getDate() + 1,
//             6,
//             0,
//             0
//           )
//         );
//       })
//       .catch((error) => {
//         console.log("Error uploading check-in data: ", error.message);
//         setLocationError("Error uploading check-in data.");
//       });
//   };

//   // Function to handle check-out button click
//   const handleCheckOutClick = () => {
//     const now = new Date();
//     if (clickedCheckIn) {
//       setClickedCheckOut(true);
//       console.log("Check-out clicked");

//       // Update the check-out time in the user's data
//       setUserData((prev) => {
//         const updatedMonths = { ...prev.months };
//         const todayData = updatedMonths[currentMonth].find(
//           (day) => day.date === now.toISOString().split("T")[0]
//         );
//         if (todayData) {
//           todayData.timeCheckedOut = now.toLocaleTimeString();
//         }
//         return { ...prev, months: updatedMonths };
//       });
//     } else {
//       console.log("Cannot check out before checking in.");
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto px-3 mt-4">
//       <div className="mb-4">
//         <h4 className="text-3xl">Welcome {userName}</h4>
//         <p>Check in for today</p>
//       </div>
//       <div className="form mt-20">
//         <div className="grid grid-cols-2 gap-10">
//           <div className="col-span-2">
//             <label htmlFor="selectedFile">Upload Image:</label>
//             {previewImage ? (
//               <div>
//                 <img
//                   src={previewImage}
//                   alt="preview"
//                   className="w-full h-[30em] object-cover"
//                 />
//                 <p className="text-xl mt-1 font-semibold">
//                   {selectedFile && selectedFile.name}
//                 </p>
//               </div>
//             ) : (
//               <input
//                 id="selectedFile"
//                 name="selectedFile"
//                 type="file"
//                 onChange={handleFileChange}
//                 placeholder="upload file"
//                 className="border text-primary rounded-sm w-full h-60 py-2.5 sm:py-4 px-2 mt-0.5 outline-0 placeholder:text-sm sm:placeholder:text-base"
//               />
//             )}
//             <p
//               id="email-error"
//               className="text-red-400 text-xs font-semibold sm:text-sm"
//             ></p>
//           </div>
//           <div className="col-span-2">
//             <div>
//               <button
//                 onClick={handleCheckInClick}
//                 disabled={clickedCheckIn || !canClickCheckIn()}
//                 className="py-4 px-10 bg-orange-500 text-white w-6/12 rounded-md disabled:bg-gray-200"
//               >
//                 Check In
//               </button>
//               <button
//                 onClick={handleCheckOutClick}
//                 disabled={clickedCheckOut || !canClickCheckOut()}
//                 className="py-4 px-10 bg-red-400 text-white w-6/12 rounded-md disabled:bg-gray-200"
//               >
//                 Check Out
//               </button>
//               {locationError && <p className="text-red-400">{locationError}</p>}
//             </div>
//             <div className="mt-4">
//               <div>
//                 <h4>Attendance:</h4>
//                 <ul>
//                   {userData.months[currentMonth] &&
//                     userData.months[currentMonth].map((day, index) => (
//                       <li key={index}>
//                         {day.day} ({day.date}):{" "}
//                         {day.timeCheckedIn
//                           ? `Checked in at ${day.timeCheckedIn}`
//                           : "Not Checked in"}{" "}
//                         {day.timeCheckedOut
//                           ? `and checked out at ${day.timeCheckedOut}`
//                           : ""}
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
