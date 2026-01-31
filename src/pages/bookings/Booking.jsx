import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import bookingService from "../../services/booking.service";
import Swal from "sweetalert2";
const Booking = () => {
  const {classId} = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bookingDate: "",
    bookingTime: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await bookingService.booking(classId, form);
      if (response.status === 201) {
        Swal.fire({
          title: "Class booked successfully!",
          icon: "success",
          text: response.data.Booking,
          confirmButtonColor: "#22c55e",
        }).then(() => {
          navigate("/");
        });
        setForm({
          bookingDate: "",
          bookingTime: "",
        });
        console.log(response.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Booking Error ",
        icon: "error",
        text: error?.response?.data?.message || "Something went wrong",

      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="card bg-base-200 shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Book a Class</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Booking Date */}
            <div>
              <label className="label">
                <span className="label-text">Booking Date</span>
              </label>
              <input
                type="date"
                name="bookingDate"
                className="input input-bordered w-full"
                value={form.bookingDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Booking Time */}
            <div>
              <label className="label">
                <span className="label-text">Booking Time</span>
              </label>
              <input
                type="time"
                name="bookingTime"
                className="input input-bordered w-full"
                value={form.bookingTime}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
