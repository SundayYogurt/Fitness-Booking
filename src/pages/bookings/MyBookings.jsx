import { useState, useEffect } from "react";
import MyBookingCard from "../../components/cards/MyBookingCard"
import bookingService from "../../services/booking.service";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const myBooking = async () => {
    try {
      const res = await bookingService.myBooking();

      if (res.status === 200) {
          setBookings(res.data.bookings);
          console.log(res)
        }
    } catch (err) {
        Swal.fire({
            title: "get my book Error ",
            icon: "error",
            text: err?.response?.data?.message || "Something went wrong",
    
          });
    }
  };

  myBooking();
}, []);

  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="flex gap-6 flex-wrap">
        {bookings.map((booking) => (
          <MyBookingCard
            key={booking._id}
            booking={booking}
            // onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
