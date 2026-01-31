import { Link } from 'react-router'

const Card = ({
  _id,
  className,
  trainerName,
  price,
  phone,
  classType,
  capacity,
  description,
  classDate,
  status,
  cover,
  location,
  createBy
}) => {
  const date = new Date(classDate).toLocaleDateString("en-GB");

  return (
    <div className="card bg-base-100 w-full sm:w-80 md:w-78 shadow-sm overflow-hidden lg:w-96">

      {/* Image Section */}
      <figure className="relative w-full h-48 sm:h-56 overflow-hidden">
        <p className="absolute top-3 right-3 badge badge-success text-blue-50 z-10">
          {status}
        </p>
        <img
          src={cover}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Body */}
      <div className="card-body p-4 flex flex-col justify-between">

        <div className="space-y-1">
          <h2 className="card-title text-base sm:text-lg">
            {className}
          </h2>

          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          <p className="text-sm">Capacity: {capacity}</p>
          <p className="text-sm">Location: {location}</p>
          <p className="text-sm">Type: {classType}</p>
          <p className="text-sm">
            By trainer: {trainerName}
          </p>
          <p className="text-sm">
            Call: {phone}
          </p>
          <p className="text-sm">
            Start: {date}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <Link to={`/booking/${_id}`} className="w-full sm:w-auto">
            <button className="btn btn-neutral w-full sm:w-auto">
              Book Now
            </button>
          </Link>

          <div className="flex justify-end items-center gap-2">
            <p className="text-gray-700 font-bold text-sm">Total</p>
            <p className="text-amber-600 font-bold text-base">
              {price} baht
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;
