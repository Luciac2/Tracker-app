import React, { useState } from "react";
import { Api } from "../../api/api.config";
import { states, locationsByState } from "../../helper/Location"; // Ensure these are correctly exported

const UpdateUser = () => {
  const [selectedState, setSelectedState] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetchUsersByState(state);
  };

  const fetchUsersByState = (state) => {
    console.log("Fetching users for state:", state);
    setLoading(true);

    fetch(`/getbyLocation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data && Array.isArray(data.data)) {
          setUsers(data.data);
          setError("");
        } else {
          console.error("Unexpected response format:", data);
          setError("Unexpected response format.");
        }
      })
      .catch((error) => {
        const errorMessage = error.message || "Error fetching users.";
        console.error("Fetch error:", errorMessage);
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserInfo(user);
    setError("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (selectedUser) {
      setLoading(true);

      fetch(`/updateinfo/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: userInfo.state,
          location: userInfo.location,
          phoneNumber: userInfo.phoneNumber,
          role: userInfo.role || undefined,
          accountNumber: userInfo.accountNumber || undefined,
          fullName: userInfo.fullName || undefined,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSuccessMessage("User updated successfully!");
          setError("");
        })
        .catch((error) => {
          const errorMessage = error.message || "Error updating user.";
          console.error("Update error:", errorMessage);
          setError(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Select State</h2>
      <select
        onChange={handleStateChange}
        value={selectedState}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
      >
        <option value="">Select a state</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      {users.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Select User</h3>
          <ul className="list-none p-0 mb-4">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="cursor-pointer p-2 mb-1 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {user.fullName}
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedUser && (
        <form onSubmit={handleUpdateUser} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Update User Information
          </h3>
          <div className="flex items-center mb-4">
            <img
              src={selectedUser.profilePicture?.pictureUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4 transition-transform transform hover:scale-110"
            />
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>

          <input
            type="text"
            name="state"
            value={userInfo.state || ""}
            onChange={handleInputChange}
            placeholder="State"
            className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="location"
            value={userInfo.location || ""}
            onChange={handleInputChange}
            placeholder="Location"
            className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber || ""}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="role"
            value={userInfo.role || ""}
            onChange={handleInputChange}
            placeholder="Staff Role (optional)"
            className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="fullName"
            value={userInfo.fullName || ""}
            onChange={handleInputChange}
            placeholder="Full Name (optional)"
            className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="accountNumber"
            value={userInfo.accountNumber || ""}
            onChange={handleInputChange}
            placeholder="Account Number (optional)"
            className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Update User
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUser } from "../../features/user/UserSlice";

// const AssignLocation = () => {
//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchAllUser());
//   });
//   return (
//     <div className="p-4">
//       {users &&
//         users.map((user, index) => (
//           <div key={index} className="flex max-w-xl justify-between px-4">
//             <p>My name</p>
//             <>+</>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default AssignLocation;
