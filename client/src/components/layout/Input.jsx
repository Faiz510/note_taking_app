import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { sessionSucess } from "../../store/UserSlice";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom";
import SelectCatOpt from "./SelectCatOpt";

const Input = ({ showAddNotes, setShowAddNotes }) => {
  const { token, user } = useSelector((state) => state.user?.user?.currentUser);
  const [noteData, setNoteData] = useState({
    category: user?.categories[0] || "",
  });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /////////////////

  // // form values form note form
  const onNoteVal = (e) =>
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [e.target.id]: e.target.value,
      token,
    }));

  // console.log(noteData);

  ////////////////////
  // submit note form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/note",
        noteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res;
      console.log(data);
      dispatch(sessionSucess(data));
      navigate("/");

      setShowAddNotes(false);
    } catch (error) {
      console.log(error);
      setFormError(error.response.data.message);
      // setFormError(error.response.data.message);
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
        id="title"
        onChange={onNoteVal}
      />

      <textarea
        rows="12"
        placeholder="Descrioption"
        className="bg-slate-200 w-[80%] h-28 focus:outline-none px-2 py-1"
        id="note"
        onChange={onNoteVal}
      ></textarea>

      <SelectCatOpt onClickHandler={onNoteVal} />

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
