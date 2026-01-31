import { Link } from "react-router";
import { useAuthContext } from "../context/UserContextProvider";
import UserProfile from "./profile/UserProfile";

const Navbar = () => {
  const { userInfo } = useAuthContext();
  const role = userInfo?.role;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Mobile menu */}
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>

            {role === "user" && (
              <>
                <li><Link to="/my-bookings">My Booking</Link></li>
                <li><Link to="/become-trainer">Become Trainer</Link></li>
              </>
            )}

            {role === "admin" && (
              <li><Link to="/approve-trainer">Approve Trainer</Link></li>
            )}
          </ul>
        </div>

        <Link className="btn btn-ghost text-xl" to="/">
          FitBooking
        </Link>
      </div>

      {/* CENTER (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>

          {role === "user" && (
            <li><Link to="/my-bookings">My Booking</Link></li>
          )}

          {role === "admin" && (
            <li><Link to="/approve-trainer">Approve Trainer</Link></li>
          )}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex gap-2">
        {userInfo ? (
          <UserProfile />
        ) : (
          <Link to="/login" className="btn">
            Get Started
          </Link>
        )}

        {role === "user" && (
          <Link
            to="/become-trainer"
            className="btn btn-neutral hidden sm:inline-flex"
          >
            Become a trainer
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
