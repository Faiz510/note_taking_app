import React from "react";

const SubmitButton = ({ type, text, ...props }) => {
  return (
    <button
      type={`${type}`}
      className="bg-white text-center w-full py-2 my-2 rounded-md"
      {...props}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
