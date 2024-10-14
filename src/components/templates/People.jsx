import React, { useState, useEffect } from "react";
import axios from "../../utlis/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
import Loading from "./Loading ";

const People = () => {
  document.title = "KS|People";
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPerson([]);
      getPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 w-[20%]">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#290C23] ri-arrow-left-line"
          ></i>{" "}
          {""} People
          {/* <small className="text-sm ml-2 text-zinc-600">({category})</small> */}
        </h1>
        <div className="flex items-center w-[70%]">
          <Topnav />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
