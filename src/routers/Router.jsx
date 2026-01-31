import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Booking from "../pages/bookings/Booking";
import MyBookings from "../pages/bookings/MyBookings";
import CreateClass from "../pages/classes/CreateClass";
import UpdateClass from "../pages/classes/UpdateClass";
import TrainerSignup from "../pages/auth/TrainerSignup";
import ApproveTrainer from "../pages/admin/ApproveTrainer";
import MyClasses from "../pages/classes/MyClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      // Auth
      { path: "/login", element: <Login/>},
      { path: "/register", element: <Register/>},
      { path: "/become-trainer", element: <TrainerSignup/>},

      //Bookings
      { path: "/booking/:classId", element: <Booking/>},
      { path: "/my-bookings", element: <MyBookings/>},
        
      //Classes
      { path: "/create-class", element: <CreateClass/>},
      { path: "/update-class/:id", element: <UpdateClass/>},
      { path: "/my-classes", element: <MyClasses/>},

      //admin
        {path: "/approve-trainer", element: <ApproveTrainer/>}
    ],
  },
]);

export default router;