import React from "react";
import FormSectionLayout from "../layout/FormSectionLayout";
import SignFormInputGroup from "../layout/SignFormInputGroup";
import SubmitButton from "../layout/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { sessionOut } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputStyleClasses =
  "w-[100%] bg-white focus:outline-none px-2 py-1 rounded-md";

const Profile = () => {
  ////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // current state for user
  const { user, token } = useSelector((state) => state.user?.user?.currentUser);
  // signout hanler
  const signOutHandler = () => {
    dispatch(sessionOut());
    navigate("/signin");
  };
  // delte account handler
  const onDeleteAccountHandler = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/user/deleteMe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      signOutHandler();
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////
  return (
    <FormSectionLayout label={"Profile Page"}>
      <form className="mt-10 bg-slate-400 py-10 px-4 rounded-md">
        <SignFormInputGroup label={"Username"}>
          <input
            type="text"
            className={`${inputStyleClasses}`}
            defaultValue={user?.username}
          />
        </SignFormInputGroup>

        <SignFormInputGroup label={"Email"}>
          <input
            type="text"
            className={`${inputStyleClasses}`}
            defaultValue={user?.email}
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
      </form>
    </FormSectionLayout>
  );
};

export default Profile;
