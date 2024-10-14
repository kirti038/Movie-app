import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"; // Import useParams from react-router-dom
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../../store/actions/personAction";
import Loading from "./Loading ";
import HorizontalCardes from "./HorizontalCardes";
import Dropdown from "./../templates/Dropdown";

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  // console.log(info?.watchproviders?.data?.results?.CA?.link);

  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");
  const { pathname } = useLocation();

  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(asyncloadperson());
    };
  }, [id]);
  // primary- 040D12*/
  /* secondary-290C23 */
  return info ? (
    <div className="px-[10%] h-[150vh] bg-[#040D12]  w-screen">
      {/* par-1 navigation */}
      <nav className="w-full  h-[10vh]  text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#290C23] ri-arrow-left-line  "
        ></Link>
      </nav>
      <div className="w-full flex flex-col">
        <div className="w-full flex">
          {/* par 2 left poster and details */}
          <div className="w-[20%]">
            <img
              className="h-[35vh] mt-10 shadow-[8px_17px_38px_2px_rgba(0,0,0.5)]"
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
              alt={""}
            />
            <hr className="  mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
            {/* sosial media Link */}
            <div className="text-2xl text-white flex gap-x-5">
              <a
                target="_blank"
                href={`https:/www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-global-line"></i>
              </a>
              <a
                target="_blank"
                href={`https:/www.facebook.com/${info.externalid.facebook_id}`}
              >
                <i class="ri-facebook-fill"></i>
              </a>
              <a
                target="_blank"
                href={`https:/www.instagram.com/${info.externalid.instagram_id}`}
              >
                <i class="ri-instagram-fill"></i>
              </a>
              <a
                target="_blank"
                href={`https:/www.twitter.com/${info.externalid.twitter_id}`}
              >
                <i class="ri-twitter-x-fill"></i>
              </a>
            </div>

            {/* presonal Information */}
            <h1 className=" text-2xl text-zinc-400  font-semibold mt-3">
              Person Info
            </h1>
            <h1 className=" text-zinc-400 ">
              {info.detail.known_for_department}
            </h1>
            <h1 className=" text-lg text-zinc-400  font-semibold mt-3">
              Gender
            </h1>
            <h1 className=" text-zinc-400 ">
              {info.detail.gender === 2 ? "male" : "Female"}
            </h1>

            <h1 className=" text-lg text-zinc-400  font-semibold mt-3">
              Birthday
            </h1>
            <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

            <h1 className=" text-lg text-zinc-400  font-semibold mt-3">
              Deathday
            </h1>
            <h1 className=" text-zinc-400 ">
              {info.detail.deathday ? info.detail.deathday : "Still Alive"}
            </h1>

            <h1 className=" text-lg text-zinc-400  font-semibold mt-3">
              Place Of Birth
            </h1>
            <h1 className=" text-zinc-400 ">{info.detail.place_of_birth}</h1>

            <h1 className=" text-lg text-zinc-400  font-semibold mt-3">
              Also Known As
            </h1>
            <h1 className=" text-zinc-400 ">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>

          {/*part-3 rigth details and information */}
          <div className=" w-[80%] ml-[5%] ">
            <h1 className=" text-6xl text-zinc-400  font-black  my-5">
              {info.detail.name}
            </h1>
            <h1 className=" text-xl text-zinc-400  font-semibold mt-3">
              Boigraphy
            </h1>
            <p className="text-zinc-400 mt-5">{info.detail.biography}</p>

            <h1 className=" text-lg text-zinc-400  font-semibold mt-5">
              Known For
            </h1>

            <HorizontalCardes data={info.combinedCredits.cast} />
            <div className=" w-full flex justify-between">
              <h1 className=" text-lg text-zinc-400  font-semibold mt-5">
                Acting
              </h1>
              <Dropdown
                title="Category"
                options={["tv", "movie"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>

            <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto  shadow-xl shadow-[rgba(255,255,255,0.3)]  border-2 border-zinc-700 p-5">
              {info[category + "Credits"].cast.map((c, i) => (
                <li
                  key={i}
                  className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
                >
                  {" "}
                  <Link to={`/${category}/details/${c.id}`}>
                    <span>
                      {" "}
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>
                    <br />
                    <span className="  ml-7 mt-2 clock">
                      {c.character && `character Name: ${c.character}`}
                    </span>
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
