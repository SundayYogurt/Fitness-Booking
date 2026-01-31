import React, { useContext } from "react";
import { useAuthContext } from "../../context/UserContextProvider";
import Swal from "sweetalert2";
const UserProfile = () => {
  const { userInfo } = useAuthContext()
  const { logOut } = useAuthContext()
  const handleLogOut = () => {
        logOut()
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "logout สำเร็จ!",
            text: "Logout successfully",
            showConfirmButton: false,
            timer: 1500
        })
    }
  const username = userInfo?.username || "U";
console.log("userInfo :", userInfo)
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full overflow-hidden">
          <img
            alt="User avatar"
            src={avatarUrl}
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={handleLogOut}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
