import { useState } from "react";
import FormSectionLayout from "../layout/FormSectionLayout";
import SignFormInputGroup from "../layout/SignFormInputGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:3000/api/v1/user/signup",
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

        <button
          type="submit"
          className="bg-white text-center w-full py-2 my-2 rounded-md"
        >
          Submit
        </button>
        <p className="text-red-700 font-semibold tracking-wider">
          {dataError}{" "}
        </p>
      </form>
    </FormSectionLayout>
  );
};

export default Signup;
