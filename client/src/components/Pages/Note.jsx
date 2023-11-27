import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSectionLayout from "../layout/FormSectionLayout";
import ErrorBox from "../layout/ErrorBox";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { sessionSucess } from "../../store/UserSlice";

const Note = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [NoteData, setNoteData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataError, setErrorData] = useState("");
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.user?.user?.currentUser);

  const displayNoteData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/v1/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      setLoading(false);
      setNoteData(data.notes);
    } catch (error) {
      setErrorData(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    displayNoteData();
  }, []);

  const onDeleteNoteHandler = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/user/note/${id}`,
      {
        data: { token },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = res;
    dispatch(sessionSucess(data));
    navigate("/");
  };

  const onUpdateVal = (e) => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value, token });
  };

  const onUpdateNoteHandler = async () => {
    setIsEditing(() => !isEditing);
    console.log(updateData);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/note/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = res;
      console.log(data);

      dispatch(sessionSucess(data));
    } catch (error) {
      // console.log(error);
      // console.log();
      setErrorData(error.response.data.message);
    }
  };
  return (
    <FormSectionLayout label={"Note Page"}>
      <form className="flex justify-center items-center h-64 flex-col gap-4 w-[80%] md:w-[90%]">
        <input
          type="text"
          className="bg-slate-200 w-[80%] focus:outline-none rounded-md py-1 px-2"
          placeholder="Title"
          defaultValue={NoteData?.title}
          id="title"
          onChange={onUpdateVal}
          readOnly={isEditing ? false : true}
        />

        <textarea
          rows="12"
          // placeholder="Descrioption"
          className="bg-slate-200 w-[80%] h-28 focus:outline-none px-2 py-1"
          id="note"
          defaultValue={NoteData?.note}
          readOnly={isEditing ? false : true}
          onChange={onUpdateVal}
        ></textarea>

        <div className="flex justify-between px-4 items-center font-semibold gap-2 mt-2 flex-col md:flex-row w-[80%]">
          {isEditing ? (
            <button
              type="button"
              className="bg-slate-500 text-white w-full rounded-md"
              onClick={onUpdateNoteHandler}
            >
              Update Note
            </button>
          ) : (
            <button
              type="button"
              className="bg-slate-500 text-white w-full rounded-md"
              onClick={() => setIsEditing(() => !isEditing)}
            >
              Edit Note
            </button>
          )}
          <button
            type="button"
            className="bg-slate-500 text-white w-full rounded-md"
            onClick={onDeleteNoteHandler}
          >
            Delete Note
          </button>
        </div>

        <ErrorBox error={dataError} />
      </form>
    </FormSectionLayout>
  );
};

export default Note;
