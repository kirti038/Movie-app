import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Laftnave = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-10 pt-5">
      <h1 className="text-2xl text-white font-bold">
        <i className="ri-tv-fill text-[#290C23] mr-2"></i>
        <span className="text-2xl">KSDB</span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl ">
        <h1 className="text-white font-semibold text-xl mt-5 mb-5">
          New Feeds
        </h1>
        <Link
          to={"/Trending"}
          className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="ri-fire-fill "></i> Trending
        </Link>
        <Link
          to={"/Popular"}
          className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="ri-bard-fill mr-2"></i>Popular
        </Link>
        <Link
          to={"/movie"}
          className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5"
        >
          {" "}
          <i className="ri-movie-2-fill mr-2"></i>Movies
        </Link>
        <Link
          to={"/tv"}
          className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="ri-tv-2-fill mr-2"></i>Tv Show
        </Link>
        <Link
          to={"/person"}
          className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="ri-team-fill mr-2"></i>People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl ">
        <h1 className="text-white font-semibold text-xl mt-5 mb-5">
          Website Informatio
        </h1>
        <Link
          className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5"
        >
          <i className="ri-information-fill mr-2"></i> About KSDB
        </Link>
        <Link className="hover:bg-[#290C23] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-phone-fill mr-2"></i> Contect Us
        </Link>
      </nav>
    </div>
  );
};

export default Laftnave;
