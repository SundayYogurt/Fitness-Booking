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
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "../pages/auth/Forbidden";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      // Auth
      { path: "/login", element: <Login/>},
      { path: "/register", element: <Register/>},
      { path: "/become-trainer", element: <ProtectedRoute><TrainerSignup/></ProtectedRoute>},
      { path: "/403", element: <Forbidden/>},

      //Bookings
      { path: "/booking/:classId", element: <ProtectedRoute roles={["user"]}><Booking/></ProtectedRoute>},
      { path: "/my-bookings", element: <ProtectedRoute roles={["user"]}><MyBookings/></ProtectedRoute>},
        
      //Classes
      { path: "/create-class", element:  <ProtectedRoute roles={["trainer", "admin"]}><CreateClass/></ProtectedRoute>},
      { path: "/update-class/:id", element: <ProtectedRoute roles={["trainer", "admin"]}><UpdateClass/></ProtectedRoute>},
      { path: "/my-classes", element: <ProtectedRoute roles={["trainer", "admin"]}><MyClasses/></ProtectedRoute>},


      //admin
        {path: "/approve-trainer", element: <ProtectedRoute roles={["admin"]}><ApproveTrainer/></ProtectedRoute>}
    ],
  },
]);

export default router;