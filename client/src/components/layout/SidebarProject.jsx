import React from "react";

const SidebarProject = ({ showAddNotes }) => {
  return (
    <section className="w-[30vw] bg-black h-screen md:w-[20vw] text-center">
      <h3 className="text-white py-2 font-semibold tracking-wide text-2xl">
        Notes
      </h3>

      <button
        className="bg-slate-500 text-white px-2 my-2"
        onClick={() => showAddNotes(true)}
      >
        Add Notes
      </button>
    </section>
  );
};

export default SidebarProject;
