import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSectionLayout from "../layout/FormSectionLayout";
import ErrorBox from "../layout/ErrorBox";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { sessionSucess } from "../../store/UserSlice";
import useFetchResponse from "../../Hooks/useFetchResponse";
import moment from "moment";
import ImageViewer from "../layout/ImageViewer";
import { FaPlus } from "react-icons/fa6";

const Note = () => {
  const { user, token } = useSelector((state) => state.user?.user?.currentUser);
  const params = useParams();
  const { id } = params;
  ///////////////////
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataError, setErrorData] = useState("");
  const [defValOpt, setDefValOpt] = useState("");
  const [openImg, setOpenImg] = useState(false);
  const [openImgSrc, setOpenImgSrc] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetching response function
  const { response } = useFetchResponse(
    "get",
    `${process.env.BASE_URL}/api/v1/note/${id}`,
    token
  );

  // date formatting
  const dateString = response?.notes?.createdAt;
  const formattedDate = moment(dateString).fromNow();

  ///////////////////////
  ////////////////////////////////
  const baseurl = `${process.env.BASE_URL}/img/`;
  // const ImgUrl = `${baseurl}${user?.photo}`;

  ///////////////////////////////
  // update values state
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    // getting response appi for default values
    if (response) {
      setDefValOpt(response?.notes?.category?.categoryName);
      // setting defult value for updateData becuase now response has made
      setUpdateData({
        category: response?.notes?.category?._id || "",
        token: token,
      });
    }
  }, [response]);

  console.log(response);

  const onDeleteNoteHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.BASE_URL}/api/v1/note/${id}`,
        {
          data: { token },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = res;
      // console.log(data);
      dispatch(sessionSucess(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrorData(error.response.data.message);
      setLoading(false);
    }
  };

  // // update function
  const onUpdateVal = (e) => {
    const { id, value } = e.target;

    // Only update the state if the category value is changed
    setUpdateData((preData) => ({
      ...preData,
      [id]: value,
      token,
    }));
  };
  // console.log(updateData);

  // console.log(response.notes.createdAt);

  const onUpdateNoteHandler = async () => {
    setIsEditing(() => !isEditing);

    if (Object.keys(updateData).length === 0) return;

    try {
      const res = await axios.put(
        `${process.env.BASE_URL}/api/v1/note/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = res;
      dispatch(sessionSucess(data));
      navigate("/");
      console.log(data);
    } catch (error) {
      setErrorData(error.response.data.message);
    }
  };

  const onImage = (e) => {
    // console.log(e.target.src);

    setOpenImg(true);
    setOpenImgSrc(e.target.src);
  };

  return (
    <FormSectionLayout label={"Note Page"}>
      <form className="flex justify-center items-center h-[30rem] flex-col gap-4 w-[80%] md:w-[90%] ">
        <input
          type="text"
          className="bg-slate-200 w-[80%] focus:outline-none rounded-md py-1 px-2 "
          placeholder="Title"
          defaultValue={response?.notes?.title}
          id="title"
          onChange={onUpdateVal}
          readOnly={isEditing ? false : true}
        />

        <textarea
          rows="12"
          // placeholder="Descrioption"
          className="bg-slate-200 w-[80%] h-28 focus:outline-none px-2 py-1 "
          id="note"
          defaultValue={response?.notes?.note}
          readOnly={isEditing ? false : true}
          onChange={onUpdateVal}
        ></textarea>

        {/* <ImageGallery
          items={response?.notes?.photos ? response?.notes?.photos : ""}
        /> */}

        <div className="flex gap-2 justify-center">
          {response?.notes?.photos && response?.notes?.photos.length > 0 ? (
            response?.notes?.photos.map((photo, i) => (
              <img
                className="w-16 h-16 object-cover cursor-pointer hover:scale-105"
                key={i}
                src={`${baseurl}/${photo}`}
                alt={`Image ${i}`}
                onClick={onImage}
              />
            ))
          ) : (
            <h3>No Images to show</h3>
          )}
        </div>

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

        {/* select option Categroy  */}
        <div className="flex gap-2">
          <select id="category" onChange={onUpdateVal}>
            {!isEditing ? (
              <option value={defValOpt}> {defValOpt} </option>
            ) : (
              user?.categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))
            )}
          </select>

          <span
            onClick={() => navigate("/category")}
            className="bg-slate-300  px-2 text-white text-2xl cursor-pointer font-bold"
          >
            <FaPlus />
          </span>
        </div>

        <div>
          <span>{formattedDate ? formattedDate : ""}</span>
        </div>
        <ErrorBox error={dataError} />
      </form>

      {openImg && <ImageViewer imgSrc={openImgSrc} OpenImg={setOpenImg} />}
    </FormSectionLayout>
  );
};

export default Note;
