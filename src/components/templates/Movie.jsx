import React from "react";
import axios from "../../utlis/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
import Loading from "./Loading ";

const Movie = () => {
  document.title = "KS|Movies";
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [Movie, setMovie] = useState([]);
  console.log(Movie);

  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
      console.log(data);
    } catch (error) {
      "Error:", error;
    }
  };
  const refershHandler = () => {
    if (Movie.length === 0) {
      getMovie();
    } else {
      setpage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return Movie.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%]  w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 w-[20%] ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#290C23] ri-arrow-left-line  "
          ></i>{" "}
          {""}
          Movies
          <small className="text-sm ml-2  text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={Movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1>Loding .....</h1>}
      >
        <Cards data={Movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
