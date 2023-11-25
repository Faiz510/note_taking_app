import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { sessionSucess } from "../../store/UserSlice";
import ErrorBox from "./ErrorBox";

const Input = ({ showAddNotes }) => {
  const [noteData, setNoteData] = useState({});
  const [formError, setFormError] = useState("");
  /////////////////
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user?.user?.currentUser);

  const onNoteVal = (e) => {
    setNoteData({ ...noteData, [e.target.id]: e.target.value, token });
  };
  ////////////////////
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/add-note",
        noteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res;
      dispatch(sessionSucess(data));
    } catch (error) {
      setFormError(error.response.data.message);
    }
  };
  return (
    <form
      className="flex justify-center items-center h-64 flex-col gap-4"
      onSubmit={onSubmitHandler}
    >
      <input
        type="text"
        className="bg-slate-200 w-[80%] focus:outline-none rounded-md py-1 px-2"
        placeholder="Title"
        id="enteredTitle"
        onChange={onNoteVal}
      />

      <textarea
        rows="12"
        placeholder="Descrioption"
        className="bg-slate-200 w-[80%] h-28 focus:outline-none px-2 py-1"
        id="enteredNote"
        onChange={onNoteVal}
      ></textarea>

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

      <ErrorBox error={formError} />
    </form>
  );
};

export default Input;
