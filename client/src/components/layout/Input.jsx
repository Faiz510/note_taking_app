import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { sessionSucess } from "../../store/UserSlice";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom";
import SelectCatOpt from "./SelectCatOpt";
import { FaRegImage } from "react-icons/fa6";

const Input = ({ showAddNotes, setShowAddNotes }) => {
  const { token, user } = useSelector((state) => state.user?.user?.currentUser);
  const [noteData, setNoteData] = useState({
    category: user?.categories[0] || "",
  });
  const [photosData, setPhotosData] = useState([]);
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
      // photos: photosData,
    }));

  // useEffect(() => {
  //   console.log(photosData);
  //   console.log(noteData);
  // }, [photosData]);

  ////////////////////
  // submit note form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();

    // formData.append("title", noteData.title);
    // formData.append("note", noteData.note);
    // formData.append("category", noteData.category);
    // // formData.append("photos", noteData.photos);
    // noteData.photos.forEach((file, index) => {
    //   formData.append(`photos[${index}]`, file);
    // });

    // const inputFiles = document.getElementById("photos");

    // if (inputFiles.files.length > 0) {
    //   formData.append("photos", noteData.photos);
    // }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/note",
        noteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = res;
      dispatch(sessionSucess(data));
      console.log(data);
      navigate("/");

      setShowAddNotes(false);
    } catch (error) {
      console.log(error);
      setFormError(error?.response?.data.message);
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

      {/* <div className="flex gap-2 justify-center">
        {photosData > 0 ? (
          photosData.map((photo, i) => (
            <img
              className="w-16 h-16 object-cover cursor-pointer hover:scale-105"
              key={i}
              src={`${photo.name}`}
              alt={`Image ${i}`}
              // onClick={onImage}
            />
          ))
        ) : (
          <h3>No Images to show</h3>
        )}
      </div> */}

      <div className="flex items-center">
        <SelectCatOpt onClickHandler={onNoteVal} />
        {/* <label htmlFor="photos">
          <input
            type="file"
            hidden
            id="photos"
            onChange={(e) => {
              const files = e.target.files;
              setPhotosData([...photosData, ...files]);
              onNoteVal(e);
            }}
            accept="images/*"
          />
          <FaRegImage
            className=" text-slate-400 cursor-pointer text-2xl"
            // onChange={(e) => setPhotosData(e.target.files[0])}
            htmlFor="photos"
          />
        </label> */}
      </div>
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
