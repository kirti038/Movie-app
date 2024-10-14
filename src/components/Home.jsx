import { useEffect, useState } from "react";
import Laftnave from "./templates/Laftnave";
import Topnav from "./templates/Topnav";
import axios from "../utlis/axios";
import { Header } from "./templates/Header";
import HorizontalCardes from "./templates/HorizontalCardes";
import Dropdown from "./templates/Dropdown";
import { Loading } from "./templates/Loading ";

const Home = () => {
  document.title = "ks|Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const GetHeaderwallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      "Error:", error;
    }
  };

  const getTreding = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      "Error:", error;
    }
  };

  useEffect(() => {
    getTreding;
    !wallpaper && GetHeaderwallpaper();
    getTreding();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Laftnave />
      <div className="w-[80%] h-full  overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="  flex justify-between p-5">
          <h1 className="text-3xl  font-semibold  text-zinc-400 ">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCardes data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
