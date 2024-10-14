import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "Tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  


  return  (
    <div className="  top-0 left-0 bg-[rgba(0,0,0,.8)] z-[100] absolute w-screen h-screen flex items-center justify-center ">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#290C23] absolute  ri-close-fill text-white text-3xl right-[10%] top-[10%]  "
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          controls
          height={500}
          width={1000}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  ) 
};

export default Trailer;
