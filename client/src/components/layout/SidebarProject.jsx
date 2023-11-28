import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "./ErrorBox";

const SidebarProject = ({ showAddNotes }) => {
  // const [NoteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataError, setErrorData] = useState("");

  const { user } = useSelector((state) => state.user?.user?.currentUser);

  return (
    <section className="w-[30vw] bg-black h-screen md:w-[20vw] text-center mx-auto">
      <h3 className="text-white py-2 font-semibold tracking-wide text-2xl">
        Notes
      </h3>

      <button
        className="bg-slate-500 text-white px-2 my-2"
        onClick={() => {
          showAddNotes(true);
        }}
      >
        Add Notes
      </button>

      {/* getting notes title lisst from state  */}
      <ul>
        {!loading
          ? user?.notes?.map((note) => (
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
