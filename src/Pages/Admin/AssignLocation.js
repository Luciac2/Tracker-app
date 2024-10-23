import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../features/user/UserSlice";

const AssignLocation = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUser());
  });
  return (
    <div className="p-4">
      {users &&
        users.map((user, index) => (
          <div key={index} className="flex max-w-xl justify-between px-4">
            <p>My name</p>
            <>+</>
          </div>
        ))}
    </div>
  );
};

export default AssignLocation;
