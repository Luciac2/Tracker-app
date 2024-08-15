// import React, { useState, useEffect } from "react";
// import { checkin } from "../CheckinPage"; // API call for check-in

// const CheckinPage = () => {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [timestamp, setTimestamp] = useState(null);

//   useEffect(() => {
//     // Get the GPS coordinates of the user
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLocation({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       });
//     });
//   }, []);

//   const handleCheckin = async () => {
//     const currentTime = new Date();
//     setTimestamp(currentTime);

//     const data = {
//       location,
//       timestamp: currentTime.toISOString(),
//     };

//     try {
//       await checkin(data); // Send to server
//       alert("Check-in successful");
//     } catch (error) {
//       console.error("Error checking in:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Check In</h2>
//       <p>
//         Current Location: {location.latitude}, {location.longitude}
//       </p>
//       <button onClick={handleCheckin}>Check In</button>
//     </div>
//   );
// };

// export default CheckinPage;
