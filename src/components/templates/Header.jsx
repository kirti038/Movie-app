import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.5), rgba(0,0,0,0.8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        position: "relative",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col  justify-end p-[5%] items-start"
    >
      <h1 className="text-5xl w-[70%] font-black  text-white">
        {data.name || data.title || data.original_name || data.original_title}{" "}
      </h1>
      <p className=" w-[70%] text-white mt-3 mb-3">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type || title}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white ">
        <i className=" text-yellow-600 ri-megaphone-fill"></i> {""}{" "}
        {data.release_date || "No Information"}
        <i className=" ml-5 text-yellow-600 ri-album-fill"></i> {""}{" "}
        {data.media_type.toUpperCase()}
      </p>

      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="p-3 bg-[#522148] rounded text-white font-semibold mt-3 "
      >
        Watch Trailer
      </Link>
    </div>
  );
};
