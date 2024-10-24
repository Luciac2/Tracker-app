import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../features/user/UserSlice";

const AssignLocation = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]); // Ensure dispatch is included as a dependency

  return (
    <div className="p-4">
      {users && users.length > 0 ? ( // Check if users exist and has length
        users.map((user, index) => (
          <div key={index} className="flex max-w-xl justify-between px-4">
            <p>{user.name}</p> {/* Display the user's name */}
            <button className="bg-blue-500 text-white py-1 px-2 rounded">
              +
            </button>{" "}
            {/* Example button for functionality */}
          </div>
        ))
      ) : (
        <p>No users found.</p> // Display a message if no users are found
      )}
    </div>
  );
};

export default AssignLocation;

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
