import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utlis/axios";
import Cards from "./Cards";
import Loading from "./Loading ";
import InfiniteScroll from "react-infinite-scroll-component";

export const Current = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    document.title = `KS|Trending ${category.toUpperCase()}`;
  }, [category]);

  const getTreding = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
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
    if (trending.length === 0) {
      getTreding();
    } else {
      setpage(1);
      settrending([]);
      getTreding();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%]  w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 w-[20%] ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#290C23] ri-arrow-left-line  "
          ></i>{" "}
          Trending
          <small className="text-sm ml-2  text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTreding}
        hasMore={hasMore}
        loader={<h1>Loding .....</h1>}
      >
        <Cards data={trending} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};
