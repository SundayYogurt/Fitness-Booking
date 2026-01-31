import { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/authentication.service";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate ก่อนส่ง
    if (
      !userForm.username ||
      !userForm.email ||
      !userForm.phone ||
      !userForm.password
    ) {
      Swal.fire({
        icon: "error",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      const newUser = await AuthService.register(
        userForm.username,
        userForm.email,
        userForm.phone,
        userForm.password
      );

      if (newUser.status === 201) {
        Swal.fire({
          icon: "success",
          title: newUser.data.message || "สมัครสมาชิกสำเร็จ",
          text: "going to login",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      } else {
        // กรณี status แปลกๆ แต่ไม่เข้า catch
        Swal.fire({
          icon: "error",
          title: "สมัครไม่สำเร็จ",
          text: newUser.data?.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (err) {
      console.log("Register error:", err.response || err);

      Swal.fire({
        icon: "error",
        title: "สมัครไม่สำเร็จ",
        text:
          err.response?.data?.message ||
          err.message ||
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-6xl">

        {/* ซ้าย: ฟอร์ม Register */}
        <div className="w-1/2 flex justify-center items-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-8 shadow-md">
            <legend className="fieldset-legend">Register</legend>

            <form onSubmit={handleSubmit}>
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                required
                value={userForm.username}
                className="input w-full"
                placeholder="Your name"
                onChange={handleChange}
              />

              <label className="label mt-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={userForm.email}
                className="input w-full"
                placeholder="Email"
                onChange={handleChange}
              />

              <label className="label mt-2">Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={userForm.phone}
                className="input w-full"
                placeholder="Your phone number"
                onChange={handleChange}
              />

              <label className="label mt-2">Password</label>
              <input
                type="password"
                name="password"
                required
                value={userForm.password}
                className="input w-full"
                placeholder="Password"
                onChange={handleChange}
              />

              <button className="btn btn-neutral mt-6 w-full" type="submit">
                Create Account
              </button>
            </form>

            <div className="flex justify-between mt-4 text-sm">
              <span>Already have an account?</span>
              <a className="link link-hover" href="/login">
                Back to Login
              </a>
            </div>
          </fieldset>
        </div>

        {/* ขวา: Hero Text */}
        <div className="w-1/2 flex flex-col justify-center items-center text-center px-8">
          <h1 className="text-4xl font-bold">Join us today!</h1>
          <p className="text-xl mt-4 text-base-content/70">
            Create your account and start booking your favorite fitness classes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
