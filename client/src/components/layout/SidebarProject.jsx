import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import SelectCatOpt from "./SelectCatOpt";

const SidebarProject = ({ showAddNotes }) => {
  // const [NoteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataError, setErrorData] = useState("");

  const { user } = useSelector((state) => state.user?.user?.currentUser);

  /////////////////////////
  // select cat state which cat is selected
  const [selectCat, setSelectCat] = useState(user?.categories[0]?._id || "");
  // assign value to selectCAt
  const onSelectHanlder = (e) => setSelectCat(e.target.value);
  // find where user category name === to selected cate from option
  const category = user?.categories?.find((cat) => cat._id === selectCat);

  return (
    <section className="w-[30vw] bg-black h-screen md:w-[20vw] text-center mx-auto">
      <h3 className="text-white py-2 font-semibold tracking-wide text-2xl">
        Notes
      </h3>

      <div className="gap-2 space-x-2">
        <button
          className="bg-slate-500 text-white px-2 my-2 py-1"
          onClick={() => {
            showAddNotes(true);
          }}
        >
          Add Notes
        </button>

        <select
          className="w-[50%] py-1 bg-slate-500 text-white focus:outline-none"
          onChange={onSelectHanlder}
        >
          {user?.categories?.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
              className="bg-white text-black"
            >
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* getting notes title lisst from state  */}
      <ul>
        {category && category.notes
          ? category?.notes?.map((note) => (
              <Link to={`note/${note?._id}`} className="" key={note?._id}>
                <li className="my-2 bg-white px-2 w-[60%] mx-auto">
                  {note.length === 0 ? "nothing to show" : note?.title}
                </li>
              </Link>
            ))
          : ""}

        {/* {!loading ? user?.categories.find} */}
      </ul>
      <ErrorBox error={dataError} />
    </section>
  );
};

export default SidebarProject;
