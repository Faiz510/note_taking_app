import { Link, useNavigate } from "react-router-dom";
import FormSectionLayout from "../layout/FormSectionLayout";
import SignFormInputGroup from "../layout/SignFormInputGroup";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { sessionSucess } from "../../store/UserSlice";
import ErrorBox from "../layout/ErrorBox";

const inputStyleClasses =
  "w-[100%] bg-white focus:outline-none px-2 py-1 rounded-md";

const Category = () => {
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user?.user?.currentUser);
  ///////////////////////////

  // category form value
  const onChangeCategory = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value, token });

  //////////////////////
  // save category form in db
  const onSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/v1/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = res;
      dispatch(sessionSucess(data));
      navigate("/");
    } catch (error) {
      setErrorData(error.response.data.message);
    }
  };

  return (
    <FormSectionLayout label={"Create Category"}>
      <form onSubmit={onSaveCategory}>
        <SignFormInputGroup label={"category"}>
          <input
            type="text"
            className={`${inputStyleClasses}`}
            placeholder="category name"
            id="categoryName"
            onChange={onChangeCategory}
          />
        </SignFormInputGroup>

        <SignFormInputGroup label={"Description"}>
          <textarea
            type="text"
            className={`${inputStyleClasses}`}
            placeholder="category description"
            id="categoryDescription"
            onChange={onChangeCategory}
          />
        </SignFormInputGroup>
        <div className="flex gap-2 ml-52">
          <button type="button" className="cursor-pointer">
            <Link to={"/"}> Cancel </Link>
          </button>
          <button
            type="submit"
            className="bg-slate-500 px-2 text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>

      <ErrorBox error={errorData} />
    </FormSectionLayout>
  );
};

export default Category;
