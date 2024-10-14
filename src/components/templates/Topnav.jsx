import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utlis/axios";
import noimage from "../../../public/noimage.jpg";

const Topnav = () => {
  const [quary, setquary] = useState("");
  const [searches, setsearches] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const GetSearchs = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${quary}`);
      setsearches(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (quary.trim() !== "") {
      GetSearchs();
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [quary]);

  const handleInputChange = (e) => {
    setquary(e.target.value);
  };

  const handleClearSearch = () => {
    setquary("");
  };

  return (
    <div className="w-[80%] h-[10vh] relative mx-auto flex  items-center ">
      <i className="ri-search-2-line text-3 text-3xl text-zinc-400"></i>
      <input
        onChange={handleInputChange}
        value={quary}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent "
        type="text"
        placeholder="search anything"
      />
      {quary.length > 0 && (
        <i
          onClick={handleClearSearch}
          className="  ri-close-line right-0 text-zinc-400 text-3xl"
        ></i>
      )}
      {showSearchResults && (
        <div
          className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%]  left-[7%] overflow-auto rounded"
          style={{ zIndex: 1 }}
        >
          {searches.map((s, i) => (
            <Link   to={`/${s.media_type || title}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-5 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
