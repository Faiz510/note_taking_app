import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorBox from "./ErrorBox";
import { sessionSucess } from "../../store/UserSlice";

const SidebarProject = ({ showAddNotes }) => {
  const [NoteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataError, setErrorData] = useState("");

  const { user, token } = useSelector((state) => state.user?.user?.currentUser);

  const displayNoteData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/v1/note`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = res;
      // console.log(data);
      setNoteData(data.notes);
      setLoading(false);
    } catch (error) {
      setErrorData(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    displayNoteData();
  }, []);

  return (
    <section className="w-[30vw] bg-black h-screen md:w-[20vw] text-center mx-auto">
      <h3 className="text-white py-2 font-semibold tracking-wide text-2xl">
        Notes
      </h3>

      <button
        className="bg-slate-500 text-white px-2 my-2"
        onClick={() => showAddNotes(true)}
      >
        Add Notes
      </button>

      <ul>
        {!loading
          ? NoteData?.map((note) => (
              <Link to={`note/${note?._id}`} className="" key={note?._id}>
                <li className="my-2 bg-white px-2 w-[60%] mx-auto">
                  {note?.title}
                </li>
              </Link>
            ))
          : ""}
      </ul>
      <ErrorBox error={dataError} />
    </section>
  );
};

export default SidebarProject;
