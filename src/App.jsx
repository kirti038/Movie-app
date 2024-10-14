import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Current } from "./components/templates/Current";
import Popular from "./components/templates/Popular";
import Movie from "./components/templates/Movie";
import TvShow from "./components/templates/TvShow";
import People from "./components/templates/People";
import TvDetails from "./components/templates/TvDetails";
import PersonDetails from "./components/templates/PersonDetails";
import MovieDetails from "./components/templates/MovieDetails";
import PersonSlice from "./store/reducers/personSlice";
import Trailer from "./components/templates/Trailer";
import NotFound from "./components/templates/NotFound";
const App = () => {
  return (
    <div className="bg-[#040D12] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Current />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />} />

        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<TvShow />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
