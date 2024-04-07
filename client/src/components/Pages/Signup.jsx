import { useState } from "react";
import FormSectionLayout from "../layout/FormSectionLayout";
import SignFormInputGroup from "../layout/SignFormInputGroup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SignConnector from "../layout/SignConnector";
import ErrorBox from "../layout/ErrorBox";
import SubmitButton from "../layout/SubmitButton";

const inputStyleClasses =
  "w-[100%] bg-white focus:outline-none px-2 py-1 rounded-md";

const Signup = () => {
  const [signupformData, setSignupFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const navigate = useNavigate();

  const onValuesHandler = (e) => {
    setSignupFormData({ ...signupformData, [e.target.id]: e.target.value });
  };

  const onSubmitSignFormHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(
        `${process.env.BASE_URL}/api/v1/user/signup`,
        signupformData
      );

      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setDataError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <FormSectionLayout label={"Signup page"}>
      <form
        className="mt-10 bg-slate-400 py-10 px-4 rounded-md"
        onSubmit={onSubmitSignFormHandler}
      >
        <SignFormInputGroup label={"Username"}>
          <input
            className={`${inputStyleClasses}`}
            id="username"
            type="text"
            onChange={onValuesHandler}
          />
        </SignFormInputGroup>

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

        <SignFormInputGroup label={"confirm Password"}>
          <input
            className={`${inputStyleClasses}`}
            id="passwordConfirm"
            type="password"
            onChange={onValuesHandler}
          />
        </SignFormInputGroup>

        <SubmitButton type={"submit"} text={"submit"} />

        <SignConnector
          label={"Sign in"}
          text={"If you already have account ?"}
          link={"/signin"}
        />

        <ErrorBox error={dataError} />
      </form>
    </FormSectionLayout>
  );
};

export default Signup;
