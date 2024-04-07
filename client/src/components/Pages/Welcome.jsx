import React from "react";
import { Link } from "react-router-dom";
import noteImg from "../../assets/WellcomeNote.jpg";

const Welcome = () => {
  return (
    <section
      className={`flex justify-center items-center bg-cover bg-center h-[98vh] text-white`}
      style={{ backgroundImage: `url('${noteImg}')` }}
    >
      <div className="text-center">
        <h2 className="text-6xl tracking-wider">Welcome</h2>

        <p className="text-2xl tracking-wider"> singup Up and create notes </p>

        <button className="">
          <Link to={"/signup"} className="bg-white px-4 py-1 mt-5 text-black ">
            Join in
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Welcome;
