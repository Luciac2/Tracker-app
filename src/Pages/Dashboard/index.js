import { useEffect, useState } from "react";

function Dashboard() {
    const userId = "user123"; // Replace with actual user ID
    const userName = "John Doe"; // Replace with actual user name
    const allowedLocation = { lat: 7.3775, lon: 3.9470 }; // Replace with your allowed location
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState("");

    const [userData, setUserData] = useState({
        id: userId,
        name: userName,
        months: {},
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
        return selectedFile && now >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0) && (!nextCheckIn || now > nextCheckIn);
    };

    // Function to check if the user can click the check-out button today
    const canClickCheckOut = () => {
        const now = new Date();
        return clickedCheckIn && now <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);
    };

    // Function to handle check-in button click
    const handleCheckInClick = () => {
        if (!selectedFile) {
        console.log("Please upload a picture before checking in.");
        setLocationError("Please upload a picture before checking in.");
        return;
        }

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

    // Function to format time in HH:MM:SS
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}hrs : ${minutes}mins : ${seconds}secs`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="max-w-[1400px] mx-auto px-3 mt-4">
        <div>
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
                    <img src={previewImage} alt="preview" className="w-full h-[30em] object-cover" />
                    <p className="text-xl mt-1 font-semibold">{selectedFile && selectedFile.name}</p>
                    </div> :
                    <input
                    id="selectedFile"
                    name="selectedFile"
                    type="file"
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
                    <p className="text-xl font-semibold mb-10">
                    Next check-in available in: <span className="text-2xl">{formatTime(nextCheckInTime - currentTime)}
                    </span></p>
                )}
                {locationError && (
                    <p style={{ color: 'red' }}>{locationError}</p>
                )}

                <button onClick={handleCheckOutClick} disabled={!canClickCheckOut() || clickedCheckOut} className='py-4 px-10 bg-green-500 text-white w-6/12 rounded-md disabled:opacity-50 block mt-4'>
                    {clickedCheckOut ? "Checked Out" : "Check Out"}
                </button>

                <div>
                    <h3 className='mt-4 mb-2 font-semibold text-2xl text-center'>User Calendar for {currentMonth}</h3>
                    <ul>
                        {userData.months[currentMonth] && userData.months[currentMonth].map((entry, index) => (
                            <div key={index} className="grid gap-y-4 text-xl grid-cols-3 mb-10 font-semibold">
                                <p className="">Day: {entry.day}</p>
                                <p>Date: {entry.date}</p>
                                <p>Time Checked In: {entry.timeCheckedIn}</p>
                                <p className="text-red-500 font-semibold">Late: {entry.late.toString()}</p>
                                <p>Time Checked Out: {entry.timeCheckedOut || "Not checked out yet"}</p>
                                <p>Location: {entry.currentLocation}</p>
                                <p>Picture: {selectedFile ? selectedFile.name :  "Upload a picture"}</p>
                            </div>
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