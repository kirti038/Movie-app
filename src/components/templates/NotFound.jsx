import React from "react";
import notFound from "../../../public/404.gif";

export const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[50%] object-cover  " src={notFound} alt="" />
    </div>
  );
};

export default NotFound;
