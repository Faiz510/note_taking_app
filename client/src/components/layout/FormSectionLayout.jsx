import React from "react";

const FormSectionLayout = ({ label, children, ...props }) => {
  return (
    <section className="flex justify-center items-center flex-col" {...props}>
      <h3 className="py-4 font-semibold tracking-wider text-2xl">{label}</h3>
      {children}
    </section>
  );
};

export default FormSectionLayout;
