import React from "react";
import NotesImg from "../../assets/createNote.jpg";
import Input from "./Input";
const CreateNoteSections = () => {
  return (
    <section>
      <img src={NotesImg} className="w-[100vw] h-52 object-cover" />
      {/* <form className="flex justify-center items-center h-52 flex-col"> */}
      {/* <div className="flex gap-2 items-center">
          <label className="font-semibold">Title :</label>
          <input type="text" className="bg-slate-300" />
        </div> */}

      {/* <Input label={"Title"} />

        <Input label={"Note"} textarea /> */}
      {/* </form> */}

      <Input />
    </section>
  );
};

export default CreateNoteSections;
