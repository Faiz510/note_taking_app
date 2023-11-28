import { Link } from "react-router-dom";

const SignConnector = ({ label, link, text }) => {
  return (
    <div className="flex justify-between px-2 font-semibold">
      <span>{text} </span>
      <span className="cursor-pointer">
        <Link to={`${link}`}> {label} </Link>
      </span>
    </div>
  );
};

export default SignConnector;
