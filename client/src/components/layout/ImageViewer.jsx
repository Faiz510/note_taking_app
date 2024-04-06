import React from "react";
import { FaXmark } from "react-icons/fa6";

const ImageViewer = ({ imgSrc, OpenImg }) => {
  return (
    <div className="absolute w-full h-[100vh] bg-slate-400/80 flex items-center justify-center">
      <button
        className="text-white text-2xl absolute right-10 top-5"
        onClick={() => OpenImg(false)}
      >
        <FaXmark />
      </button>
      <img src={imgSrc} className="w-[80vw] h-[80vh] object-contain" />
    </div>
  );
};

export default ImageViewer;
