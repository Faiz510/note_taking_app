import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="flex justify-center items-center h-[98vh] bg-gray-400 text-white">
      <div className="text-center">
        <h2 className="text-2xl">Welcome</h2>

        <p> singup Up and create notes which is important </p>

        <button className="">
          <Link to={"/signup"} className="bg-white px-2 text-black mt-2">
            Join in
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Welcome;
