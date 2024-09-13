import React, { useState, useRef } from "react";
import axios from "axios";
import { ReactComponent as GallIcon } from "../../../src/assets/icons/gallery-svgrepo-co.svg";
import { ReactComponent as GalIcon } from "../../../src/assets/icons/gallery-svgrepo-co copy.svg";
import { ReactComponent as UploadIcon } from "../../../src/assets/icons/upload.svg";

const CheckInForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null); // Reference to file input

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Handle drop event (drag-and-drop functionality)
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Show the preview of the dropped image
  };

  // Handle traditional file selection (browse functionality)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Show the preview of the selected image
  };

  // Handle form submission for check-in
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select or drag a picture for check-in.");
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("checkIn", selectedFile); // Adjust the key if needed

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
    <div className="flex flex-col items-center justify-center h-screen lg:-mt-20 lg:-ml-32">
      {/* Upload Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <UploadIcon />
          </div>
          <h2 className="text-xl font-semibold mb-4">Upload Picture</h2>
        </div>

        {/* Drag-and-Drop or Browse Area */}
        <div
          className={`border-2 border-dashed border-orange-100 rounded-lg p-4 mb-4 ${
            dragOver ? "bg-orange-50" : "bg-gray-50"
          } flex justify-center items-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-28 object-cover mx-auto mb-2"
              />
            ) : (
              <div className="h-24 flex flex-col justify-center">
                <p>Drag and drop image here or click Browse Image to Upload</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef} // Reference to the input field
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <>
          <p className="text-center text-sm ">Supported Media Below</p>
          <div className="flex justify-center">
            <div>
              <GallIcon />
              <p className="text-xs text-center -mt-1">JPG</p>
            </div>
            <div>
              <GalIcon />
              <p className="text-xs text-center -mt-1">PNG</p>
            </div>
            <div>
              <GallIcon />
              <p className="text-xs text-center -mt-1">JPEG</p>
            </div>
          </div>
        </>
        {/* Browse and Check-In Buttons */}
        <div className="flex space-x-60 mt-8">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()} // Trigger the hidden input when the button is clicked
            className="bg-orange-500 text-white w-full py-2 px-3 rounded-md hover:bg-orange-600"
          >
            Browse Image
          </button>

          <button
            type="button"
            className={`bg-orange-500 text-white w-full py-2 px-3 rounded-md ${
              selectedFile
                ? "hover:bg-orange-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Check In
          </button>
        </div>
      </div>

      {/* Display success response */}
      {response && (
        <div className="mt-6 bg-green-100 p-4 rounded shadow">
          <h3 className="text-green-800">Check-In Successful!</h3>
          <p>Message: {response.message}</p>
          <p>Location: {response.data?.location}</p>
          <p>Time In: {response.data?.timeIn}</p>
          <p>Recommended Rating: {response.data?.recommendedRating}</p>
          {response.data?.attendancePicture?.pictureUrl && (
            <img
              src={response.data?.attendancePicture?.pictureUrl}
              alt="Attendance"
              className="w-32 h-32 object-cover mt-4"
            />
          )}
        </div>
      )}

      {/* Display error messages */}
      {error && (
        <div className="mt-6 bg-red-100 p-2 rounded shadow w-1/2">
          <h3 className="text-red-800">Error:</h3>
          <p>{typeof error === "string" ? error : JSON.stringify(error)}</p>
        </div>
      )}
    </div>
  );
};

export default CheckInForm;
