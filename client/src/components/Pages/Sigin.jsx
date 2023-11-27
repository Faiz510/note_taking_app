import { useState } from "react";
import FormSectionLayout from "../layout/FormSectionLayout";
import SignFormInputGroup from "../layout/SignFormInputGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignConnector from "../layout/SignConnector";
import ErrorBox from "../layout/ErrorBox";
import { useDispatch } from "react-redux";
import {
  sessionStart,
  sessionSucess,
  sessionFail,
} from "../../store/UserSlice.js";
import SubmitButton from "../layout/SubmitButton.jsx";

const inputStyleClasses =
  "w-[100%] bg-white focus:outline-none px-2 py-1 rounded-md";

const Sigin = () => {
  const [signupformData, setSignupFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onValuesHandler = (e) => {
    setSignupFormData({ ...signupformData, [e.target.id]: e.target.value });
  };

  const onSubmitSignFormHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      dispatch(sessionStart());
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        signupformData
      );

      const { data } = res;

      dispatch(sessionSucess(data));

      // console.log(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setDataError(error.response.data.message);
      setLoading(false);
      dispatch(sessionFail(error.response.data.message));
    }
  };

  return (
    <FormSectionLayout label={"Signin page"}>
      <form
        className="mt-10 bg-slate-400 py-10 px-4 rounded-md"
        onSubmit={onSubmitSignFormHandler}
      >
        <SignFormInputGroup label={"Email"}>
          <input
            className={`${inputStyleClasses}`}
            id="email"
            type="email"
            onChange={onValuesHandler}
          />
        </SignFormInputGroup>

        <SignFormInputGroup label={"Password"}>
          <input
            className={`${inputStyleClasses}`}
            id="password"
            type="password"
            onChange={onValuesHandler}
          />
        </SignFormInputGroup>

        <SubmitButton type={"submit"} text={"submit"} />

        <SignConnector
          label={"Sign Up"}
          text={"If you dont have account ?"}
          link={"/signup"}
        />

        <ErrorBox error={dataError} />
      </form>
    </FormSectionLayout>
  );
};

export default Sigin;
