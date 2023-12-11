import SignFormInputGroup from "./SignFormInputGroup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SelectCatOpt = ({ onClickHandler, ...props }) => {
  const { user } = useSelector((state) => state.user?.user?.currentUser);
  const navigate = useNavigate();

  return (
    <SignFormInputGroup label={"Select Category"}>
      <div className="flex gap-2">
        <select onChange={onClickHandler} id="category" {...props}>
          {user?.categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
          {/* <option >Create Category</option> */}
        </select>

        <span
          onClick={() => navigate("/category")}
          className="bg-slate-300  px-2 text-white text-2xl cursor-pointer font-bold"
        >
          +
        </span>
      </div>
    </SignFormInputGroup>
  );
};

export default SelectCatOpt;
