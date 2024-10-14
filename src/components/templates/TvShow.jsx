import React from "react";
import axios from "../../utlis/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
import Loading from "./Loading ";

const TvShow = () => {
  document.title = "KS|TvShow";
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [Tv, setTv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
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
    if (Tv.length === 0) {
      GetTv();
    } else {
      setpage(1);
      setTv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return Tv.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%]  w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 w-[20%] ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#290C23] ri-arrow-left-line  "
          ></i>{" "}
          TvShow
        </h1>

        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={Tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loding .....</h1>}
      >
        <Cards data={Tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShow;
