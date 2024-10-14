import React from "react";
import { Link } from "react-router-dom";
import NoImg from "../../../public/noimage.jpg";

const HorizontalCardes = ({ data, title }) => {
  console.log(data);

  return (
    <div className=" w-[100%]  flex  mb-5  overflow-y-hidden">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`${d.media_type || title}/details/${d.id}`}
            key={i}
            className="min-w-[15%]  h-[35vh] bg-zinc-900 mr-5 mb-5"
          >
            <img
              className="w-full h-[55%] object-cover "
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : NoImg
              }
              alt=""
            />
            <div className="text-white p-3 h-[45%] overflow-y-auto ">
              <h1 className="  text-xl font-semibold  ">
                {d.name || d.title || d.original_name || d.original_title}{" "}
              </h1>
              <p className="">
                {d.overview && d.overview.slice(0, 40)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nathig to Show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCardes;
