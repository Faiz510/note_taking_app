import React from "react";

const Input = ({ showAddNotes }) => {
  return (
    <form className="flex justify-center items-center h-64 flex-col gap-4">
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

      <input type="date" />

      <div className="flex gap-2">
        <button type="button" className="cursor-pointer" onClick={showAddNotes}>
          Cancel
        </button>
        <button
          type="submit"
          className="bg-slate-500 px-2 text-white cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Input;
