const MyBookingCard = ({ booking, onCancel }) => {
  const { bookingDate, bookingTime, status, classId} = booking;
  const className = classId.className
  const date = new Date(bookingDate).toLocaleDateString("en-GB"); 
  // แสดงเป็น DD/MM/YYYY

  return (
    <div className="card bg-base-100 shadow-md border w-96">
      <div className="card-body">
        <h2 className="card-title">Class : {className}</h2>

        <p>
          <span className="font-semibold">Start Date:</span> {date}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {bookingTime}
        </p>

        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`badge ${
              status === "booked"
                ? "badge-success"
                : status === "cancelled"
                ? "badge-error"
                : "badge-warning"
            }`}
          >
            {status}
          </span>
        </p>

        <div className="card-actions justify-end mt-4">
          {status === "booked" && (
            <button
              className="btn btn-sm btn-error"
              onClick={() => onCancel(booking._id)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
