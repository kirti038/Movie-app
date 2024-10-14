import React from "react";
import loader from "../../../public/Loader.webp";

export const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[50%] object-cover  " src={loader} alt="" />
    </div>
  );
};

export default Loading;
