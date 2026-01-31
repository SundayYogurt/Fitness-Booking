  import { useRef } from 'react';
  const Hero = ({targetRef}) => {
      const handleScroll = () => {
      targetRef.current?.scrollIntoView({
        behavior: "smooth", // เลื่อนแบบนุ่ม
        block: "start",
      });
    };
    return (
      <div className="hero bg-base-transparent min-h-[70vh] flex justify-start">
        <div className="hero-content text-left">
          <div className="max-w-lg">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Booking Now!
            </h1>

            <p className="py-4 sm:py-6 text-base sm:text-lg md:text-xl">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            <div className="flex gap-4 justify-start items-center mt-5 ml-0 md:ml-20">
              <button className="btn btn-neutral w-48 sm:w-64 md:w-80" onClick={handleScroll}>
                Start now!
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  };


  export default Hero;
