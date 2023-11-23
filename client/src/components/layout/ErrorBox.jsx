import React from "react";

const ErrorBox = ({ error }) => {
  return (
    <div className="text-center w-[80vw] md:w-[40vw]">
      <p className="text-red-700 font-medium">{error}</p>
    </div>
  );
};

export default ErrorBox;
