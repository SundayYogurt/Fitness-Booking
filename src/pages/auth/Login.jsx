import { useContext, useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthService from "../../services/authentication.service";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { logIn, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
        navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
  if (!user.username || !user.password) {
    Swal.fire({
      title: "Error",
      text: "Username or Password cannot be empty!",
      icon: "error",
    });
    return;
  }

  try {
    const response = await AuthService.login(user.username, user.password);

    if (response.status === 200) {
      Swal.fire({
        title: "Success",
        text: response.data.message,
        icon: "success",
        confirmButtonColor: "#22c55e",
      }).then(() => {
        logIn({
          ...response.data.user,
          accessToken: response.data.accessToken,
        });
        navigate("/");
      });
    }

  } catch (error) {
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status === 404) {
        Swal.fire({
          title: "Login failed",
          text: "User not found",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      } else if (status === 401) {
        Swal.fire({
          title: "Login failed",
          text: "Password incorrect",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: message || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Cannot connect to server",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  }
};


  return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="flex w-full max-w-6xl flex-col md:flex-row">

            {/* Hero Text */}
      <div className="md:hidden lg:hidden flex-col justify-center items-center text-center mb-10 ">
        <h1 className="text-4xl font-bold">Welcome to our website!</h1>
        <p className="text-xl mt-4 text-base-content/70">
          We hope you will enjoy our services.
        </p>
      </div>

      {/* ฟอร์ม Login */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <fieldset className="fieldset border-base-300 rounded-box w-full max-w-sm border p-8 shadow-md">
          <legend className="fieldset-legend text-xl">Login</legend>

          <label className="label">Username</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={user.username}
          />

          <label className="label mt-2">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <button
            className="btn btn-neutral mt-6 w-full"
            onClick={handleSubmit}
          >
            Login
          </button>

          <div className="flex justify-between mt-4 text-sm">
            <a className="link link-hover" href="/register">
              Not a member?
            </a>
            <a className="link link-hover" href="#">
              Forgot password?
            </a>
          </div>
        </fieldset>
      </div>

      {/* Hero Text */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-center px-8">
        <h1 className="text-4xl font-bold">Welcome to our website!</h1>
        <p className="text-xl mt-4 text-base-content/70">
          We hope you will enjoy our services.
        </p>
      </div>

    </div>
  </div>
);
}

export default Login;
