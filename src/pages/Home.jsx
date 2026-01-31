import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/cards/Card";
import StackedtildCard from "../components/cards/StackedtildCard";
import TrainerCard from "../components/cards/TrainerCard";
import classesService from "../services/class.service";
import { useAuthContext } from "../context/UserContextProvider";

const Home = () => {
  
const { userInfo } = useAuthContext()
const role = userInfo?.role

const targetRef = useRef(null)
const [fitnessClass, setFitnessClass] = useState([]);

useEffect(() => {
    const fetchFitnessClass = async () => {
    try {
      const res = await classesService.getAllClasses();

      if (res.status === 200) {
          setFitnessClass(res.data.classes);
          console.log(res)
        }
    } catch (err) {
      console.error("Fetch fitness class error:", err);
    }
  };

  fetchFitnessClass();
}, []);


return (
  <div className="min-h-screen">

    {/* Hero + Stacked Cards */}
    <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 py-10 md:py-20 gap-10 ">

      {/* ซ้าย: Hero */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Hero targetRef={targetRef} />
      </div>

      {/* ขวา: Stacked Cards */}
      <div className="w-full md:w-1/2 flex justify-center ">
        <StackedtildCard fitnessClass={fitnessClass} />
      </div>

    </div>

    {/* ส่วนล่าง: Booking Class */}
    <h1 className="flex justify-start text-2xl sm:text-3xl md:text-4xl text-gray-700 px-4 sm:px-8 md:px-12 mt-10" ref={targetRef}>
      Booking Class
    </h1>

    <div className="mt-8 px-4 sm:px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
  {[...fitnessClass].reverse().map((item, index) => (
    <Card key={item.id} index={index} {...item} />
  ))}
</div>


    {/* Trainer Section */}
    {role === "trainer" || role === "admin" ? (
      <div className="px-4 sm:px-8 md:px-12">
        <h1 className="flex justify-start text-2xl sm:text-3xl md:text-4xl text-gray-700 mt-10 mb-10">
          Trainer
        </h1>

        <TrainerCard />
      </div>
    ) : null}

  </div>

);
}

export default Home;
