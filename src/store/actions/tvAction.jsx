export { removeTv } from "../reducers/TvSlice";
import axios from "../../utlis/axios";
import { loadTv } from "../reducers/TvSlice";

export const asyncloadtv = (id) => async (dispatch, getstate) => {
  try {
    // https://api.themoviedb.org/3/tv/{series_id}/videos
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      translations: translations.data.translations.map((t) => t.name),
      watchproviders: watchproviders.data.results.IN,
    };
    console.log(theultimatedetails);

    dispatch(loadTv(theultimatedetails));
  } catch (error) {
    console.log("error", error);
  }
};
