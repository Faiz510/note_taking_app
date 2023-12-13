import React, { useState } from "react";
import FormSectionLayout from "../layout/FormSectionLayout";
import SignFormInputGroup from "../layout/SignFormInputGroup";
import SubmitButton from "../layout/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { sessionOut, sessionSucess } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetchResponse from "../../Hooks/useFetchResponse";
// import imgrl from '../../../../upload/img'
import ErrorBox from "../layout/ErrorBox";

const inputStyleClasses =
  "w-[100%] bg-white focus:outline-none px-2 py-1 rounded-md";

const Profile = () => {
  // current state for user
  const { user, token } = useSelector((state) => state.user?.user?.currentUser);
  const [updateFormData, setUpdateFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    token: token,
  });
  const [formError, setFormError] = useState("");
  ////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(token);
  // signout hanler
  const signOutHandler = () => {
    dispatch(sessionOut());
    navigate("/signin");
  };

  ////////////////////////////////
  const baseurl = "http://localhost:3000/img/";
  const ImgUrl = `${baseurl}${user?.photo}`;

  // delte account handler
  const onDeleteAccountHandler = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/user/deleteMe", {
        data: token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      signOutHandler();
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdatedValues = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.id]: e.target.value,
      token,
    });
  };

  // update profile
  const onSaveProfileHanlder = async (e) => {
    e.preventDefault();

    if (Object.keys(updateFormData).length === 0) return;

    const formData = new FormData();
    formData.append("username", updateFormData.username);
    formData.append("email", updateFormData.email);
    formData.append("token", updateFormData.token);

    // Check if there's a file selected and append it to the FormData
    const fileInput = document.getElementById("img");
    if (fileInput.files.length > 0) {
      formData.append("photo", fileInput.files[0]);
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = res;

      console.log(data);
      dispatch(sessionSucess(data));
      setFormError("");
    } catch (error) {
      console.error(error);
      setFormError(error.response.data.message);
    }
  };

  ////////////////////
  return (
    <FormSectionLayout label={"Profile Page"}>
      <form
        className="mt-10 bg-slate-400 py-10 px-4 rounded-md"
        onSubmit={onSaveProfileHanlder}
      >
        <div className="text-center w-full ">
          <label htmlFor="img">
            <input type="file" hidden id="img" accept="images/*" />

            <img
              src={ImgUrl}
              className="w-20 h-20 mx-auto rounded-full object-cover cursor-pointer"
              id="photo"
              onChange={onUpdatedValues}
            />
          </label>
        </div>
        <SignFormInputGroup label={"Username"}>
          <input
            type="text"
            className={`${inputStyleClasses}`}
            defaultValue={user?.username}
            id="username"
            name="username"
            onChange={onUpdatedValues}
          />
        </SignFormInputGroup>

        <SignFormInputGroup label={"Email"}>
          <input
            type="text"
            className={`${inputStyleClasses}`}
            defaultValue={user?.email}
            id="email"
            name="email"
            onChange={onUpdatedValues}
          />
        </SignFormInputGroup>

        <SubmitButton type={"submit"} text={"save"} />

        <div className="flex justify-between px-2 items-center text-red-600 font-semibold">
          <button type="button" onClick={onDeleteAccountHandler}>
            Delete Account
          </button>
          <button type="button" onClick={signOutHandler}>
            sign out
          </button>
        </div>

        <ErrorBox error={formError} />
      </form>
    </FormSectionLayout>
  );
};

export default Profile;
