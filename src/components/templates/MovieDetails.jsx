import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"; // Import useParams from react-router-dom
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../../store/actions/movieAction";
import Loading from "./Loading ";
import HorizontalCardes from "./HorizontalCardes";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  // console.log(info?.watchproviders?.data?.results?.CA?.link);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(asyncloadmovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.5), rgba(0,0,0,0.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        position: "relative",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[150vh] px-[10%] "
    >
      {/* par-1 navigation */}
      <nav className="w-full  h-[10vh]  text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#290C23] ri-arrow-left-line  "
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https:/www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-global-line"></i>
        </a>
        <a
          target="_blank"
          href={`https:/www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdm
        </a>
      </nav>

      {/* par-3 poster and details*/}
      <div className="w-full flex">
        <div>
          <img
            className="h-[50vh] mt-10 shadow-[8px_17px_38px_2px_rgba(0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt={""}
          />{" "}
        </div>

        <div className="content ml-[5%]   w-full text-white">
          <h1 className="text-5xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              {" "}
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className=" mt-3 mb-10 flex items-center flex gap-x-5">
            <span className=" bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mt-5 mb-3 ">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-5 mb-2 ">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            className="p-5 bg-[#290C23] rounded-lg"
            to={`${pathname}/trailer`}
          >
            {" "}
            <i className="text-xl mr-3  ri-google-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>
      {/* part-2 available on details */}
      <div className="w-[80]  ">
        {info.watchproviders && info.watchproviders?.flatrate && (
          <div className="flex gap-x-2 mt-3 items-center text-white">
            <h1>Available on plateform </h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={""}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders?.rent && (
          <div className="flex gap-x-2 mt-3 items-center text-white">
            <h1>Available on Rent </h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={""}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders?.buy && (
          <div className="flex gap-x-2  mt-3 items-center text-white">
            <h1>Available to buy </h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={""}
              />
            ))}
          </div>
        )}
      </div>
      {/* part-4 Recoomandation and similar stuff*/}

      <hr className="  mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl mt-10 mb-5 font-bold text-white">
        {" "}
        Recoomandation & Similar stuff
      </h1>

      <HorizontalCardes
        className="bottom-0"
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
