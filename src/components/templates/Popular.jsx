import axios from "../../utlis/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";

const Popular = () => {
  document.title = "KS|Popular";
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [Popular, setPopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
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
    if (Popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return (
    <div className=" w-screen h-screen ">
      <div className=" px-[5%]  w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 w-[20%] ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#290C23] ri-arrow-left-line  "
          ></i>{" "}
          Popular
          <small className="text-sm ml-2  text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[70%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={Popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loding .....</h1>}
      >
        <Cards data={Popular} title="populer" />
      </InfiniteScroll>
    </div>
  );
};

export default Popular;
