import React from "react";

const Input = () => {
  return (
    <form className="flex justify-center items-center h-52 flex-col gap-4">
      <input
        type="text"
        className="bg-slate-200 w-[80%] focus:outline-none rounded-md py-1 px-2"
        placeholder="Title"
      />

      <textarea
        rows="12"
        placeholder="Descrioption"
        className="bg-slate-200 w-[80%] h-28 focus:outline-none px-2 py-1"
      ></textarea>
    </form>
  );
};

export default Input;
