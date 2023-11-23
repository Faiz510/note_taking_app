import React from "react";

const SignFormInputGroup = ({ label, children, ...props }) => {
  return (
    <div
      className="w-[80vw] flex justify-center items-center gap-2 md:w-[40vw] py-2"
      {...props}
    >
      <label className="font-semibold w-[20vw] text-center"> {label} </label>
      {children}
    </div>
  );
};

export default SignFormInputGroup;
