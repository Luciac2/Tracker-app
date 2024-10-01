import React, { useState, useRef } from "react";
import { Api } from "../../api/api.config";
import { ReactComponent as GallIcon } from "../../../src/assets/icons/gallery-svgrepo-co.svg";
import { ReactComponent as GalIcon } from "../../../src/assets/icons/gallery-svgrepo-co copy.svg";
import { ReactComponent as UploadIcon } from "../../../src/assets/icons/upload.svg";

const CheckOutForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select or drag a picture for check-out.");
      return;
    }

    const formData = new FormData();
    formData.append("checkOut", selectedFile);

    try {
      const res = await Api.post("/checkout", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError("No response received from the server.");
      } else {
        setError("Error in setting up the request.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <UploadIcon />
          </div>
          <h2 className="text-xl font-semibold mb-4">Upload Picture</h2>
        </div>

        <div
          className={`border-2 border-dashed border-orange-100 rounded-lg p-4 mb-4 transition-colors duration-300 ${
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
                <p className="text-sm">
                  Drag and drop image here or click Browse Image to Upload
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm ">Supported Media Below</p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <GallIcon className="w-6 h-6 mx-auto" />
              <p className="text-xs mt-1">JPG</p>
            </div>
            <div className="text-center">
              <GalIcon className="w-6 h-6 mx-auto" />
              <p className="text-xs mt-1">PNG</p>
            </div>
            <div className="text-center">
              <GallIcon className="w-6 h-6 mx-auto" />
              <p className="text-xs mt-1">JPEG</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-orange-500 text-white w-full py-2 px-3 rounded-md hover:bg-orange-600"
          >
            Browse Image
          </button>

          <button
            type="button"
            className={`bg-orange-500 text-white w-full py-2 px-3 rounded-md transition-opacity duration-300 ${
              selectedFile
                ? "hover:bg-orange-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Check Out
          </button>
        </div>
      </div>

      {response && (
        <div className="mt-6 bg-green-100 p-4 rounded shadow max-w-md w-full text-center">
          <h3 className="text-green-800">Check-Out Successful!</h3>
          <p>Message: {response.message}</p>
          <p>Location: {response.data?.location}</p>
          <p>CheckOut: {response.data?.CheckOut}</p>
          <p>Recommended Rating: {response.data?.recommendedRating}</p>
          {response.data?.attendancePicture?.pictureUrl && (
            <img
              src={response.data?.attendancePicture?.pictureUrl}
              alt="Attendance"
              className="w-32 h-32 object-cover mt-4 mx-auto"
            />
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-100 p-2 rounded shadow max-w-md w-full text-center">
          <h3 className="text-red-800">Error:</h3>
          <p>{typeof error === "string" ? error : JSON.stringify(error)}</p>
        </div>
      )}
    </div>
  );
};

export default CheckOutForm;
