import React from 'react'
import { Navigate, useNavigate } from 'react-router'
const TrainerCard = () => {
const navigate = useNavigate()
  return (
    <div> 
          <div className="flex justify-center items-center w-full max-w-md mx-auto mt-10 space-x-6">

            <div className="card bg-base-200 shadow-md p-6 space-y-4 w-full ">
              <h2 className="text-2xl font-bold">
                Manage
              </h2>

              <p className="text-sm text-gray-600">
                Manage your fitness classes
              </p>

              <button
                className="btn btn-primary w-full"
                onClick={() => navigate("/create-class")}
              >
                + Create New Class
              </button>

              <button
                className="btn btn-outline w-full"
                onClick={() => navigate("/my-classes")}
              >
                My Classes
              </button>
            </div>

          </div>
       </div>
  )
}

export default TrainerCard