import React from "react";
import NotesImg from "../../assets/createNote.jpg";

const AddProjectSection = () => {
  return (
    <section>
      <img src={NotesImg} className="w-[100vw] h-52 object-cover" />

      <div className="flex justify-center flex-col text-center h-40">
        <h3 className="text-2xl font-bold tracking-wide">
          Create Note your notes
        </h3>
        <button className="bg-slate-600 w-40 text-white px-4 mx-auto py-1 border-none font-medium mt-4">
          {" "}
          Create Note{" "}
        </button>
      </div>
    </section>
  );
};

export default AddProjectSection;
