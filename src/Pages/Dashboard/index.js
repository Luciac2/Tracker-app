import { useEffect, useState } from "react";
// import MyButton from "./woo";

function Dashboard() {
    // Assuming you have access to the user's ID, name, and location
    const userId = "user123"; // Replace with actual user ID
    const userName = "John Doe"; // Replace with actual user name
    const allowedLocation = { lat: 6.5143, lon: 3.3718 }; // Replace with your allowed location
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState("")

    const [userData, setUserData] = useState({
    id: userId,
    name: userName,
    months: {}
    });
    const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [clickedCheckIn, setClickedCheckIn] = useState(false);
    const [clickedCheckOut, setClickedCheckOut] = useState(false);
    const [nextCheckInTime, setNextCheckInTime] = useState(null);
    const [locationError, setLocationError] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Function to check if the user can click the check-in button today
    const canClickCheckIn = () => {
    const now = new Date();
    const nextCheckIn = nextCheckInTime ? new Date(nextCheckInTime) : null;
    return now >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0) && (!nextCheckIn || now > nextCheckIn);
    };

    // Function to check if the user can click the check-out button today
    const canClickCheckOut = () => {
    const now = new Date();
    return clickedCheckIn && now <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);
    };

    // Function to handle check-in button click
    const handleCheckInClick = () => {
    // Check user ID
    if (userId !== "user123") {
        console.log("User ID mismatch");
        return;
    }

    // Get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude.toFixed(4), longitude)
        // Check if location matches
        if (latitude.toFixed(4) === allowedLocation.lat.toFixed(4) && longitude.toFixed(4) === allowedLocation.lon.toFixed(4)) {
            // Record click
            const now = new Date();
            setClickedCheckIn(true);
            setNextCheckInTime(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 6, 0, 0));
            console.log("Check-in clicked");

            // Record data in user calendar
            const today = now.toISOString().split('T')[0];
            const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
            const newDayData = {
            day: dayOfWeek,
            date: today,
            timeCheckedIn: now.toLocaleTimeString(),
            late: now.getHours() >= 6,
            currentLocation: `${latitude}, ${longitude}`,
            // feelingToday: '',
            pictureUploaded: selectedFile && selectedFile
            };

            setUserData(prev => {
            const updatedMonths = { ...prev.months };
            if (!updatedMonths[currentMonth]) {
                updatedMonths[currentMonth] = [];
            }
            updatedMonths[currentMonth].push(newDayData);
            return { ...prev, months: updatedMonths };
            });

        } else {
            console.log("Location does not match allowed location.");
            setLocationError("Location does not match allowed location.");
        }
        }, error => {
        console.log("Geolocation error: ", error.message);
        setLocationError("Unable to access location.");
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
        setLocationError("Geolocation not supported.");
    }
    };

    // console.log(userData)
    // Function to handle check-out button click
    const handleCheckOutClick = () => {
    const now = new Date();
    if (clickedCheckIn) {
        setClickedCheckOut(true);
        console.log("Check-out clicked");

        // Update the check-out time in the user's data
        setUserData(prev => {
        const updatedMonths = { ...prev.months };
        const todayData = updatedMonths[currentMonth].find(day => day.date === now.toISOString().split('T')[0]);
        if (todayData) {
            todayData.timeCheckedOut = now.toLocaleTimeString();
        }
        return { ...prev, months: updatedMonths };
        });
    } else {
        console.log("Cannot check out before checking in.");
    }
    };

    useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
    }, []);



// const [userData, setUserData] = useState({
//     timeChecked: 20.2,
//     dateChecked: new Date(),
//     totalNumberOfDays: 0,
//     numberOfLateDays: 0,

// })

// const handleChange = (e) => {
//     const { name, value, checked, type } = e.target
//     setFormData(prev => {
//         return {
//         ...prev,
//         [name]: type === "checkbox" ? checked : value
//         }
//     })
// }


const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
    };

// const handleSubmit = (e) => {
//     console.log("submission successful")
//     setUserData(prev => {
//         return {
//             ...prev,
//             totalNumberOfDays : userData.totalNumberOfDays+1
//         }
//     })
//     console.log(userData.dateChecked)
//     if(userData.timeChecked > 20 ){
//         console.log("you are late")
//         setUserData(prev => {
//             return {
//                 ...prev,
//                 numberOfLateDays: userData.numberOfLateDays+1
//             }
//         })}
//     else if(userData.timeChecked <= 20) {
//         console.log("you are early")
//     }
// }

    return ( 
        <div className="max-w-[1400px] mx-auto px-3 mt-4">
            <div clas>
                <h4 className="text-3xl">Welcome Samuel Adekoya</h4>
                <p>Check in for today</p>
            </div>
            <div className="form mt-20">
                <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-2">
                        <label htmlFor="selectedFile">Upload Image:</label>
                        {
                            previewImage ? 
                            <div>
                                <img src={previewImage} alt="preview" className="w-full h-[30em] obejct-cover" />
                                <p className="text-xl mt-1 font-semibold">{selectedFile && selectedFile.name}</p>
                            </div> :
                            <input 
                            id="selectedFile"
                            name="selectedFile"
                            type="file" 
                            // value={selectedFile}
                            onChange={handleFileChange} 
                            placeholder="upload file" 
                            className="border text-primary rounded-sm w-full h-60 py-2.5 sm:py-4 px-2 mt-0.5 outline-0 placeholder:text-sm sm:placeholder:text-base"
                        />
                        }
                        <p id="email-error" className="text-red-400 text-xs  font-semibold sm:text-sm"></p>
                    </div>
                    <div className="col-span-2">
                        <div>
                            <button onClick={handleCheckInClick} disabled={clickedCheckIn || !canClickCheckIn()} className='py-4 px-10 bg-orange-500 text-white w-6/12 rounded-md disabled:opacity-50 block'>
                                {clickedCheckIn ? "Come back tomorrow" : "Check In"}
                            </button>
                            {clickedCheckIn && nextCheckInTime && (
                                <p className="text-xl">Next check-in available in: {(nextCheckInTime - currentTime) / 1000} seconds</p>
                            )}
                            {locationError && (
                                <p style={{ color: 'red' }}>{locationError}</p>
                            )}

                            <button onClick={handleCheckOutClick} disabled={!canClickCheckOut() || clickedCheckOut} className='py-4 px-10 bg-green-500 text-white w-6/12 rounded-md disabled:opacity-50 block mt-4'>
                                {clickedCheckOut ? "Checked Out" : "Check Out"}
                            </button>

                            <div>
                                <h3 className='mt-4 font-semibold'>User Calendar for {currentMonth}</h3>
                                <ul>
                                {userData.months[currentMonth] && userData.months[currentMonth].map((entry, index) => (
                                    <li key={index}>
                                    Day: {entry.day}, Date: {entry.date}, Time Checked In: {entry.timeCheckedIn}, Late: {entry.late.toString()}, 
                                    Time Checked Out: {entry.timeCheckedOut || "Not checked out yet"}, Location: {entry.currentLocation},  Picture: {selectedFile ? selectedFile.name :  "Upload a picture"}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Dashboard;