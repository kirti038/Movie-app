import React from "react";
import { Link } from "react-router-dom";
import NoImg from "../../../public/noimage.jpg";

const Cards = ({ data, title }) => {
  console.log(title);

  return (
    <div className="flex flex-wrap w-[full] h-[full]  px-[3%] bg-[#040D12]">
      {data &&
        data.map((c, i) => (
          <Link
            key={i}
            to={`/${c.media_type || title}/details/${c.id}`}
            className="relative w-[25vh] mr-[5%] mb-[5%] m-7"
          >
            <img
              className="h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0.5)]"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : NoImg
              }
              alt={""}
            />
            <h1 className=" text-2xl text-zinc-400 mt-3 font-semibold">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
            {c.vote_average && (
              <div className="absolute right-[-10%] bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default Cards;
